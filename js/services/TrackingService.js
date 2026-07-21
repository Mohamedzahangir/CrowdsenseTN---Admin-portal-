// TrackingService.js - Simulated real-time bus location tracker synchronized with the Admin Portal.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { BusService } from './BusService';
import { supabase } from './supabaseClient';

const listeners = {};
let localBusStates = {};

function loadFromStore() {
  const sharedState = SharedStore.getItem(KEYS.TRACKING);
  if (sharedState) {
    localBusStates = sharedState;
  }
}

// Start tracking sync listener
if (typeof window !== 'undefined') {
  loadFromStore();

  window.addEventListener("crowdsense_store_updated", () => {
    loadFromStore();
    triggerListeners();
  });
}

function triggerListeners() {
  Object.keys(listeners).forEach(busId => {
    if (busId === 'all') {
      listeners['all'].forEach(callback => callback(localBusStates));
    } else if (localBusStates[busId]) {
      listeners[busId].forEach(callback => callback(localBusStates[busId]));
    }
  });
}

export const TrackingService = {
  getBusLocation(busId) {
    loadFromStore();
    return localBusStates[busId] || null;
  },

  getAllBusStates() {
    loadFromStore();
    return localBusStates;
  },

  async updateBusLocation(busId, trackingState) {
    loadFromStore();
    localBusStates[busId] = { ...localBusStates[busId], ...trackingState, lastUpdated: new Date() };
    SharedStore.setItem(KEYS.TRACKING, localBusStates);

    if (supabase) {
      const dbPayload = {
        bus_id: busId,
        latitude: trackingState.lat,
        longitude: trackingState.lng,
        speed: trackingState.speed,
        current_stop: trackingState.currentStop,
        next_stop: trackingState.nextStop,
        eta: trackingState.eta,
        last_updated: new Date()
      };
      if (trackingState.progress !== undefined) dbPayload.progress = trackingState.progress;

      const { error } = await supabase
        .from('live_bus_status')
        .upsert(dbPayload, { onConflict: 'bus_id' });

      if (error) console.error("Error updating location in Supabase live_bus_status:", error);
    }
  },

  subscribe(busId, callback) {
    if (!listeners[busId]) {
      listeners[busId] = [];
    }
    listeners[busId].push(callback);
    
    loadFromStore();
    if (busId === 'all') {
      callback(localBusStates);
    } else if (localBusStates[busId]) {
      callback(localBusStates[busId]);
    }
  },

  unsubscribe(busId, callback) {
    if (listeners[busId]) {
      listeners[busId] = listeners[busId].filter(cb => cb !== callback);
    }
  }
};
