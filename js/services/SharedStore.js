// SharedStore.js - Centralized Local Storage Data Store for CrowdSense TN
// Seeds mock data, provides shared keys, and acts as the client-side database.
import { supabase } from './supabaseClient';

export const KEYS = {
  BUSES: "crowdsense_admin_buses",
  DEVICES: "crowdsense_admin_devices",
  ALERTS: "crowdsense_admin_alerts",
  USERS: "crowdsense_admin_users",
  SETTINGS: "crowdsense_admin_settings",
  ACTIVITIES: "crowdsense_admin_activities",
  TRACKING: "crowdsense_live_tracking",
  OCCUPANCY: "crowdsense_live_occupancy",
  ROUTES: "crowdsense_admin_routes"
};

export const defaultRoutes = [
  {
    number: "47A", name: "Vellore Express Route", source: "Vellore Bus Terminus", destination: "Katpadi Jn.",
    stops: [
      { name: "Vellore Bus Terminus", distance: 0, scheduledTime: "09:15 AM", lat: 12.9238, lng: 79.1352, fareToNextStop: 5 },
      { name: "Vellore Fort", distance: 2.5, scheduledTime: "09:25 AM", lat: 12.9275, lng: 79.1302, fareToNextStop: 5 },
      { name: "Green Circle", distance: 5.8, scheduledTime: "09:40 AM", lat: 12.9372, lng: 79.1355, fareToNextStop: 5 },
      { name: "Silk Mill", distance: 9.0, scheduledTime: "09:55 AM", lat: 12.9460, lng: 79.1415, fareToNextStop: 5 },
      { name: "Katpadi Jn.", distance: 12.0, scheduledTime: "10:15 AM", lat: 12.9680, lng: 79.1378, fareToNextStop: 0 }
    ]
  },
  {
    number: "19B", name: "T. Nagar Loop Route", source: "Adyar Depot", destination: "T. Nagar Bus Terminus",
    stops: [
      { name: "Adyar Depot", distance: 0, scheduledTime: "09:30 AM", lat: 13.0064, lng: 80.2577, fareToNextStop: 5 },
      { name: "Saidapet Stop", distance: 3.1, scheduledTime: "09:42 AM", lat: 13.0210, lng: 80.2227, fareToNextStop: 5 },
      { name: "Little Mount", distance: 4.8, scheduledTime: "09:50 AM", lat: 13.0163, lng: 80.2205, fareToNextStop: 5 },
      { name: "Nandanam", distance: 6.2, scheduledTime: "09:58 AM", lat: 13.0298, lng: 80.2335, fareToNextStop: 5 },
      { name: "T. Nagar Bus Terminus", distance: 8.5, scheduledTime: "10:10 AM", lat: 13.0405, lng: 80.2337, fareToNextStop: 0 }
    ]
  },
  {
    number: "23C", name: "Thiruvanmiyur Fast Route", source: "Mylapore Temple", destination: "Thiruvanmiyur",
    stops: [
      { name: "Mylapore Temple", distance: 0, scheduledTime: "09:45 AM", lat: 13.0330, lng: 80.2690, fareToNextStop: 5 },
      { name: "Mandaveli", distance: 1.8, scheduledTime: "09:52 AM", lat: 13.0232, lng: 80.2625, fareToNextStop: 5 },
      { name: "Adyar Depot", distance: 4.5, scheduledTime: "10:05 AM", lat: 13.0064, lng: 80.2577, fareToNextStop: 5 },
      { name: "Thiruvanmiyur", distance: 7.2, scheduledTime: "10:20 AM", lat: 12.9830, lng: 80.2516, fareToNextStop: 0 }
    ]
  },
  {
    number: "M70", name: "Broadway Special Route", source: "Guindy Estate", destination: "Broadway",
    stops: [
      { name: "Guindy Estate", distance: 0, scheduledTime: "09:10 AM", lat: 13.0084, lng: 80.2131, fareToNextStop: 5 },
      { name: "Teynampet", distance: 5.2, scheduledTime: "09:25 AM", lat: 13.0340, lng: 80.2440, fareToNextStop: 5 },
      { name: "Gemini Flyover", distance: 6.8, scheduledTime: "09:32 AM", lat: 13.0425, lng: 80.2514, fareToNextStop: 5 },
      { name: "LIC", distance: 9.5, scheduledTime: "09:45 AM", lat: 13.0610, lng: 80.2640, fareToNextStop: 5 },
      { name: "Broadway", distance: 13.0, scheduledTime: "10:00 AM", lat: 13.0880, lng: 80.2880, fareToNextStop: 0 }
    ]
  },
  {
    number: "102", name: "Kelambakkam Local Route", source: "Adyar Depot", destination: "Kelambakkam",
    stops: [
      { name: "Adyar Depot", distance: 0, scheduledTime: "09:20 AM", lat: 13.0064, lng: 80.2577, fareToNextStop: 5 },
      { name: "Taramani", distance: 4.8, scheduledTime: "09:35 AM", lat: 12.9782, lng: 80.2418, fareToNextStop: 5 },
      { name: "Tidel Park", distance: 6.1, scheduledTime: "09:40 AM", lat: 12.9894, lng: 80.2505, fareToNextStop: 5 },
      { name: "Sholinganallur", distance: 14.5, scheduledTime: "10:05 AM", lat: 12.9010, lng: 80.2269, fareToNextStop: 5 },
      { name: "Kelambakkam", distance: 28.0, scheduledTime: "10:35 AM", lat: 12.7850, lng: 80.2230, fareToNextStop: 0 }
    ]
  },
  {
    number: "570", name: "OMR Express Route", source: "Koyambedu", destination: "Siruseri IT Park",
    stops: [
      { name: "Koyambedu", distance: 0, scheduledTime: "10:00 AM", lat: 13.0732, lng: 80.1915, fareToNextStop: 5 },
      { name: "Gemini Flyover", distance: 12.0, scheduledTime: "10:25 AM", lat: 13.0425, lng: 80.2514, fareToNextStop: 5 },
      { name: "Sholinganallur", distance: 25.0, scheduledTime: "10:55 AM", lat: 12.9010, lng: 80.2269, fareToNextStop: 5 },
      { name: "Siruseri IT Park", distance: 38.0, scheduledTime: "11:20 AM", lat: 12.8282, lng: 80.2185, fareToNextStop: 0 }
    ]
  }
];

