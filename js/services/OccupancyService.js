// OccupancyService.js - Passenger load sensors service synced with the Admin Portal.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { BusService } from './BusService';
import { supabase } from './supabaseClient';

const listeners = {};
let localOccupancyStates = {};

function updateCrowdStatus(busId) {
  const state = localOccupancyStates[busId];
  if (!state) return;

  state.percentage = Math.round((state.passengers / state.capacity) * 100);

  if (state.percentage <= 40) {
    state.status = "Low Crowd";
    state.class = "status-chip-low";
    state.colorHex = "#22c55e";
  } else if (state.percentage <= 75) {
    state.status = "Medium Crowd";
    state.class = "status-chip-medium";
    state.colorHex = "#eab308";
  } else if (state.percentage <= 100) {
    state.status = "High Crowd";
    state.class = "status-chip-high";
    state.colorHex = "#ef4444";
  } else {
    state.status = "Overcrowded";
    state.class = "status-chip-overcrowded";
    state.colorHex = "#991b1b";
  }
}

function loadFromStore() {
  const sharedOcc = SharedStore.getItem(KEYS.OCCUPANCY);
  if (sharedOcc) {
    localOccupancyStates = sharedOcc;
  }
}

// Start occupancy sync listener
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
      listeners['all'].forEach(callback => callback(localOccupancyStates));
    } else if (localOccupancyStates[busId]) {
      listeners[busId].forEach(callback => callback(localOccupancyStates[busId]));
    }
  });
}

export const OccupancyService = {
  getOccupancy(busId) {
    loadFromStore();
    return localOccupancyStates[busId] || null;
  },

  getAllOccupancyStates() {
    loadFromStore();
    return localOccupancyStates;
  },

  async updateOccupancy(busId, passengers) {
    loadFromStore();
    const bus = BusService.getBusDetails(busId);
    const capacity = bus ? bus.capacity : 60;
    const pct = Math.round((passengers / capacity) * 100);

    const newState = {
      busId: busId,
      passengers: passengers,
      capacity: capacity,
      percentage: pct,
      status: pct <= 40 ? "Low Crowd" : pct <= 75 ? "Medium Crowd" : "High Crowd",
      class: pct <= 40 ? "status-chip-low" : pct <= 75 ? "status-chip-medium" : "status-chip-high",
      colorHex: pct <= 40 ? "#22c55e" : pct <= 75 ? "#eab308" : "#ef4444",
      lastUpdated: new Date()
    };

    localOccupancyStates[busId] = newState;
    SharedStore.setItem(KEYS.OCCUPANCY, localOccupancyStates);

    // Two-way sync: Push to Supabase live_bus_status
    if (supabase) {
      const { error } = await supabase
        .from('live_bus_status')
        .upsert({
          bus_id: busId,
          passengers: passengers,
          capacity: capacity,
          percentage: pct,
          last_updated: new Date()
        }, { onConflict: 'bus_id' });

      if (error) console.error("Error updating occupancy in Supabase live_bus_status:", error);
    }
  },

  subscribe(busId, callback) {
    if (!listeners[busId]) {
      listeners[busId] = [];
    }
    listeners[busId].push(callback);
    
    loadFromStore();
    if (busId === 'all') {
      callback(localOccupancyStates);
    } else if (localOccupancyStates[busId]) {
      callback(localOccupancyStates[busId]);
    }
  },

  unsubscribe(busId, callback) {
    if (listeners[busId]) {
      listeners[busId] = listeners[busId].filter(cb => cb !== callback);
    }
  }
};
