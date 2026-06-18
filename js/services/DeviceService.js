// DeviceService.js - Centralized service managing IoT Device nodes.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { supabase } from './supabaseClient';

export const DeviceService = {
  // Centralized IoT Device endpoints
  // Future Backend Readiness: Swap with REST API calls when IoT management portal backend is deployed.

  getDevices() {
    return SharedStore.getItem(KEYS.DEVICES) || [];
  },

  getDeviceDetails(deviceId) {
    const devices = this.getDevices();
    return devices.find(d => d.id === deviceId) || null;
  },

  // Admin Device management actions
  async addDevice(device) {
    const devices = this.getDevices();
    devices.push(device);
    SharedStore.setItem(KEYS.DEVICES, devices);

    if (supabase) {
      const { error } = await supabase.from('devices').insert([{
        id: device.id,
        bus_id: device.busId,
        status: device.status,
        last_comm: device.lastComm,
        fw_version: device.fwVersion,
        rssi: device.rssi,
        heap: device.heap,
        temperature: device.temperature
      }]);
      if (error) console.error("Error inserting device in Supabase:", error);
    }
  },

  async updateDevice(deviceId, updatedFields) {
    const devices = this.getDevices();
    const idx = devices.findIndex(d => d.id === deviceId);
    if (idx !== -1) {
      devices[idx] = { ...devices[idx], ...updatedFields };
      SharedStore.setItem(KEYS.DEVICES, devices);
    }

    const dbFields = {};
    if (updatedFields.busId !== undefined) dbFields.bus_id = updatedFields.busId;
    if (updatedFields.status !== undefined) dbFields.status = updatedFields.status;
    if (updatedFields.lastComm !== undefined) dbFields.last_comm = updatedFields.lastComm;
    if (updatedFields.fwVersion !== undefined) dbFields.fw_version = updatedFields.fwVersion;
    if (updatedFields.rssi !== undefined) dbFields.rssi = updatedFields.rssi;
    if (updatedFields.heap !== undefined) dbFields.heap = updatedFields.heap;
    if (updatedFields.temperature !== undefined) dbFields.temperature = updatedFields.temperature;

    if (supabase) {
      const { error } = await supabase.from('devices').update(dbFields).eq('id', deviceId);
      if (error) console.error("Error updating device in Supabase:", error);
    }
  },

  async deleteDevice(deviceId) {
    let devices = this.getDevices();
    devices = devices.filter(d => d.id !== deviceId);
    SharedStore.setItem(KEYS.DEVICES, devices);

    if (supabase) {
      const { error } = await supabase.from('devices').delete().eq('id', deviceId);
      if (error) console.error("Error deleting device in Supabase:", error);
    }
  }
};