export const defaultBuses = [
  { 
    id: "47A", routeId: "47A", number: "TN-23-N-4512", name: "ICF Fast", type: "Express", 
    source: "ICF", destination: "Thiruvanmiyur",
    platform: "P4", capacity: 60, status: "Active", deviceId: "ESP32-047A", driverName: "K. Rajendran"
  },
  { 
    id: "19B", routeId: "19B", number: "TN-01-N-8829", name: "T. Nagar Loop", type: "Local", 
    source: "Kelambakkam", destination: "T. Nagar Bus Terminus",
    platform: "P1", capacity: 60, status: "Active", deviceId: "ESP32-019B", driverName: "M. Saravanan"
  },
  { 
    id: "23C", routeId: "23C", number: "TN-01-N-6610", name: "Thiruvanmiyur Fast", type: "Fast", 
    source: "Ayanavaram", destination: "Thiruvanmiyur",
    platform: "P2", capacity: 60, status: "Active", deviceId: "ESP32-023C", driverName: "R. Krishnan"
  },
  { 
    platform: "P5", capacity: 70, status: "Active", deviceId: "ESP32-0102", driverName: "G. Sekar"
  },
  { 
    id: "570", routeId: "570", number: "TN-11-N-7733", name: "OMR Express", type: "Express", 
    route_name: "OMR Express Route", source: "Koyambedu", destination: "Siruseri IT Park",
    platform: "P6", capacity: 70, status: "Inactive", deviceId: "ESP32-0570", driverName: "P. Loganathan"
  }
];

