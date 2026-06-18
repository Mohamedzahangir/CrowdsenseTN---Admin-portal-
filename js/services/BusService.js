// BusService.js - Centralized service managing bus fleet metadata.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { supabase } from './supabaseClient';

export const BusService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // API Integration: Swap with async/await and fetch('/api/v1/buses') when PostgreSQL/REST API backend is deployed.
  
  getAllBuses() {
    return SharedStore.getItem(KEYS.BUSES) || [];
  },

  getBusDetails(busId) {
    const buses = this.getAllBuses();
    return buses.find(b => b.id === busId) || null;
  },

  getNearbyBuses() {
    const buses = this.getAllBuses();
    return buses.filter(b => b.status === "Active").slice(0, 4);
  },

  // Admin Fleet Management actions
  async addBus(bus) {
    const buses = this.getAllBuses();
    buses.push(bus);
    SharedStore.setItem(KEYS.BUSES, buses);

    if (supabase) {
      const { error } = await supabase.from('buses').insert([{
        id: bus.id,
        number: bus.number,
        name: bus.name,
        type: bus.type,
        source: bus.source,
        destination: bus.destination,
        platform: bus.platform,
        capacity: bus.capacity,
        status: bus.status,
        device_id: bus.deviceId,
        driver_name: bus.driverName
      }]);
      if (error) console.error("Error inserting bus into Supabase:", error);
    }
  },

  async updateBus(busId, updatedFields) {
    const buses = this.getAllBuses();
    const idx = buses.findIndex(b => b.id === busId);
    if (idx !== -1) {
      buses[idx] = { ...buses[idx], ...updatedFields };
      SharedStore.setItem(KEYS.BUSES, buses);
    }

    const dbFields = {};
    if (updatedFields.number !== undefined) dbFields.number = updatedFields.number;
    if (updatedFields.name !== undefined) dbFields.name = updatedFields.name;
    if (updatedFields.type !== undefined) dbFields.type = updatedFields.type;
    if (updatedFields.source !== undefined) dbFields.source = updatedFields.source;
    if (updatedFields.destination !== undefined) dbFields.destination = updatedFields.destination;
    if (updatedFields.platform !== undefined) dbFields.platform = updatedFields.platform;
    if (updatedFields.capacity !== undefined) dbFields.capacity = updatedFields.capacity;
    if (updatedFields.status !== undefined) dbFields.status = updatedFields.status;
    if (updatedFields.deviceId !== undefined) dbFields.device_id = updatedFields.deviceId;
    if (updatedFields.driverName !== undefined) dbFields.driver_name = updatedFields.driverName;

    if (supabase) {
      const { error } = await supabase.from('buses').update(dbFields).eq('id', busId);
      if (error) console.error("Error updating bus in Supabase:", error);
    }
  },

  async deleteBus(busId) {
    let buses = this.getAllBuses();
    buses = buses.filter(b => b.id !== busId);
    SharedStore.setItem(KEYS.BUSES, buses);

    if (supabase) {
      const { error } = await supabase.from('buses').delete().eq('id', busId);
      if (error) console.error("Error deleting bus in Supabase:", error);
    }
  }
};

