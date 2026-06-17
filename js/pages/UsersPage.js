// UsersPage.js - System Admin Staff Accounts Management
import { DataService } from '../services/DataService';
import { ModalComponent } from '../components/ModalComponent';
import { ToastComponent } from '../components/ToastComponent';

let dataSubscription = null;

export const UsersPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Administrative Access Management</h1>
            <p class="page-subtitle">Assign transit roles, manage staff permission tiers, and create operator accounts.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-user">
            <span class="material-symbols-outlined">person_add</span>Register Staff Profile
          </button>
        </div>
      </div>

      <!-- Users Grid -->
      <div class="grid-3 fade-in fade-in-delay-1" id="users-grid-container">
        <!-- populated dynamically -->
      </div>
    `;
  },

  mount() {
    dataSubscription = (state) => {
      this.renderUsers(state);
    };

    DataService.subscribe("users", dataSubscription);

    document.getElementById("btn-add-user")?.addEventListener("click", () => {
      this.openAddUserModal();
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("users", dataSubscription);
      dataSubscription = null;
    }
  },

  updateUsers() {
    const state = {
      users: DataService.getUsers()
    };
    this.renderUsers(state);
  },

  renderUsers(state) {
    const container = document.getElementById("users-grid-container");
    if (!container) return;

    const users = state.users;

    if (users.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: span 3; padding: 40px; text-align:center;">
          <p class="text-muted">No administrative users found.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = users.map(user => {
      const initialLetters = user.name.split(" ").map(w => w[0]).join("").toUpperCase();
      let roleBadgeClass = "badge-neutral";
      if (user.role === "Super Admin") roleBadgeClass = "badge-danger";
      else if (user.role === "Transport Officer") roleBadgeClass = "badge-primary";
      else if (user.role === "Route Manager") roleBadgeClass = "badge-secondary";
      else if (user.role === "Operations Manager") roleBadgeClass = "badge-warning";

      return `
        <div class="card flex flex-col justify-between" style="padding: 20px; text-align:center; position:relative;">
          <!-- Top corners controls -->
          <div style="position:absolute; top:10px; right:10px;" class="td-actions">
            <button class="btn-icon edit-user" data-user-id="${user.id}" title="Edit Profile"><span class="material-symbols-outlined" style="font-size:16px;">edit</span></button>
            <button class="btn-icon delete-user" style="color:var(--color-danger)" data-user-id="${user.id}" title="Delete User"><span class="material-symbols-outlined" style="font-size:16px;">delete</span></button>
          </div>

          <div style="display:flex; flex-direction:column; align-items:center; margin-bottom:12px;">
            <div class="admin-avatar" style="width:56px; height:56px; font-size:18px; font-weight:700; margin-bottom:12px; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">${initialLetters}</div>
            <h3 class="font-bold text-base" style="color:var(--color-text-primary);">${user.name}</h3>
            <p class="text-muted text-sm" style="margin-bottom:8px;">${user.email}</p>
            <span class="badge ${roleBadgeClass}">${user.role}</span>
          </div>

          <div style="border-top:1px solid var(--color-border-subtle); padding-top:10px; margin-top:8px; display:flex; justify-content:between; align-items:center;">
            <span class="text-sm text-muted">Status:</span>
            <span class="badge badge-success">Active</span>
          </div>
        </div>
      `;
    }).join("");

    // Bind actions
    container.querySelectorAll(".edit-user").forEach(btn => {
      btn.addEventListener("click", () => this.openEditUserModal(btn.getAttribute("data-user-id")));
    });

    container.querySelectorAll(".delete-user").forEach(btn => {
      btn.addEventListener("click", () => this.deleteUser(btn.getAttribute("data-user-id")));
    });
  },

  openAddUserModal() {
    const bodyHtml = `
      <form id="form-add-user">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" name="name" class="form-control" placeholder="e.g. S. Ramesh Kumar" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" placeholder="e.g. ramesh.k@crowdsense.tn.gov" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Administrative Role</label>
            <select name="role" class="form-control">
              <option value="Super Admin">Super Admin</option>
              <option value="Transport Officer">Transport Officer</option>
              <option value="Route Manager">Route Manager</option>
              <option value="Operations Manager">Operations Manager</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Permission Access Level</label>
            <select name="access" class="form-control">
              <option value="read_write">Full Access (Read/Write)</option>
              <option value="read_only">Audit Access (Read-Only)</option>
            </select>
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-user">Cancel</button>
      <button class="btn btn-primary" id="btn-save-user">Create Account</button>
    `;

    const modal = ModalComponent.show({
      title: "Register Administrative Staff Profile",
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-user")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-user")?.addEventListener("click", () => {
      const form = document.getElementById("form-add-user");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const newUser = {
        name: formData.get("name"),
        email: formData.get("email"),
        role: formData.get("role"),
        accessLevel: formData.get("access")
      };

      DataService.addUser(newUser);
      ToastComponent.show("Staff Profile Created", "success", `Account for ${newUser.name} registered.`);
      modal.close();
      this.updateUsers();
    });
  },

  openEditUserModal(userId) {
    const user = DataService.getUsers().find(u => u.id === userId);
    if (!user) return;

    const bodyHtml = `
      <form id="form-edit-user">
        <div class="form-group">
          <label class="form-label">Full Name</label>
          <input type="text" name="name" class="form-control" value="${user.name}" required>
        </div>
        <div class="form-group">
          <label class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" value="${user.email}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Administrative Role</label>
            <select name="role" class="form-control">
              <option value="Super Admin" ${user.role === "Super Admin" ? "selected" : ""}>Super Admin</option>
              <option value="Transport Officer" ${user.role === "Transport Officer" ? "selected" : ""}>Transport Officer</option>
              <option value="Route Manager" ${user.role === "Route Manager" ? "selected" : ""}>Route Manager</option>
              <option value="Operations Manager" ${user.role === "Operations Manager" ? "selected" : ""}>Operations Manager</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Permission Access Level</label>
            <select name="access" class="form-control">
              <option value="read_write" ${user.accessLevel === "read_write" ? "selected" : ""}>Full Access (Read/Write)</option>
              <option value="read_only" ${user.accessLevel === "read_only" ? "selected" : ""}>Audit Access (Read-Only)</option>
            </select>
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-user">Cancel</button>
      <button class="btn btn-primary" id="btn-save-user">Save Changes</button>
    `;

    const modal = ModalComponent.show({
      title: `Edit Staff Account: ${user.name}`,
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-user")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-user")?.addEventListener("click", () => {
      const form = document.getElementById("form-edit-user");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const updatedFields = {
        name: formData.get("name"),
        email: formData.get("email"),
        role: formData.get("role"),
        accessLevel: formData.get("access")
      };

      DataService.updateUser(user.id, updatedFields);
      ToastComponent.show("Staff Profile Updated", "success", `Changes saved for ${updatedFields.name}`);
      modal.close();
      this.updateUsers();
    });
  },

  deleteUser(userId) {
    const user = DataService.getUsers().find(u => u.id === userId);
    if (!user) return;

    if (confirm(`Are you sure you want to delete access account for staff ${user.name}?`)) {
      DataService.deleteUser(userId);
      ToastComponent.show("Staff Profile Removed", "danger", `${user.name} removed from admin access.`);
      this.updateUsers();
    }
  }
};