export const defaultDevices = [
  { id: "70:4B:CA:46:82:90", busId: "BUS_001", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-58 dBm", heap: "182 KB", temperature: "40.2 °C", isRealHardware: true },
  { id: "ESP32-047A", busId: "47A", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-58 dBm", heap: "182 KB", temperature: "41.5 °C" },
  { id: "ESP32-019B", busId: "19B", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-64 dBm", heap: "179 KB", temperature: "43.2 °C" },
  { id: "ESP32-023C", busId: "23C", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-55 dBm", heap: "185 KB", temperature: "39.8 °C" },
  { id: "ESP32-0M70", busId: "M70", status: "Offline", lastComm: "28 mins ago", fwVersion: "v1.3.9", rssi: "N/A", heap: "0 KB", temperature: "N/A" },
  { id: "ESP32-0102", busId: "102", status: "Maintenance", lastComm: "4 mins ago", fwVersion: "v1.4.2", rssi: "-82 dBm", heap: "155 KB", temperature: "48.1 °C" },
  { id: "ESP32-0570", busId: "570", status: "Fault", lastComm: "12 hours ago", fwVersion: "v1.3.1", rssi: "N/A", heap: "0 KB", temperature: "N/A" }
];

export const defaultAlerts = [
  { id: "a1", type: "High Occupancy", title: "Bus 19B Overcrowded", desc: "Route 19B occupancy reached 93% (56/60 passengers) near Nandanam.", busId: "19B", priority: "High", status: "Unread", time: "5 mins ago" },
  { id: "a2", type: "Device Offline", title: "IoT Node ESP32-0M70 Disconnected", desc: "Bus M70 device heartbeat timeout. Last reported ping -72dBm.", busId: "M70", priority: "Critical", status: "Unread", time: "28 mins ago" },
  { id: "a3", type: "Route Delay", title: "Route 47A Major Delay", desc: "Vellore Express is running 15 minutes behind schedule due to traffic congestion.", busId: "47A", priority: "Medium", status: "Unread", time: "42 mins ago" },
  { id: "a4", type: "Sensor Failure", title: "Bus 102 Passenger Counter Error", desc: "ESP32-0102 door-beam sensor reported inconsistent count. Pin D5 low.", busId: "102", priority: "High", status: "Unread", time: "1 hour ago" },
  { id: "a5", type: "System Notification", title: "System Overload Warning", desc: "Central database prediction engine CPU utilization exceeded 90% for 5m.", busId: "", priority: "Low", status: "Unread", time: "2 hours ago" },
  { id: "a6", type: "Bus Delay", title: "Bus 23C minor delay", desc: "Thiruvanmiyur Fast running 5 mins late due to temple festival crowd near Mylapore.", busId: "23C", priority: "Low", status: "Read", time: "4 hours ago" }
];

export const defaultUsers = [
  { id: "u1", name: "Anand Selvam", email: "anand.s@crowdsense.tn.gov", role: "Super Admin", status: "Active" },
  { id: "u2", name: "Priya Murthy", email: "priya.m@crowdsense.tn.gov", role: "Transport Officer", status: "Active" },
  { id: "u3", name: "Karthik Raja", email: "karthik.r@crowdsense.tn.gov", role: "Route Manager", status: "Active" },
  { id: "u4", name: "Deepak Kumar", email: "deepak.k@crowdsense.tn.gov", role: "Operations Manager", status: "Active" }
];

export const defaultSettings = {
  highOccupancyThreshold: 75,
  criticalOccupancyThreshold: 90,
  gpsPollingInterval: 3, // seconds
  offlineTimeout: 60, // seconds
  alertEmailNotif: true,
  alertSmsNotif: false,
  alertPushNotif: true,
  autoRefreshDashboard: true
};

export const defaultActivities = [
  { id: "act1", title: "Bus Route Assigned", desc: "Transport Officer Priya assigned Route 47A to Bus TN-23-N-4512.", time: "10 mins ago" },
  { id: "act2", title: "IoT Device Configured", desc: "Super Admin updated configuration parameters for ESP32-019B.", time: "1 hour ago" },
  { id: "act3", title: "New Route Created", desc: "Route Manager Karthik added Route 570 - Koyambedu to Siruseri IT Park.", time: "4 hours ago" },
  { id: "act4", title: "Settings Modified", desc: "Super Admin modified High Occupancy alert threshold to 75%.", time: "1 day ago" }
];

export const SharedStore = {
  initialized: false,
  init() {
    if (this.initialized) {
      console.log("SharedStore: already initialized, skipping duplicate init");
      return;
    }
    this.initialized = true;
    console.log("SharedStore: init() started");
    try {
      // Force rewrite ROUTES to ensure new real stops are captured
      localStorage.setItem(KEYS.ROUTES, JSON.stringify(defaultRoutes));
      
      // Force reset buses to defaults if they lack the routeId property (migration to global routes)
      const storedBusesRaw = localStorage.getItem(KEYS.BUSES);
      let needsBusReset = !storedBusesRaw || storedBusesRaw === "[]";
      if (!needsBusReset) {
        try {
          const parsed = JSON.parse(storedBusesRaw);
          if (parsed.length > 0 && !parsed[0].routeId) needsBusReset = true;
        } catch(e) { needsBusReset = true; }
      }
      if (needsBusReset) {
        localStorage.setItem(KEYS.BUSES, JSON.stringify(defaultBuses));
      }
      if (!localStorage.getItem(KEYS.DEVICES) || localStorage.getItem(KEYS.DEVICES) === "[]") {
        localStorage.setItem(KEYS.DEVICES, JSON.stringify(defaultDevices));
      } else {
        const storedDevices = JSON.parse(localStorage.getItem(KEYS.DEVICES) || "[]");
        if (!storedDevices.some(d => d.id === "70:4B:CA:46:82:90" || d.id === "ESP32-704BCA468290")) {
          storedDevices.unshift({ id: "70:4B:CA:46:82:90", busId: "47A", status: "Online", lastComm: "Just now", fwVersion: "v1.4.2", rssi: "-58 dBm", heap: "182 KB", temperature: "41.5 °C" });
          localStorage.setItem(KEYS.DEVICES, JSON.stringify(storedDevices));
        }
      }
      if (!localStorage.getItem(KEYS.ALERTS) || localStorage.getItem(KEYS.ALERTS) === "[]") localStorage.setItem(KEYS.ALERTS, JSON.stringify(defaultAlerts));
      if (!localStorage.getItem(KEYS.USERS) || localStorage.getItem(KEYS.USERS) === "[]") localStorage.setItem(KEYS.USERS, JSON.stringify(defaultUsers));
      if (!localStorage.getItem(KEYS.SETTINGS)) localStorage.setItem(KEYS.SETTINGS, JSON.stringify(defaultSettings));
      if (!localStorage.getItem(KEYS.ACTIVITIES) || localStorage.getItem(KEYS.ACTIVITIES) === "[]") localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(defaultActivities));
      
      console.log("SharedStore: calling syncFromSupabase");
      this.syncFromSupabase();
      
      console.log("SharedStore: calling subscribeToRealtime");
      this.subscribeToRealtime();
      
      console.log("SharedStore: init() completed successfully");
    } catch (err) {
      console.error("SharedStore: init() failed with error:", err);
    }
  },

  getItem(key) {
    const data = localStorage.getItem(key);
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error parsing localStorage key:", key, e);
      return null;
    }
  },

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key } }));
    }
  },

  async syncFromSupabase() {
    if (!supabase) {
      console.warn("SharedStore: Supabase client is not initialized. Skipping initial database sync.");
      return;
    }
    try {
      // 1. Buses
      const { data: buses } = await supabase.from('buses').select('*');
      if (buses) {
        const formatted = buses.map(b => ({
          id: b.id,
          routeId: b.route_id,
          number: b.number,
          name: b.name,
          type: b.type,
          source: b.source,
          destination: b.destination,
          platform: b.platform,
          capacity: b.capacity,
          status: b.status,
          deviceId: b.device_id,
          driverName: b.driver_name
        }));
        localStorage.setItem(KEYS.BUSES, JSON.stringify(formatted));
      }
      
      const { data: routes } = await supabase.from('routes').select('*');
      if (routes) {
        const formattedRoutes = routes.map(r => ({
          number: r.number,
          name: r.name,
          source: r.source,
          destination: r.destination,
          stops: r.stops || []
        }));
        localStorage.setItem(KEYS.ROUTES, JSON.stringify(formattedRoutes));
      }

      // 2. Devices
      const { data: devices } = await supabase.from('devices').select('*');
      if (devices) {
        const formatted = devices.map(d => ({
          id: d.id,
          busId: d.bus_id,
          status: d.status,
          lastComm: d.last_comm,
          fwVersion: d.fw_version,
          rssi: d.rssi,
          heap: d.heap,
          temperature: d.temperature
        }));
        localStorage.setItem(KEYS.DEVICES, JSON.stringify(formatted));
      }

      // 4. Alerts
      const { data: alerts } = await supabase.from('alerts').select('*').order('created_at', { ascending: false });
      if (alerts) {
        const formatted = alerts.map(a => ({
          id: a.id,
          type: a.type,
          title: a.title,
          desc: a.description,
          busId: a.bus_id,
          priority: a.priority,
          status: a.status,
          time: a.time
        }));
        localStorage.setItem(KEYS.ALERTS, JSON.stringify(formatted));
      }

      // 5. Admin Users
      const { data: users } = await supabase.from('admin_users').select('*');
      if (users) {
        const formatted = users.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          status: u.status
        }));
        localStorage.setItem(KEYS.USERS, JSON.stringify(formatted));
      }

      // 6. Settings
      const { data: settings } = await supabase.from('system_settings').select('*').eq('key', 'config').single();
      if (settings) {
        localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings.value));
      }

      // 7. Live Bus Status
      const { data: liveStatus } = await supabase.from('live_bus_status').select('*');
      if (liveStatus) {
        const tracking = {};
        const occupancy = {};
        liveStatus.forEach(r => {
          tracking[r.bus_id] = {
            busId: r.bus_id,
            progress: Number(r.progress),
            speed: Number(r.speed),
            currentStop: r.current_stop,
            nextStop: r.next_stop,
            eta: Number(r.eta),
            lat: Number(r.latitude),
            lng: Number(r.longitude),
            health: r.health,
            lastStopIndex: r.last_stop_index,
            nextStopIndex: r.next_stop_index,
            distanceToNext: Number(r.distance_to_next),
            lastUpdated: new Date(r.last_updated)
          };
          occupancy[r.bus_id] = {
            busId: r.bus_id,
            passengers: r.passengers,
            capacity: r.capacity,
            percentage: r.percentage,
            status: r.percentage <= 40 ? "Low Crowd" : r.percentage <= 75 ? "Medium Crowd" : r.percentage <= 100 ? "High Crowd" : "Overcrowded",
            class: r.percentage <= 40 ? "status-chip-low" : r.percentage <= 75 ? "status-chip-medium" : r.percentage <= 100 ? "status-chip-high" : "status-chip-overcrowded",
            colorHex: r.percentage <= 40 ? "#22c55e" : r.percentage <= 75 ? "#eab308" : r.percentage <= 100 ? "#ef4444" : "#991b1b",
            lastUpdated: new Date(r.last_updated)
          };
        });
        localStorage.setItem(KEYS.TRACKING, JSON.stringify(tracking));
        localStorage.setItem(KEYS.OCCUPANCY, JSON.stringify(occupancy));
      }

      // 8. Activities
      const { data: activities } = await supabase
        .from('iot_events')
        .select('*')
        .eq('event_type', 'system_activity')
        .order('timestamp', { ascending: false })
        .limit(30);
      if (activities) {
        const formatted = activities.map(act => ({
          id: 'act_' + act.id,
          title: act.payload ? act.payload.title : 'System Log',
          desc: act.payload ? act.payload.desc : '',
          time: 'Just now'
        }));
        localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(formatted));
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: "all" } }));
      }
    } catch (e) {
      console.error("SharedStore Supabase initial sync failed:", e);
    }
  },

  subscribeToRealtime() {
    if (!supabase) {
      console.warn("SharedStore: Supabase client is not initialized. Skipping realtime subscriptions.");
      return;
    }
    // 1. live_bus_status
    supabase
      .channel('live_bus_status_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_bus_status' }, payload => {
        const r = payload.new;
        if (r) {
          const tracking = this.getItem(KEYS.TRACKING) || {};
          const occupancy = this.getItem(KEYS.OCCUPANCY) || {};

          tracking[r.bus_id] = {
            busId: r.bus_id,
            progress: Number(r.progress),
            speed: Number(r.speed),
            currentStop: r.current_stop,
            nextStop: r.next_stop,
            eta: Number(r.eta),
            lat: Number(r.latitude),
            lng: Number(r.longitude),
            health: r.health,
            lastStopIndex: r.last_stop_index,
            nextStopIndex: r.next_stop_index,
            distanceToNext: Number(r.distance_to_next),
            lastUpdated: new Date(r.last_updated)
          };

          occupancy[r.bus_id] = {
            busId: r.bus_id,
            passengers: r.passengers,
            capacity: r.capacity,
            percentage: r.percentage,
            status: r.percentage <= 40 ? "Low Crowd" : r.percentage <= 75 ? "Medium Crowd" : r.percentage <= 100 ? "High Crowd" : "Overcrowded",
            class: r.percentage <= 40 ? "status-chip-low" : r.percentage <= 75 ? "status-chip-medium" : r.percentage <= 100 ? "status-chip-high" : "status-chip-overcrowded",
            colorHex: r.percentage <= 40 ? "#22c55e" : r.percentage <= 75 ? "#eab308" : r.percentage <= 100 ? "#ef4444" : "#991b1b",
            lastUpdated: new Date(r.last_updated)
          };

          localStorage.setItem(KEYS.TRACKING, JSON.stringify(tracking));
          localStorage.setItem(KEYS.OCCUPANCY, JSON.stringify(occupancy));
          
          window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.TRACKING } }));
        }
      })
      .subscribe();

    // 2. alerts
    supabase
      .channel('alerts_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, () => {
        supabase.from('alerts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
          if (data) {
            const formatted = data.map(a => ({
              id: a.id,
              type: a.type,
              title: a.title,
              desc: a.description,
              busId: a.bus_id,
              priority: a.priority,
              status: a.status,
              time: a.time
            }));
            localStorage.setItem(KEYS.ALERTS, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.ALERTS } }));
          }
        });
      })
      .subscribe();

    // 3. devices
    supabase
      .channel('devices_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'devices' }, () => {
        supabase.from('devices').select('*').then(({ data }) => {
          if (data) {
            const formatted = data.map(d => ({
              id: d.id,
              busId: d.bus_id,
              status: d.status,
              lastComm: d.last_comm,
              fwVersion: d.fw_version,
              rssi: d.rssi,
              heap: d.heap,
              temperature: d.temperature
            }));
            localStorage.setItem(KEYS.DEVICES, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.DEVICES } }));
          }
        });
      })
      .subscribe();

    // 4. iot_events
    supabase
      .channel('iot_events_channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'iot_events' }, payload => {
        const event = payload.new;
        if (!event) return;

        if (event.event_type === 'system_activity') {
          const activities = this.getItem(KEYS.ACTIVITIES) || [];
          activities.unshift({
            id: 'act_' + event.id,
            title: event.payload ? event.payload.title : 'System Log',
            desc: event.payload ? event.payload.desc : '',
            time: 'Just now'
          });
          const capped = activities.slice(0, 30);
          localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(capped));
          window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.ACTIVITIES } }));
        } else {
          // Process hardware node telemetry (e.g. device_id = 70:4B:CA:46:82:90)
          const devId = event.device_id || "70:4B:CA:46:82:90";
          const busId = event.bus_id || "47A";

          // Update Devices list
          const devices = this.getItem(KEYS.DEVICES) || [];
          let devIndex = devices.findIndex(d => 
            d.id === devId || 
            d.id.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === devId.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
          );

          const updatedDev = {
            id: devId,
            busId: busId,
            status: "Online",
            lastComm: "Just now",
            fwVersion: event.fw_version || "v1.4.2",
            rssi: event.rssi ? (String(event.rssi).includes('dBm') ? event.rssi : `${event.rssi} dBm`) : "-58 dBm",
            heap: event.heap || "182 KB",
            temperature: event.temperature ? (String(event.temperature).includes('°C') ? event.temperature : `${event.temperature} °C`) : "41.5 °C",
            isRealHardware: true,
            lastCommTimestamp: Date.now()
          };

          if (devIndex !== -1) {
            devices[devIndex] = { ...devices[devIndex], ...updatedDev };
          } else {
            devices.unshift(updatedDev);
          }
          localStorage.setItem(KEYS.DEVICES, JSON.stringify(devices));
          window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.DEVICES } }));

          // Update live bus status / tracking / occupancy if lat/lng/passengers provided
          if (busId && (event.latitude || event.passengers !== undefined)) {
            const tracking = this.getItem(KEYS.TRACKING) || {};
            const occupancy = this.getItem(KEYS.OCCUPANCY) || {};

            if (event.latitude && event.longitude) {
              tracking[busId] = {
                ...(tracking[busId] || {}),
                busId: busId,
                lat: Number(event.latitude),
                lng: Number(event.longitude),
                speed: event.speed !== undefined ? Number(event.speed) : 35,
                health: "Good",
                lastUpdated: new Date()
              };
              localStorage.setItem(KEYS.TRACKING, JSON.stringify(tracking));
              window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.TRACKING } }));
            }

            if (event.passengers !== undefined) {
              const pass = Number(event.passengers);
              const cap = (occupancy[busId] && occupancy[busId].capacity) ? occupancy[busId].capacity : 60;
              const pct = Math.round((pass / cap) * 100);
              occupancy[busId] = {
                ...(occupancy[busId] || {}),
                busId: busId,
                passengers: pass,
                capacity: cap,
                percentage: pct,
                status: pct <= 40 ? "Low Crowd" : pct <= 75 ? "Medium Crowd" : pct <= 100 ? "High Crowd" : "Overcrowded",
                class: pct <= 40 ? "status-chip-low" : pct <= 75 ? "status-chip-medium" : pct <= 100 ? "status-chip-high" : "status-chip-overcrowded",
                colorHex: pct <= 40 ? "#22c55e" : pct <= 75 ? "#eab308" : pct <= 100 ? "#ef4444" : "#991b1b",
                lastUpdated: new Date()
              };
              localStorage.setItem(KEYS.OCCUPANCY, JSON.stringify(occupancy));
              window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.OCCUPANCY } }));
            }
          }

          // Trigger custom event for UI console loggers / toasts
          window.dispatchEvent(new CustomEvent("crowdsense_iot_telemetry_received", { detail: event }));

          // Upsert into Supabase devices and live_bus_status tables for 2-way DB sync
          if (supabase) {
            supabase.from('devices').upsert({
              id: devId,
              bus_id: busId,
              status: 'Online',
              rssi: updatedDev.rssi,
              temperature: updatedDev.temperature,
              last_comm: 'Just now',
              updated_at: new Date()
            }).then(({ error }) => {
              if (error) console.error("Error upserting device in Supabase:", error);
            });

            if (busId && (event.latitude || event.passengers !== undefined)) {
              const pass = event.passengers !== undefined ? Number(event.passengers) : undefined;
              const dbUpdate = {
                bus_id: busId,
                last_updated: new Date()
              };
              if (event.latitude && event.longitude) {
                dbUpdate.latitude = Number(event.latitude);
                dbUpdate.longitude = Number(event.longitude);
                dbUpdate.speed = event.speed !== undefined ? Number(event.speed) : 35;
              }
              if (pass !== undefined) {
                dbUpdate.passengers = pass;
              }
              supabase.from('live_bus_status').upsert(dbUpdate, { onConflict: 'bus_id' }).then(({ error }) => {
                if (error) console.error("Error upserting live_bus_status in Supabase:", error);
              });
            }
          }
        }
      })
      .subscribe();

    // 5. buses realtime
    supabase
      .channel('buses_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'buses' }, () => {
        supabase.from('buses').select('*').then(({ data }) => {
          if (data) {
            const formatted = data.map(b => ({
              id: b.id,
              routeId: b.route_id,
              number: b.number,
              name: b.name,
              type: b.type,
              source: b.source,
              destination: b.destination,
              platform: b.platform,
              capacity: b.capacity,
              status: b.status,
              deviceId: b.device_id,
              driverName: b.driver_name
            }));
            localStorage.setItem(KEYS.BUSES, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.BUSES } }));
          }
        });
      })
      .subscribe();
      
    // 6. routes realtime
    supabase
      .channel('routes_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'routes' }, () => {
        supabase.from('routes').select('*').then(({ data }) => {
          if (data) {
            const formatted = data.map(r => ({
              number: r.number,
              name: r.name,
              source: r.source,
              destination: r.destination,
              stops: r.stops || []
            }));
            localStorage.setItem(KEYS.ROUTES, JSON.stringify(formatted));
            window.dispatchEvent(new CustomEvent("crowdsense_store_updated", { detail: { key: KEYS.ROUTES } }));
          }
        });
      })
      .subscribe();
  }
};

