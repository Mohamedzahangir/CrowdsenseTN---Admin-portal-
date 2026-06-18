// DataService.js - Centralized Data Persistence & Simulation Engine Facade for CrowdSense TN Admin
// Delegated directly to the central shared services architecture.
import { SharedStore, KEYS } from './SharedStore';
import { BusService } from './BusService';
import { RouteService } from './RouteService';
import { DeviceService } from './DeviceService';
import { NotificationService } from './NotificationService';

// In-memory runtime tracking & occupancy simulation (same as Customer portal but controllable)
let trackingStates = {};
let occupancyStates = {};
const listeners = {};

// Initial Simulation Setup
function initializeSimulation() {
  const buses = BusService.getAllBuses();
  buses.forEach((bus, i) => {
    // Distribute buses along route
    const initialProgress = 15 + (i * 15);
    
    // Tracking simulation details
    trackingStates[bus.id] = {
      busId: bus.id,
      progress: initialProgress,
      speed: bus.status === "Active" ? 35 + Math.floor(Math.random() * 20) : 0,
      currentStop: bus.source,
      nextStop: bus.destination,
      eta: bus.status === "Active" ? 12 + (i * 3) : 0,
      lat: 13.0064,
      lng: 80.2577,
      health: bus.status === "Active" ? "Good" : "Disconnected",
      lastUpdated: new Date()
    };

    // Passenger Occupancy details
    let passengers = 10 + Math.floor(Math.random() * (bus.capacity - 15));
    if (bus.id === "19B") passengers = 56; // 93% High
    if (bus.id === "47A") passengers = 42; // 70% Medium
    if (bus.id === "23C") passengers = 18; // 30% Low

    occupancyStates[bus.id] = {
      busId: bus.id,
      passengers: passengers,
      capacity: bus.capacity,
      percentage: Math.round((passengers / bus.capacity) * 100),
      lastUpdated: new Date()
    };

    updateBusMetrics(bus.id);
  });
  
  // Write to shared database keys
  SharedStore.setItem(KEYS.TRACKING, trackingStates);
  SharedStore.setItem(KEYS.OCCUPANCY, occupancyStates);
}

// Compute live routes/coordinates
function updateBusMetrics(busId) {
  const bus = BusService.getAllBuses().find(b => b.id === busId);
  const route = RouteService.getAllRoutes().find(r => r.number === busId);
  const tracking = trackingStates[busId];
  const occupancy = occupancyStates[busId];
  
  if (!bus || !tracking || !occupancy) return;
  if (bus.status !== "Active") {
    tracking.speed = 0;
    tracking.eta = 0;
    return;
  }

  // Handle stops traversal
  const stops = route ? route.stops : [];
  if (stops.length === 0) return;

  const totalDistance = stops[stops.length - 1].distance;
  const currentDistance = (tracking.progress / 100) * totalDistance;

  let lastStopIndex = 0;
  for (let i = 0; i < stops.length; i++) {
    if (stops[i].distance <= currentDistance) {
      lastStopIndex = i;
    } else {
      break;
    }
  }

  const nextStopIndex = Math.min(lastStopIndex + 1, stops.length - 1);
  const lastStop = stops[lastStopIndex];
  const nextStop = stops[nextStopIndex];

  let distanceToNext = 0;
  if (lastStopIndex === stops.length - 1) {
    distanceToNext = 0;
  } else {
    distanceToNext = nextStop.distance - currentDistance;
  }

  // Speed adjustments
  const speedChange = (Math.random() * 8) - 4;
  tracking.speed = Math.max(10, Math.min(60, Math.round(tracking.speed + speedChange)));

  let eta = 0;
  if (distanceToNext > 0 && tracking.speed > 0) {
    eta = Math.ceil((distanceToNext / tracking.speed) * 60);
  }

  tracking.currentStop = lastStop.name;
  tracking.nextStop = nextStop.name;
  tracking.distanceToNext = parseFloat(distanceToNext.toFixed(1));
  tracking.eta = lastStopIndex === stops.length - 1 ? 0 : eta;
  tracking.lastStopIndex = lastStopIndex;
  tracking.nextStopIndex = nextStopIndex;

  // Coordinate interpolation
  let lat = lastStop.lat;
  let lng = lastStop.lng;
  if (lastStopIndex !== nextStopIndex) {
    const segDist = nextStop.distance - lastStop.distance;
    const segProg = segDist > 0 ? (currentDistance - lastStop.distance) / segDist : 0;
    lat = lastStop.lat + (nextStop.lat - lastStop.lat) * segProg;
    lng = lastStop.lng + (nextStop.lng - lastStop.lng) * segProg;
  }
  tracking.lat = parseFloat(lat.toFixed(6));
  tracking.lng = parseFloat(lng.toFixed(6));
}

