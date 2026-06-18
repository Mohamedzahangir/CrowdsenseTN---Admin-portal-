// RouteService.js - Centralized service managing transit routes and stop queries.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { supabase } from './supabaseClient';

export const RouteService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // API Integration: Swap with async/await and fetch('/api/v1/routes') when PostgreSQL/REST API backend is deployed.

  getAllRoutes() {
    return SharedStore.getItem(KEYS.ROUTES) || [];
  },

  getRouteDetails(routeNum) {
    const routes = this.getAllRoutes();
    return routes.find(r => r.number === routeNum) || null;
  },

  getAllStops() {
    const routes = this.getAllRoutes();
    const allStops = new Set();
    routes.forEach(route => {
      route.stops.forEach(stop => allStops.add(stop.name));
    });
    return Array.from(allStops).sort();
  },

  // Helper to sync route & stops schema to Supabase
  async syncRouteToSupabase(route) {
    if (!supabase) {
      console.warn("RouteService: Supabase client is not initialized. Skipping route synchronization.");
      return;
    }
    const { error: routeErr } = await supabase.from('routes').upsert([{
      number: route.number,
      name: route.name,
      source: route.source,
      destination: route.destination,
      daily_passengers: route.dailyPassengers || 0,
      occupancy_stats: route.occupancyStats || { peak: "0%", avg: "0%" }
    }]);
    if (routeErr) console.error("Error upserting route:", routeErr);

    if (route.stops && Array.isArray(route.stops)) {
      // Clear current mappings
      await supabase.from('route_stops').delete().eq('route_number', route.number);

      for (let i = 0; i < route.stops.length; i++) {
        const stop = route.stops[i];
        const stopId = 'stop_' + stop.name.toLowerCase().replace(/[^a-z0-9]/g, '_');

        await supabase.from('stops').upsert([{
          id: stopId,
          name: stop.name,
          latitude: stop.lat,
          longitude: stop.lng
        }]);

        await supabase.from('route_stops').insert([{
          route_number: route.number,
          stop_id: stopId,
          distance: stop.distance,
          scheduled_time: stop.scheduledTime,
          sequence_order: i
        }]);
      }
    }
  },

  // Admin Route Management actions
  async addRoute(route) {
    const routes = this.getAllRoutes();
    routes.push(route);
    SharedStore.setItem(KEYS.ROUTES, routes);

    await this.syncRouteToSupabase(route);
  },

  async updateRoute(routeNum, updatedFields) {
    const routes = this.getAllRoutes();
    const idx = routes.findIndex(r => r.number === routeNum);
    if (idx !== -1) {
      routes[idx] = { ...routes[idx], ...updatedFields };
      SharedStore.setItem(KEYS.ROUTES, routes);
      await this.syncRouteToSupabase(routes[idx]);
    }
  },

  async deleteRoute(routeNum) {
    let routes = this.getAllRoutes();
    routes = routes.filter(r => r.number !== routeNum);
    SharedStore.setItem(KEYS.ROUTES, routes);

    if (supabase) {
      const { error } = await supabase.from('routes').delete().eq('number', routeNum);
      if (error) console.error("Error deleting route in Supabase:", error);
    }
  },

  searchRoutes(source, destination) {
    if (!source || !destination) return [];

    const normSource = source.trim().toLowerCase();
    const normDest = destination.trim().toLowerCase();
    const routes = this.getAllRoutes();
    const results = [];

    routes.forEach(route => {
      let sourceIndex = -1;
      let destIndex = -1;

      for (let i = 0; i < route.stops.length; i++) {
        const stopName = route.stops[i].name.toLowerCase();
        if (stopName.includes(normSource) && sourceIndex === -1) {
          sourceIndex = i;
        }
        if (stopName.includes(normDest) && sourceIndex !== -1 && i > sourceIndex) {
          destIndex = i;
          break;
        }
      }

      if (sourceIndex !== -1 && destIndex !== -1) {
        const boardStop = route.stops[sourceIndex];
        const alightStop = route.stops[destIndex];
        const travelDistance = alightStop.distance - boardStop.distance;

        // Estimate travel duration: roughly 2.5 minutes per km plus 1 minute dwell per stop
        const stopsCount = destIndex - sourceIndex;
        const estimatedDuration = Math.round(travelDistance * 2.5 + stopsCount);

        // Fetch corresponding bus object
        const busesData = SharedStore.getItem(KEYS.BUSES) || [];
        const bus = busesData.find(b => b.id === route.number) || {
          id: route.number,
          name: route.name,
          type: "City",
          stops: route.stops
        };

        results.push({
          bus: bus,
          boardStop: boardStop.name,
          alightStop: alightStop.name,
          sourceIndex: sourceIndex,
          destIndex: destIndex,
          distance: parseFloat(travelDistance.toFixed(1)),
          duration: estimatedDuration,
          stopsCount: stopsCount
        });
      }
    });

    return results;
  }
};