export async function saveOrUpdateTelemetry(payload) {
  if (!supabase) {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("crowdsense_iot_telemetry_received", { detail: payload }));
    }
    return;
  }

  const busId = payload.bus_id || "BUS_001";
  const devId = payload.device_id || "70:4B:CA:46:82:90";

  // 1. Check if row exists in iot_events for this bus_id -> UPDATE if exists, INSERT if missing
  const { data: existingEvent } = await supabase
    .from('iot_events')
    .select('id')
    .eq('bus_id', busId)
    .limit(1)
    .maybeSingle();

  if (existingEvent) {
    await supabase.from('iot_events').update({
      ...payload,
      timestamp: new Date()
    }).eq('id', existingEvent.id);
  } else {
    await supabase.from('iot_events').insert([{
      ...payload,
      timestamp: new Date()
    }]);
  }

  // 2. Check if row exists in devices for this device id -> UPDATE if exists, INSERT if missing
  const devPayload = {
    id: devId,
    bus_id: busId,
    status: 'Online',
    rssi: payload.rssi || '-60 dBm',
    temperature: payload.temperature || '38.5 °C',
    last_comm: 'Just now',
    updated_at: new Date()
  };

  const { data: existingDev } = await supabase
    .from('devices')
    .select('id')
    .eq('id', devId)
    .limit(1)
    .maybeSingle();

  if (existingDev) {
    await supabase.from('devices').update(devPayload).eq('id', devId);
  } else {
    await supabase.from('devices').insert([devPayload]);
  }

  // 3. Check if row exists in live_bus_status for this bus_id -> UPDATE if exists, INSERT if missing
  const livePayload = {
    bus_id: busId,
    latitude: payload.latitude,
    longitude: payload.longitude,
    speed: payload.speed,
    passengers: payload.passengers,
    last_updated: new Date()
  };

  const { data: existingLive } = await supabase
    .from('live_bus_status')
    .select('bus_id')
    .eq('bus_id', busId)
    .limit(1)
    .maybeSingle();

  if (existingLive) {
    await supabase.from('live_bus_status').update(livePayload).eq('bus_id', busId);
  } else {
    await supabase.from('live_bus_status').insert([livePayload]);
  }
}


