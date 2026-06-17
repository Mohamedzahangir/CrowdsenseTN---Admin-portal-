// BusesPage.js - Bus Fleet Management Module
import { DataService } from '../services/DataService';
import { ModalComponent } from '../components/ModalComponent';
import { ToastComponent } from '../components/ToastComponent';
import { StatusBadge } from '../components/StatusBadge';

let dataSubscription = null;
let currentSearch = "";
let currentStatusFilter = "All";
let currentOccupancyFilter = "All";

export const BusesPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Bus Fleet Management</h1>
            <p class="page-subtitle">Add, edit, monitor, and decommission public transit vehicles.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-bus">
            <span class="material-symbols-outlined">add</span>Register Vehicle
          </button>
        </div>
      </div>

      <!-- Filters Toolbar -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="bus-search" class="search-input" placeholder="Search by ID, Reg. No, Driver..." value="${currentSearch}">
            </div>
            
            <select id="filter-bus-status" class="filter-select">
              <option value="All" ${currentStatusFilter === "All" ? "selected" : ""}>All Statuses</option>
              <option value="Active" ${currentStatusFilter === "Active" ? "selected" : ""}>Active Only</option>
              <option value="Inactive" ${currentStatusFilter === "Inactive" ? "selected" : ""}>Inactive Only</option>
            </select>

            <select id="filter-bus-occupancy" class="filter-select">
              <option value="All" ${currentOccupancyFilter === "All" ? "selected" : ""}>All Load Levels</option>
              <option value="Low" ${currentOccupancyFilter === "Low" ? "selected" : ""}>Low (&lt;40%)</option>
              <option value="Medium" ${currentOccupancyFilter === "Medium" ? "selected" : ""}>Medium (40-75%)</option>
              <option value="High" ${currentOccupancyFilter === "High" ? "selected" : ""}>High (&gt;75%)</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Fleet Data Table -->
      <div class="card fade-in fade-in-delay-2">
        <div class="card-body-flush">
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Bus ID / Route</th>
                  <th>Reg. Number</th>
                  <th>Vehicle Name</th>
                  <th>Driver Name</th>
                  <th>Linked IoT Device</th>
                  <th>Load Capacity</th>
                  <th>Operational Status</th>
                  <th style="text-align:right">Actions</th>
                </tr>
              </thead>
              <tbody id="buses-table-body">
                <!-- populated dynamically -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    dataSubscription = (state) => {
      this.renderTable(state);
    };

    DataService.subscribe("buses", dataSubscription);

    // Bind Filter inputs
    const searchInput = document.getElementById("bus-search");
    const statusSelect = document.getElementById("filter-bus-status");
    const occupancySelect = document.getElementById("filter-bus-occupancy");

    searchInput?.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      this.updateTable();
    });

    statusSelect?.addEventListener("change", (e) => {
      currentStatusFilter = e.target.value;
      this.updateTable();
    });

    occupancySelect?.addEventListener("change", (e) => {
      currentOccupancyFilter = e.target.value;
      this.updateTable();
    });

    // Add Bus Click
    document.getElementById("btn-add-bus")?.addEventListener("click", () => {
      this.openAddBusModal();
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("buses", dataSubscription);
      dataSubscription = null;
    }
  },

  updateTable() {
    const state = {
      buses: DataService.getBuses(),
      routes: DataService.getRoutes(),
      devices: DataService.getDevices(),
      alerts: DataService.getAlerts(),
      tracking: DataService.getLiveState().tracking,
      occupancy: DataService.getLiveState().occupancy
    };
    this.renderTable(state);
  },

  renderTable(state) {
    const tbody = document.getElementById("buses-table-body");
    if (!tbody) return;

    let filtered = state.buses;

    // Search query filter
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(b => 
        b.id.toLowerCase().includes(q) ||
        b.number.toLowerCase().includes(q) ||
        b.name.toLowerCase().includes(q) ||
        b.driverName.toLowerCase().includes(q)
      );
    }

    // Status filter
    if (currentStatusFilter !== "All") {
      filtered = filtered.filter(b => b.status === currentStatusFilter);
    }

    // Occupancy level filter
    if (currentOccupancyFilter !== "All") {
      filtered = filtered.filter(b => {
        const occ = state.occupancy[b.id];
        if (!occ) return false;
        if (currentOccupancyFilter === "Low") return occ.percentage <= 40;
        if (currentOccupancyFilter === "Medium") return occ.percentage > 40 && occ.percentage <= 75;
        if (currentOccupancyFilter === "High") return occ.percentage > 75;
        return true;
      });
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align:center; padding: 32px;" class="text-muted">
            No buses matched your query.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(bus => {
      const occ = state.occupancy[bus.id];
      const tracking = state.tracking[bus.id];
      const loadText = occ ? `${occ.passengers} / ${bus.capacity} (${occ.percentage}%)` : `0 / ${bus.capacity} (0%)`;
      
      let badgeClass = bus.status === "Active" ? "badge-success" : "badge-neutral";
      let deviceBadge = bus.deviceId ? `<code style="background:#f1f5f9; padding:2px 4px; border-radius:3px">${bus.deviceId}</code>` : `<span class="text-muted">None</span>`;

      return `
        <tr>
          <td class="td-primary" data-label="Bus ID">Route ${bus.id}</td>
          <td data-label="Reg. Number">${bus.number}</td>
          <td data-label="Vehicle Name">${bus.name}</td>
          <td data-label="Driver Name">${bus.driverName}</td>
          <td data-label="IoT Device">${deviceBadge}</td>
          <td data-label="Capacity / Load" style="display:flex; align-items:center; gap:8px; border:none; padding:12px 16px;">
            <span>${loadText}</span>
            ${occ ? StatusBadge.render(occ.percentage) : ""}
          </td>
          <td data-label="Operational Status"><span class="badge ${badgeClass}">${bus.status}</span></td>
          <td style="text-align:right" class="td-actions" data-label="Actions">
            <button class="btn-icon view-bus" data-bus-id="${bus.id}" title="View Details"><span class="material-symbols-outlined">visibility</span></button>
            <button class="btn-icon edit-bus" data-bus-id="${bus.id}" title="Edit Metadata"><span class="material-symbols-outlined">edit</span></button>
            <button class="btn-icon delete-bus" style="color:var(--color-danger)" data-bus-id="${bus.id}" title="Decommission"><span class="material-symbols-outlined">delete</span></button>
          </td>
        </tr>
      `;
    }).join("");

    // Bind action clicks
    tbody.querySelectorAll(".view-bus").forEach(btn => {
      btn.addEventListener("click", () => this.viewBusDetails(btn.getAttribute("data-bus-id")));
    });

    tbody.querySelectorAll(".edit-bus").forEach(btn => {
      btn.addEventListener("click", () => this.openEditBusModal(btn.getAttribute("data-bus-id")));
    });

    tbody.querySelectorAll(".delete-bus").forEach(btn => {
      btn.addEventListener("click", () => this.decommissionBus(btn.getAttribute("data-bus-id")));
    });
  },

  openAddBusModal() {
    const routes = DataService.getRoutes();
    const routeOptionsHtml = routes.map(r => `<option value="${r.number}">${r.number} - ${r.source} to ${r.destination}</option>`).join("");
    
    const devices = DataService.getDevices().filter(d => !d.busId); // free devices
    const deviceOptionsHtml = `<option value="">None</option>` + devices.map(d => `<option value="${d.id}">${d.id}</option>`).join("");

    const bodyHtml = `
      <form id="form-add-bus">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Bus Number (Route ID)</label>
            <input type="text" name="id" class="form-control" placeholder="e.g. 500" required>
          </div>
          <div class="form-group">
            <label class="form-label">Registration Plate</label>
            <input type="text" name="number" class="form-control" placeholder="e.g. TN-01-N-9999" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Vehicle Name</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. Broad City Fast" required>
          </div>
          <div class="form-group">
            <label class="form-label">Vehicle Type</label>
            <select name="type" class="form-control">
              <option value="Local">Local</option>
              <option value="Express">Express</option>
              <option value="Fast">Fast</option>
              <option value="City">City</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Total Seat Capacity</label>
            <input type="number" name="capacity" class="form-control" value="60" required>
          </div>
          <div class="form-group">
            <label class="form-label">Driver Name</label>
            <input type="text" name="driverName" class="form-control" placeholder="Driver full name" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Linked Route Route</label>
            <select name="routeNum" class="form-control">
              ${routeOptionsHtml}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Linked ESP32 IoT Node</label>
            <select name="deviceId" class="form-control">
              ${deviceOptionsHtml}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Operational Status</label>
          <select name="status" class="form-control">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-add">Cancel</button>
      <button class="btn btn-primary" id="btn-save-add">Save Vehicle</button>
    `;

    const modal = ModalComponent.show({
      title: "Register New Bus Node",
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-add")?.addEventListener("click", () => modal.close());
    
    document.getElementById("btn-save-add")?.addEventListener("click", () => {
      const form = document.getElementById("form-add-bus");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const newBus = {
        id: formData.get("id"),
        number: formData.get("number"),
        name: formData.get("name"),
        type: formData.get("type"),
        capacity: parseInt(formData.get("capacity")),
        driverName: formData.get("driverName"),
        status: formData.get("status"),
        deviceId: formData.get("deviceId") || "",
        // Assign source/destination based on route selection
        source: "Depot",
        destination: "Terminal"
      };

      const selectedRoute = routes.find(r => r.number === formData.get("routeNum"));
      if (selectedRoute) {
        newBus.source = selectedRoute.source;
        newBus.destination = selectedRoute.destination;
      }

      // If device linked, update device
      const dId = formData.get("deviceId");
      if (dId) {
        DataService.updateDevice(dId, { busId: newBus.id, status: "Online" });
      }

      // Save
      DataService.addBus(newBus);
      ToastComponent.show("Vehicle Registered", "success", `Bus ${newBus.id} registered successfully.`);
      modal.close();
      this.updateTable();
    });
  },

  openEditBusModal(busId) {
    const bus = DataService.getBuses().find(b => b.id === busId);
    if (!bus) return;

    const routes = DataService.getRoutes();
    const routeOptionsHtml = routes.map(r => `<option value="${r.number}" ${r.number === bus.id ? "selected" : ""}>${r.number} - ${r.source} to ${r.destination}</option>`).join("");
    
    const devices = DataService.getDevices().filter(d => !d.busId || d.busId === bus.id);
    const deviceOptionsHtml = `<option value="">None</option>` + devices.map(d => `<option value="${d.id}" ${d.id === bus.deviceId ? "selected" : ""}>${d.id}</option>`).join("");

    const bodyHtml = `
      <form id="form-edit-bus">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Bus Number (Route ID)</label>
            <input type="text" name="id" class="form-control" value="${bus.id}" disabled>
          </div>
          <div class="form-group">
            <label class="form-label">Registration Plate</label>
            <input type="text" name="number" class="form-control" value="${bus.number}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Vehicle Name</label>
            <input type="text" name="name" class="form-control" value="${bus.name}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Vehicle Type</label>
            <select name="type" class="form-control">
              <option value="Local" ${bus.type === "Local" ? "selected" : ""}>Local</option>
              <option value="Express" ${bus.type === "Express" ? "selected" : ""}>Express</option>
              <option value="Fast" ${bus.type === "Fast" ? "selected" : ""}>Fast</option>
              <option value="City" ${bus.type === "City" ? "selected" : ""}>City</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Total Seat Capacity</label>
            <input type="number" name="capacity" class="form-control" value="${bus.capacity}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Driver Name</label>
            <input type="text" name="driverName" class="form-control" value="${bus.driverName}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Linked Route Route</label>
            <select name="routeNum" class="form-control" disabled>
              ${routeOptionsHtml}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Linked ESP32 IoT Node</label>
            <select name="deviceId" class="form-control">
              ${deviceOptionsHtml}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Operational Status</label>
          <select name="status" class="form-control">
            <option value="Active" ${bus.status === "Active" ? "selected" : ""}>Active</option>
            <option value="Inactive" ${bus.status === "Inactive" ? "selected" : ""}>Inactive</option>
          </select>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-edit">Cancel</button>
      <button class="btn btn-primary" id="btn-save-edit">Save Changes</button>
    `;

    const modal = ModalComponent.show({
      title: `Configure Metadata: Bus ${bus.id}`,
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-edit")?.addEventListener("click", () => modal.close());
    
    document.getElementById("btn-save-edit")?.addEventListener("click", () => {
      const form = document.getElementById("form-edit-bus");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const previousDevice = bus.deviceId;
      const newDevice = formData.get("deviceId") || "";

      const updatedBus = {
        number: formData.get("number"),
        name: formData.get("name"),
        type: formData.get("type"),
        capacity: parseInt(formData.get("capacity")),
        driverName: formData.get("driverName"),
        status: formData.get("status"),
        deviceId: newDevice
      };

      // Handle Device Link updates
      if (previousDevice !== newDevice) {
        if (previousDevice) {
          DataService.updateDevice(previousDevice, { busId: "" });
        }
        if (newDevice) {
          DataService.updateDevice(newDevice, { busId: bus.id, status: "Online" });
        }
      }

      DataService.updateBus(bus.id, updatedBus);
      ToastComponent.show("Vehicle Configured", "success", `Metadata for Bus ${bus.id} updated.`);
      modal.close();
      this.updateTable();
    });
  },

  decommissionBus(busId) {
    const bus = DataService.getBuses().find(b => b.id === busId);
    if (!bus) return;

    if (confirm(`Are you sure you want to decommission/delete Bus Route ${busId}? This removes its live tracking feeds.`)) {
      if (bus.deviceId) {
        DataService.updateDevice(bus.deviceId, { busId: "" });
      }
      DataService.deleteBus(busId);
      ToastComponent.show("Bus Decommissioned", "danger", `Bus ${busId} decommissioned.`);
      this.updateTable();
    }
  },

  viewBusDetails(busId) {
    // Quick popup to view details
    const state = {
      buses: DataService.getBuses(),
      routes: DataService.getRoutes(),
      devices: DataService.getDevices(),
      tracking: DataService.getLiveState().tracking,
      occupancy: DataService.getLiveState().occupancy
    };

    const bus = state.buses.find(b => b.id === busId);
    const tracking = state.tracking[busId];
    const occupancy = state.occupancy[busId];
    const route = state.routes.find(r => r.number === busId);
    
    if (!bus) return;

    const stopList = route ? route.stops.map(s => `<li>${s.name} (${s.scheduledTime})</li>`).join("") : "No routes linked.";
    const lat = tracking ? tracking.lat : "N/A";
    const lng = tracking ? tracking.lng : "N/A";

    const bodyHtml = `
      <div style="font-size:13px; line-height:1.6;">
        <div style="margin-bottom:12px;"><b>Registration Plate:</b> ${bus.number}</div>
        <div style="margin-bottom:12px;"><b>Service Route Name:</b> ${bus.name}</div>
        <div style="margin-bottom:12px;"><b>Driver Assigned:</b> ${bus.driverName}</div>
        <div style="margin-bottom:12px;"><b>Active Route:</b> ${bus.source} &rarr; ${bus.destination}</div>
        <div style="margin-bottom:12px;"><b>IoT node hardware:</b> <code>${bus.deviceId || "Unlinked"}</code></div>
        
        <div style="border-top:1px solid var(--color-border-subtle); padding-top:12px; margin-top:12px;">
          <h4 class="font-bold text-sm mb-2" style="color:var(--color-primary);">Live Telemetry Status</h4>
          <div><b>Status:</b> <span class="badge ${bus.status === "Active" ? "badge-success" : "badge-neutral"}">${bus.status}</span></div>
          <div><b>Occupancy Load:</b> ${occupancy ? `${occupancy.passengers} / ${bus.capacity} (${occupancy.percentage}%)` : "N/A"}</div>
          <div><b>Current Stop:</b> ${tracking ? tracking.currentStop : "N/A"}</div>
          <div><b>Next Stop:</b> ${tracking ? tracking.nextStop : "N/A"}</div>
          <div><b>Coordinates:</b> ${lat}, ${lng}</div>
        </div>

        <div style="border-top:1px solid var(--color-border-subtle); padding-top:12px; margin-top:12px;">
          <h4 class="font-bold text-sm mb-2" style="color:var(--color-primary);">Stops Timeline</h4>
          <ol style="padding-left:20px; list-style-type: decimal;">
            ${stopList}
          </ol>
        </div>
      </div>
    `;

    ModalComponent.show({
      title: `Bus telemetry diagnostics: Route ${busId}`,
      bodyHtml,
      footerHtml: `<button class="btn btn-primary" id="btn-close-view">Done</button>`
    });

    document.getElementById("btn-close-view")?.addEventListener("click", () => {
      document.getElementById("modal-overlay")?.classList.add("hidden");
      document.body.style.overflow = "";
    });
  }
};
