// RoutesPage.js - Transit Routes Management Module
import { DataService } from '../services/DataService';
import { ModalComponent } from '../components/ModalComponent';
import { ToastComponent } from '../components/ToastComponent';

let dataSubscription = null;
let currentSearch = "";

export const RoutesPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Route Path Configuration</h1>
            <p class="page-subtitle">Configure source, destination, stops coordinates, scheduling, and bus assignments.</p>
          </div>
          <button class="btn btn-primary" id="btn-create-route">
            <span class="material-symbols-outlined">add_road</span>Create Route Path
          </button>
        </div>
      </div>

      <!-- Search Toolbar -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="route-search" class="search-input" placeholder="Search by Route ID, source, destination..." value="${currentSearch}">
            </div>
          </div>
        </div>
      </div>

      <!-- Routes Grid -->
      <div class="grid-2 fade-in fade-in-delay-2" id="routes-grid-container">
        <!-- populated dynamically -->
      </div>
    `;
  },

  mount() {
    dataSubscription = (state) => {
      this.renderRoutes(state);
    };

    DataService.subscribe("routes", dataSubscription);

    document.getElementById("route-search")?.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      this.updateRoutes();
    });

    document.getElementById("btn-create-route")?.addEventListener("click", () => {
      this.openCreateRouteModal();
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("routes", dataSubscription);
      dataSubscription = null;
    }
  },

  updateRoutes() {
    const state = {
      buses: DataService.getBuses(),
      routes: DataService.getRoutes(),
      tracking: DataService.getLiveState().tracking,
      occupancy: DataService.getLiveState().occupancy
    };
    this.renderRoutes(state);
  },

  renderRoutes(state) {
    const container = document.getElementById("routes-grid-container");
    if (!container) return;

    let filtered = state.routes;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(r => 
        r.number.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.source.toLowerCase().includes(q) ||
        r.destination.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="card" style="grid-column: span 2; padding:40px; text-align:center;">
          <p class="text-muted">No route configurations found.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(route => {
      const assignedBuses = state.buses.filter(b => b.id === route.number);
      const stopsCount = route.stops ? route.stops.length : 0;
      
      const busesListHtml = assignedBuses.length > 0 
        ? assignedBuses.map(b => `<span class="badge badge-primary">Bus ${b.id}</span>`).join(" ")
        : `<span class="text-muted text-sm">None assigned</span>`;

      const stopsSummary = route.stops ? route.stops.map(s => s.name).join(" &rarr; ") : "No stops configured.";

      return `
        <div class="card flex flex-col justify-between">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">route</span>Route ${route.number}
            </div>
            <div class="card-actions">
              <button class="btn-icon edit-route" data-route-id="${route.number}" title="Edit Path"><span class="material-symbols-outlined">edit</span></button>
              <button class="btn-icon delete-route" style="color:var(--color-danger)" data-route-id="${route.number}" title="Delete Route"><span class="material-symbols-outlined">delete</span></button>
            </div>
          </div>
          <div class="card-body">
            <h3 class="font-bold text-sm mb-2" style="color:var(--color-text-secondary); text-transform:uppercase;">${route.name}</h3>
            
            <div class="flex items-center gap-2 mb-3">
              <span class="material-symbols-outlined text-muted" style="font-size:16px;">explore</span>
              <span class="text-sm font-semibold">${route.source} &rarr; ${route.destination}</span>
            </div>

            <div class="text-sm mb-3">
              <div class="text-muted mb-1 font-semibold text-[11px] uppercase tracking-wider">Transit Sequence (${stopsCount} Stops):</div>
              <div class="truncate text-muted" style="font-size:12px;" title="${stopsSummary}">${stopsSummary}</div>
            </div>

            <div class="grid-2 mb-4" style="background:#f8fafc; padding:10px; border-radius:8px;">
              <div>
                <div class="text-muted text-[10px] uppercase font-bold">Daily Passengers</div>
                <div class="font-bold text-primary-color" style="font-size:15px;">${route.dailyPassengers}</div>
              </div>
              <div>
                <div class="text-muted text-[10px] uppercase font-bold">Peak load</div>
                <div class="font-bold text-danger" style="font-size:15px;">${route.occupancyStats.peak}</div>
              </div>
            </div>

            <div class="flex items-center justify-between" style="border-top:1px solid var(--color-border-subtle); padding-top:12px; margin-top:12px;">
              <span class="text-sm font-semibold">Assigned Fleet:</span>
              <div class="flex flex-wrap gap-1">${busesListHtml}</div>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Bind edit/delete clicks
    container.querySelectorAll(".edit-route").forEach(btn => {
      btn.addEventListener("click", () => this.openEditRouteModal(btn.getAttribute("data-route-id")));
    });

    container.querySelectorAll(".delete-route").forEach(btn => {
      btn.addEventListener("click", () => this.deleteRoute(btn.getAttribute("data-route-id")));
    });
  },

  openCreateRouteModal() {
    const bodyHtml = `
      <form id="form-create-route">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Route Number</label>
            <input type="text" name="number" class="form-control" placeholder="e.g. 570" required>
          </div>
          <div class="form-group">
            <label class="form-label">Route Name</label>
            <input type="text" name="name" class="form-control" placeholder="e.g. OMR Express Route" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Source Terminus</label>
            <input type="text" name="source" class="form-control" placeholder="e.g. Koyambedu" required>
          </div>
          <div class="form-group">
            <label class="form-label">Destination Terminus</label>
            <input type="text" name="destination" class="form-control" placeholder="e.g. Siruseri IT Park" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Stops Sequence (comma-separated names)</label>
          <textarea name="stopsList" class="form-control" rows="3" placeholder="Anna Nagar, Teynampet, Gemini Flyover, Guindy" required></textarea>
          <small class="text-muted">Enter stop names in order. Map coordinates will be simulated automatically.</small>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Estimated Daily Commuters</label>
            <input type="number" name="dailyPassengers" class="form-control" value="1200" required>
          </div>
          <div class="form-group">
            <label class="form-label">Peak Occupancy Trend (%)</label>
            <input type="text" name="peakOcc" class="form-control" value="80%" placeholder="e.g. 85%" required>
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-route">Cancel</button>
      <button class="btn btn-primary" id="btn-save-route">Save Route Configuration</button>
    `;

    const modal = ModalComponent.show({
      title: "Configure New Smart Route Path",
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-route")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-route")?.addEventListener("click", () => {
      const form = document.getElementById("form-create-route");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const stopNames = formData.get("stopsList").split(",").map(s => s.trim()).filter(s => s.length > 0);
      
      // Generate simulated coordinates for stops between Guindy and Adyar
      const stops = stopNames.map((name, index) => {
        const progress = index / Math.max(1, stopNames.length - 1);
        return {
          name,
          distance: parseFloat((progress * 15).toFixed(1)),
          scheduledTime: `${8 + Math.floor(index / 2)}:${(index % 2 === 0 ? "00" : "30")} AM`,
          lat: 13.0064 + (progress * 0.05) - (Math.random() * 0.01),
          lng: 80.2577 - (progress * 0.04) + (Math.random() * 0.01)
        };
      });

      const routeNum = formData.get("number");
      const newRoute = {
        number: routeNum,
        name: formData.get("name"),
        source: formData.get("source"),
        destination: formData.get("destination"),
        stops,
        dailyPassengers: parseInt(formData.get("dailyPassengers")),
        occupancyStats: { peak: formData.get("peakOcc"), avg: "45%" }
      };

      DataService.addRoute(newRoute);
      ToastComponent.show("Route Configuration Saved", "success", `Route ${routeNum} created successfully.`);
      modal.close();
      this.updateRoutes();
    });
  },

  openEditRouteModal(routeId) {
    const route = DataService.getRoutes().find(r => r.number === routeId);
    if (!route) return;

    const stopsNamesCsv = route.stops ? route.stops.map(s => s.name).join(", ") : "";

    const bodyHtml = `
      <form id="form-edit-route">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Route Number</label>
            <input type="text" name="number" class="form-control" value="${route.number}" disabled>
          </div>
          <div class="form-group">
            <label class="form-label">Route Name</label>
            <input type="text" name="name" class="form-control" value="${route.name}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Source Terminus</label>
            <input type="text" name="source" class="form-control" value="${route.source}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Destination Terminus</label>
            <input type="text" name="destination" class="form-control" value="${route.destination}" required>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Stops Sequence (comma-separated names)</label>
          <textarea name="stopsList" class="form-control" rows="3" required>${stopsNamesCsv}</textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Daily Commuters count</label>
            <input type="number" name="dailyPassengers" class="form-control" value="${route.dailyPassengers}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Peak Occupancy (%)</label>
            <input type="text" name="peakOcc" class="form-control" value="${route.occupancyStats.peak}" required>
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-route">Cancel</button>
      <button class="btn btn-primary" id="btn-save-route">Save Changes</button>
    `;

    const modal = ModalComponent.show({
      title: `Configure Path: Route ${route.number}`,
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-route")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-route")?.addEventListener("click", () => {
      const form = document.getElementById("form-edit-route");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const stopNames = formData.get("stopsList").split(",").map(s => s.trim()).filter(s => s.length > 0);
      
      const stops = stopNames.map((name, index) => {
        const progress = index / Math.max(1, stopNames.length - 1);
        return {
          name,
          distance: parseFloat((progress * 15).toFixed(1)),
          scheduledTime: `${9 + Math.floor(index / 2)}:${(index % 2 === 0 ? "00" : "30")} AM`,
          lat: 13.0064 + (progress * 0.04),
          lng: 80.2577 - (progress * 0.03)
        };
      });

      const updatedFields = {
        name: formData.get("name"),
        source: formData.get("source"),
        destination: formData.get("destination"),
        stops,
        dailyPassengers: parseInt(formData.get("dailyPassengers")),
        occupancyStats: { peak: formData.get("peakOcc"), avg: route.occupancyStats.avg }
      };

      DataService.updateRoute(route.number, updatedFields);
      ToastComponent.show("Route Configuration Saved", "success", `Metadata for Route ${route.number} updated.`);
      modal.close();
      this.updateRoutes();
    });
  },

  deleteRoute(routeId) {
    if (confirm(`Are you sure you want to delete Route Path ${routeId}? This does not delete buses but unassigns their stop timeline.`)) {
      DataService.deleteRoute(routeId);
      ToastComponent.show("Route Deleted", "danger", `Route config ${routeId} removed.`);
      this.updateRoutes();
    }
  }
};
