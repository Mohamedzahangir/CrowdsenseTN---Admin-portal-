import { supabase } from './supabaseClient';

export const AuthService = {
  async login(email, password) {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email);

    if (error || !data || data.length === 0) {
      throw new Error("Invalid admin credentials.");
    }
    const user = data[0];
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
