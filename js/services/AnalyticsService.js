import { supabase } from './supabaseClient';

export const AnalyticsService = {
  async getDailyRouteAnalytics() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('route_analytics_daily')
      .select('*')
      .order('date', { ascending: false });
    if (error) {
      console.error("Error fetching daily route analytics:", error);
      return [];
    }
    return data;
  },

  async getGPSTraceHistory(busId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('gps_history')
      .select('*')
      .eq('bus_id', busId)
      .order('timestamp', { ascending: false })
      .limit(100);
    if (error) {
      console.error("Error fetching GPS history:", error);
      return [];
    }
    return data;
  },

  async getOccupancyHistory(busId) {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('occupancy_history')
      .select('*')
      .eq('bus_id', busId)
      .order('timestamp', { ascending: false })
      .limit(100);
    if (error) {
      console.error("Error fetching occupancy history:", error);
      return [];
    }
    return data;
  }
};
