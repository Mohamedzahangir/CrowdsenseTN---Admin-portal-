import { supabase } from './supabaseClient';

export const TripService = {
  async getActiveTrips() {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('trips')
      .select('*');
    if (error) {
      console.error("Error fetching active trips:", error);
      return [];
    }
    return data;
  },

  async createTrip(trip) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('trips')
      .insert([trip])
      .select();
    if (error) console.error("Error creating trip:", error);
    return data;
  },

  async updateTripStatus(tripId, status) {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from('trips')
      .update({ status })
      .eq('id', tripId)
      .select();
    if (error) console.error("Error updating trip status:", error);
    return data;
  }
};
