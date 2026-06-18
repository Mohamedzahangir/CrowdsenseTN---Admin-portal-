// NotificationService.js - Centralized alerts, disruptions, and notifications system.
// Consumes the centralized SharedStore database and defines clear integration hooks.
import { SharedStore, KEYS } from './SharedStore';
import { supabase } from './supabaseClient';

export const NotificationService = {
  // Synchronous contract to maintain backward-compatibility with UI modules.
  // API Integration: Swap with fetch or WebSockets when API backend is deployed.

  getAlerts() {
    return SharedStore.getItem(KEYS.ALERTS) || [];
  },

  async createAlert(alert) {
    const alerts = this.getAlerts();
    const newAlert = {
      id: "a_" + Date.now(),
      status: "Unread",
      time: "Just now",
      ...alert
    };
    alerts.unshift(newAlert);
    SharedStore.setItem(KEYS.ALERTS, alerts);

    if (supabase) {
      const { error } = await supabase.from('alerts').insert([{
        id: newAlert.id,
        type: newAlert.type,
        title: newAlert.title,
        description: newAlert.desc,
        bus_id: newAlert.busId,
        priority: newAlert.priority,
        status: newAlert.status,
        time: newAlert.time
      }]);
      if (error) console.error("Error creating alert in Supabase:", error);
    }
  },

  async markAlertAsRead(alertId) {
    const alerts = this.getAlerts();
    const idx = alerts.findIndex(a => a.id === alertId);
    if (idx !== -1) {
      alerts[idx].status = "Read";
      SharedStore.setItem(KEYS.ALERTS, alerts);
    }

    if (supabase) {
      const { error } = await supabase.from('alerts').update({ status: 'Read' }).eq('id', alertId);
      if (error) console.error("Error marking alert as read in Supabase:", error);
    }
  },

  async markAllAlertsAsRead() {
    const alerts = this.getAlerts();
    alerts.forEach(a => a.status = "Read");
    SharedStore.setItem(KEYS.ALERTS, alerts);

    if (supabase) {
      const { error } = await supabase.from('alerts').update({ status: 'Read' }).neq('status', 'Read');
      if (error) console.error("Error marking all alerts as read in Supabase:", error);
    }
  },

  async archiveAlert(alertId) {
    let alerts = this.getAlerts();
    alerts = alerts.filter(a => a.id !== alertId);
    SharedStore.setItem(KEYS.ALERTS, alerts);

    if (supabase) {
      const { error } = await supabase.from('alerts').delete().eq('id', alertId);
      if (error) console.error("Error deleting alert in Supabase:", error);
    }
  },

  // Audit Logs (Admin Command Center Activities)
  getActivities() {
    return SharedStore.getItem(KEYS.ACTIVITIES) || [];
  },

  async addActivity(title, desc) {
    const activities = this.getActivities();
    const newAct = {
      id: "act_" + Date.now(),
      title,
      desc,
      time: "Just now"
    };
    activities.unshift(newAct);
    const capped = activities.slice(0, 30);
    SharedStore.setItem(KEYS.ACTIVITIES, capped);

    if (supabase) {
      const { error } = await supabase.from('iot_events').insert([{
        device_id: 'system',
        bus_id: 'system',
        event_type: 'system_activity',
        payload: { title, desc }
      }]);
      if (error) console.error("Error inserting system activity in Supabase:", error);
    }
  },

  // Formats alerts for passenger-facing Customer views
  getCustomerAlerts() {
    const rawAlerts = this.getAlerts();
    
    return rawAlerts.map(alert => {
      let type = "updates";
      let categoryLabel = "General Updates";
      let icon = "info";
      let colorClass = "border-primary";
      let bgClass = "bg-primary-fixed";
      let textClass = "text-primary";
      
      const priority = alert.priority || "Low";

      if (alert.type === "High Occupancy" || alert.type === "Overcrowding") {
        type = "critical";
        categoryLabel = "Heavy Crowd Alerts";
        icon = "groups";
        colorClass = "border-error";
        bgClass = "bg-error-container";
        textClass = "text-error";
      } else if (alert.type === "Route Delay" || alert.type === "Bus Delay" || priority === "High" || priority === "Critical") {
        type = "diversions";
        categoryLabel = "Service Disruptions";
        icon = "warning";
        colorClass = "border-tertiary";
        bgClass = "bg-tertiary-fixed";
        textClass = "text-tertiary";
      } else if (alert.type === "Device Offline" || alert.type === "Sensor Failure") {
        type = "updates";
        categoryLabel = "Telemetry Maintenance";
        icon = "settings_suggest";
        colorClass = "border-[#5c647a]";
        bgClass = "bg-slate-100";
        textClass = "text-[#5c647a]";
      } else if (priority === "Low") {
        type = "updates";
        categoryLabel = "Route Status Clear";
        icon = "check_circle";
        colorClass = "border-[#008a4f]";
        bgClass = "bg-green-100";
        textClass = "text-[#008a4f]";
      }

      return {
        id: alert.id,
        type: type,
        categoryLabel: categoryLabel,
        timeAgo: alert.time || "Just now",
        title: alert.title,
        description: alert.desc,
        affectedRoutes: alert.busId ? [`Route ${alert.busId}`] : ["System Wide"],
        icon: icon,
        colorClass: colorClass,
        bgClass: bgClass,
        textClass: textClass
      };
    });
  }
};