// Start simulation loop (running continuously in background)
function startSimulationLoop() {
  setInterval(() => {
    const buses = BusService.getAllBuses();
    buses.forEach(bus => {
      if (bus.status !== "Active") return;
      
      const tracking = trackingStates[bus.id];
      const occupancy = occupancyStates[bus.id];
      if (!tracking || !occupancy) return;

      // Update location progress
      tracking.progress += 0.4 + Math.random() * 0.4;
      if (tracking.progress >= 100) {
        tracking.progress = 0;
      }
      tracking.lastUpdated = new Date();

      // Occasionally adjust passenger load
      if (Math.random() < 0.3) {
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        occupancy.passengers = Math.max(5, Math.min(occupancy.capacity, occupancy.passengers + change));
        occupancy.percentage = Math.round((occupancy.passengers / occupancy.capacity) * 100);

        // Auto trigger high occupancy alert
        const settings = DataService.getSettings();
        if (occupancy.percentage >= settings.highOccupancyThreshold) {
          const alertExists = NotificationService.getAlerts().some(a => a.busId === bus.id && a.type === "High Occupancy" && a.status === "Unread");
          if (!alertExists) {
            NotificationService.createAlert({
              type: "High Occupancy",
              title: `Bus ${bus.id} High Occupancy Detected`,
              desc: `Bus ${bus.id} passenger counts reached ${occupancy.percentage}% capacity (${occupancy.passengers}/${occupancy.capacity} passengers).`,
              busId: bus.id,
              priority: occupancy.percentage >= settings.criticalOccupancyThreshold ? "Critical" : "High"
            });
          }
        }
      }

      updateBusMetrics(bus.id);
    });

    // Device online/offline simulation toggles
    const devices = DeviceService.getDevices();
    let devicesChanged = false;
    devices.forEach(device => {
      // 2% chance device changes status
      if (Math.random() < 0.02) {
        const statuses = ["Online", "Online", "Online", "Offline", "Maintenance", "Fault"];
        const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
        if (device.status !== newStatus) {
          device.status = newStatus;
          device.lastComm = newStatus === "Online" ? "Just now" : "5 mins ago";
          if (newStatus === "Online") {
            device.rssi = "-60 dBm";
            device.heap = "180 KB";
            device.temperature = "40.5 °C";
          } else {
            device.rssi = "N/A";
            device.heap = "0 KB";
            device.temperature = "N/A";
          }

          devicesChanged = true;

          // Trigger alerts on device fault or offline
          if (newStatus === "Offline" || newStatus === "Fault") {
            NotificationService.createAlert({
              type: newStatus === "Offline" ? "Device Offline" : "Sensor Failure",
              title: `ESP32 Node ${device.id} is ${newStatus}`,
              desc: `Device status changed to ${newStatus}. Bus ${device.busId || "N/A"} telemetry lost.`,
              busId: device.busId,
              priority: newStatus === "Offline" ? "Critical" : "High"
            });
          }
        }
      }
    });

    if (devicesChanged) {
      DeviceService.saveDevices(devices);
    }

    // Write to shared database keys
    SharedStore.setItem(KEYS.TRACKING, trackingStates);
    SharedStore.setItem(KEYS.OCCUPANCY, occupancyStates);

    // Trigger update subscribers
    notifySubscribers();
  }, 4000);
}

function notifySubscribers() {
  Object.keys(listeners).forEach(event => {
    listeners[event].forEach(callback => {
      try {
        callback({
          buses: BusService.getAllBuses(),
          routes: RouteService.getAllRoutes(),
          devices: DeviceService.getDevices(),
          alerts: NotificationService.getAlerts(),
          tracking: trackingStates,
          occupancy: occupancyStates
        });
      } catch (err) {
        console.error("Listener error:", err);
      }
    });
  });
}

