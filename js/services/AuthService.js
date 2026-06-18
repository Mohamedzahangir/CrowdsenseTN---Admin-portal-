import { supabase } from './supabaseClient';
import { SharedStore, KEYS, defaultUsers } from './SharedStore';

export const AuthService = {
  async login(email, password) {
    let user = null;
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', email);

        if (!error && data && data.length > 0) {
          user = data[0];
        }
      } catch (err) {
        console.error("AuthService: Supabase query failed, falling back to local users:", err);
      }
    }

    // Fallback to local storage users or default users if Supabase client is missing or fails
    if (!user) {
      const localUsers = SharedStore.getItem(KEYS.USERS) || defaultUsers;
      user = localUsers.find(u => u.email === email);
    }

    if (!user) {
      throw new Error("Invalid admin credentials.");
    }

    localStorage.setItem('admin_session_user', JSON.stringify({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }));
    return user;
  },

  getCurrentUser() {
    const session = localStorage.getItem('admin_session_user');
    return session ? JSON.parse(session) : null;
  },

  logout() {
    localStorage.removeItem('admin_session_user');
  },

  hasRole(allowedRoles) {
    const user = this.getCurrentUser();
    if (!user) return false;
    return allowedRoles.includes(user.role);
  }
};