export const DataService = {
  init() {
    SharedStore.init();

    const storedTracking = SharedStore.getItem(KEYS.TRACKING);
    const storedOccupancy = SharedStore.getItem(KEYS.OCCUPANCY);
    if (storedTracking) trackingStates = storedTracking;
    if (storedOccupancy) occupancyStates = storedOccupancy;

    // Synchronize local in-memory states on Realtime updates
    window.addEventListener("crowdsense_store_updated", (e) => {
      const tracking = SharedStore.getItem(KEYS.TRACKING);
      const occupancy = SharedStore.getItem(KEYS.OCCUPANCY);
      if (tracking) trackingStates = tracking;
      if (occupancy) occupancyStates = occupancy;
      notifySubscribers();
    });
  },

  // Bus CRUD (Delegated to BusService)
  getBuses() {
    return BusService.getAllBuses();
  },
  saveBuses(buses) {
    SharedStore.setItem(KEYS.BUSES, buses);
    notifySubscribers();
  },
  addBus(bus) {
    BusService.addBus(bus);
    
    // Add default entry to local cache (Realtime will update DB details)
    trackingStates[bus.id] = {
      busId: bus.id,
      progress: 0,
      speed: 0,
      currentStop: bus.source,
      nextStop: bus.destination,
      eta: 0,
      lat: 13.0064,
      lng: 80.2577,
      health: "Disconnected",
      lastUpdated: new Date()
    };
    occupancyStates[bus.id] = {
      busId: bus.id,
      passengers: 0,
      capacity: bus.capacity,
      percentage: 0,
      lastUpdated: new Date()
    };

    SharedStore.setItem(KEYS.TRACKING, trackingStates);
    SharedStore.setItem(KEYS.OCCUPANCY, occupancyStates);

    this.addActivity("Bus Added", `New bus ${bus.id} (${bus.number}) registered in fleet database.`);
  },
  updateBus(busId, updatedFields) {
    BusService.updateBus(busId, updatedFields);

    const bus = BusService.getBusDetails(busId);
    if (bus) {
      if (trackingStates[busId]) {
        trackingStates[busId].currentStop = bus.source;
        trackingStates[busId].nextStop = bus.destination;
        trackingStates[busId].lastUpdated = new Date();
      }
      if (occupancyStates[busId]) {
        occupancyStates[busId].capacity = bus.capacity;
        occupancyStates[busId].percentage = Math.round((occupancyStates[busId].passengers / occupancyStates[busId].capacity) * 100);
        occupancyStates[busId].lastUpdated = new Date();
      }

      SharedStore.setItem(KEYS.TRACKING, trackingStates);
      SharedStore.setItem(KEYS.OCCUPANCY, occupancyStates);
    }

    this.addActivity("Bus Modified", `Metadata for bus ${busId} updated by administrator.`);
  },
  deleteBus(busId) {
    BusService.deleteBus(busId);
    delete trackingStates[busId];
    delete occupancyStates[busId];

    SharedStore.setItem(KEYS.TRACKING, trackingStates);
    SharedStore.setItem(KEYS.OCCUPANCY, occupancyStates);

    this.addActivity("Bus Disabled/Removed", `Bus ${busId} was decommissioned from the fleet.`);
  },

  // Route CRUD (Delegated to RouteService)
  getRoutes() {
    return RouteService.getAllRoutes();
  },
  saveRoutes(routes) {
    SharedStore.setItem(KEYS.ROUTES, routes);
    notifySubscribers();
  },
  addRoute(route) {
    RouteService.addRoute(route);
    this.addActivity("Route Created", `Route ${route.number} (${route.source} to ${route.destination}) created.`);
  },
  updateRoute(routeNum, updatedFields) {
    RouteService.updateRoute(routeNum, updatedFields);
    this.addActivity("Route Updated", `Route details and stops modified for Route ${routeNum}.`);
  },
  deleteRoute(routeNum) {
    RouteService.deleteRoute(routeNum);
    this.addActivity("Route Deleted", `Route ${routeNum} has been deleted from active database.`);
  },

  // Device CRUD (Delegated to DeviceService)
  getDevices() {
    return DeviceService.getDevices();
  },
  saveDevices(devices) {
    DeviceService.saveDevices(devices);
  },
  addDevice(device) {
    DeviceService.addDevice(device);
    this.addActivity("Device Registered", `New ESP32 IoT node ${device.id} provisioned.`);
  },
  updateDevice(deviceId, updatedFields) {
    DeviceService.updateDevice(deviceId, updatedFields);
  },
  deleteDevice(deviceId) {
    DeviceService.deleteDevice(deviceId);
    this.addActivity("Device Removed", `ESP32 Node ${deviceId} de-registered.`);
  },

  // Alerts CRUD (Delegated to NotificationService)
  getAlerts() {
    return NotificationService.getAlerts();
  },
  saveAlerts(alerts) {
    SharedStore.setItem(KEYS.ALERTS, alerts);
    notifySubscribers();
  },
  createAlert(alert) {
    NotificationService.createAlert(alert);
  },
  markAlertAsRead(alertId) {
    NotificationService.markAlertAsRead(alertId);
  },
  markAllAlertsAsRead() {
    NotificationService.markAllAlertsAsRead();
  },
  archiveAlert(alertId) {
    NotificationService.archiveAlert(alertId);
  },

  // User CRUD (Delegated to SharedStore / Supabase)
  getUsers() {
    return SharedStore.getItem(KEYS.USERS) || [];
  },
  saveUsers(users) {
    SharedStore.setItem(KEYS.USERS, users);
    notifySubscribers();
  },
  async addUser(user) {
    const users = this.getUsers();
    const newUser = { id: "u_" + Date.now(), status: "Active", ...user };
    users.push(newUser);
    this.saveUsers(users);

    const { error } = await supabase.from('admin_users').insert([{
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: newUser.status
    }]);
    if (error) console.error("Error inserting user in Supabase:", error);
    this.addActivity("User Registered", `Admin profile for ${user.name} created as ${user.role}.`);
  },
  async updateUser(userId, updatedFields) {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedFields };
      this.saveUsers(users);
    }

    const { error } = await supabase.from('admin_users').update(updatedFields).eq('id', userId);
    if (error) console.error("Error updating user in Supabase:", error);
  },
  async deleteUser(userId) {
    const users = this.getUsers();
    const user = users.find(u => u.id === userId);
    let filtered = users.filter(u => u.id !== userId);
    this.saveUsers(filtered);

    const { error } = await supabase.from('admin_users').delete().eq('id', userId);
    if (error) console.error("Error deleting user in Supabase:", error);
    if (user) {
      this.addActivity("User Deleted", `Admin staff ${user.name} has been removed.`);
    }
  },

  // Settings (Delegated to SharedStore / Supabase)
  getSettings() {
    const defaultSettings = {
      highOccupancyThreshold: 75,
      criticalOccupancyThreshold: 90,
      gpsPollingInterval: 3,
      offlineTimeout: 60,
      alertEmailNotif: true,
      alertSmsNotif: false,
      alertPushNotif: true,
      autoRefreshDashboard: true
    };
    return SharedStore.getItem(KEYS.SETTINGS) || defaultSettings;
  },
  async saveSettings(settings) {
    SharedStore.setItem(KEYS.SETTINGS, settings);
    
    const { error } = await supabase.from('system_settings').upsert([{
      key: 'config',
      value: settings
    }]);
    if (error) console.error("Error saving settings in Supabase:", error);
    notifySubscribers();
  },

  // Activity Feed (Delegated to NotificationService)
  getActivities() {
    return NotificationService.getActivities();
  },
  addActivity(title, desc) {
    NotificationService.addActivity(title, desc);
  },

  // Live State
  getLiveState() {
    return {
      tracking: trackingStates,
      occupancy: occupancyStates
    };
  },

  // Event Subscription
  subscribe(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
    callback({
      buses: this.getBuses(),
      routes: this.getRoutes(),
      devices: this.getDevices(),
      alerts: this.getAlerts(),
      tracking: trackingStates,
      occupancy: occupancyStates
    });
  },
  unsubscribe(event, callback) {
    if (listeners[event]) {
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    }
  }
};
