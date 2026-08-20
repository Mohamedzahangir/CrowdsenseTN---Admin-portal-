// RoutesPage.js - Manage Universal Routes
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
            <span class="material-symbols-outlined">route</span>Create Route Path
          </button>
        </div>
      </div>

      <!-- Filters Toolbar -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap" style="max-width:400px;">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="route-search" class="search-input" placeholder="Search by Route ID, source, destination..." value="${currentSearch}">
            </div>
          </div>
        </div>
      </div>

      <!-- Routes Grid -->
      <div class="routes-grid fade-in fade-in-delay-2" id="routes-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(450px, 1fr)); gap: 24px;">
        <!-- Populated dynamically -->
      </div>
    `;
  },

  mount() {
    dataSubscription = (state) => {
      this.renderGrid(state);
    };

    DataService.subscribe("routes", dataSubscription);

    const searchInput = document.getElementById("route-search");
    searchInput?.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      this.updateGrid();
    });

    document.getElementById("btn-create-route")?.addEventListener("click", () => {
      this.openRouteModal(null);
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("routes", dataSubscription);
      dataSubscription = null;
    }
  },

  updateGrid() {
    const state = {
      buses: DataService.getBuses(),
      routes: DataService.getRoutes()
    };
    this.renderGrid(state);
  },

  renderGrid(state) {
    const grid = document.getElementById("routes-grid");
    if (!grid) return;

    let routes = state.routes || [];

    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      routes = routes.filter(r => 
        (r.number || "").toLowerCase().includes(q) ||
        (r.source || "").toLowerCase().includes(q) ||
        (r.destination || "").toLowerCase().includes(q) ||
        (r.name || "").toLowerCase().includes(q)
      );
    }

    if (routes.length === 0) {
      grid.innerHTML = `<div class="text-muted" style="padding:32px; grid-column: 1 / -1; text-align:center;">No routes matched your query.</div>`;
      return;
    }

    grid.innerHTML = routes.map(route => {
      const assignedBuses = state.buses.filter(b => b.routeId === route.number);
      const assignedBadges = assignedBuses.map(b => `<span class="badge badge-primary" style="margin-right:4px;">Bus ${b.id}</span>`).join("");
      
      const stopsNames = route.stops ? route.stops.map(s => s.name).join(" &rarr; ") : "No stops configured.";
      const stopsCount = route.stops ? route.stops.length : 0;
      
      // Mock daily/peak numbers based on stops count
      const daily = 1000 + (stopsCount * 100) + Math.floor(Math.random() * 500);
      const peak = Math.min(100, 60 + stopsCount * 2 + Math.floor(Math.random() * 20));

      return `
        <div class="card route-card" style="display:flex; flex-direction:column; justify-content:space-between;">
          <div class="card-body">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
              <h3 style="display:flex; align-items:center; gap:8px; margin:0; color:var(--color-primary);">
                <span class="material-symbols-outlined">route</span>
                Route ${route.number}
              </h3>
              <div class="route-actions" style="display:flex; gap:8px;">
                <button class="btn-icon edit-route" data-id="${route.number}" title="Edit Route"><span class="material-symbols-outlined" style="font-size:18px;">edit</span></button>
                <button class="btn-icon delete-route" data-id="${route.number}" title="Delete Route" style="color:var(--color-danger);"><span class="material-symbols-outlined" style="font-size:18px;">delete</span></button>
              </div>
            </div>

            <h4 style="font-size:12px; font-weight:700; text-transform:uppercase; color:var(--color-secondary); margin-bottom:8px;">
              ${route.name || "Untitled Route"}
            </h4>
            <div style="display:flex; align-items:center; gap:8px; font-weight:600; font-size:14px; margin-bottom:16px; color:var(--color-text);">
              <span class="material-symbols-outlined" style="font-size:18px; color:var(--color-muted);">explore</span>
              ${route.source} &rarr; ${route.destination}
            </div>

            <div style="font-size:13px; color:var(--color-text); margin-bottom:24px;">
              <div style="color:var(--color-muted); margin-bottom:4px;">Transit Sequence (${stopsCount} Stops):</div>
              <div style="line-height:1.5;">${stopsNames}</div>
            </div>

            <div style="display:flex; justify-content:space-between; background:var(--color-background); padding:12px 16px; border-radius:8px; margin-bottom:16px;">
              <div>
                <div style="font-size:12px; color:var(--color-muted); margin-bottom:4px; font-weight:500;">Daily Passengers</div>
                <div style="font-size:18px; font-weight:700; color:var(--color-primary);">${daily}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:12px; color:var(--color-muted); margin-bottom:4px; font-weight:500;">Peak load</div>
                <div style="font-size:18px; font-weight:700; color:var(--color-danger);">${peak}%</div>
              </div>
            </div>
          </div>
          
          <div style="border-top:1px solid var(--color-border-subtle); padding:16px; display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:13px; font-weight:600; color:var(--color-secondary);">Assigned Fleet:</div>
            <div>${assignedBadges || '<span class="text-muted" style="font-size:13px;">None</span>'}</div>
          </div>
        </div>
      `;
    }).join("");

    // Bind actions
    grid.querySelectorAll(".edit-route").forEach(btn => {
      btn.addEventListener("click", () => this.openRouteModal(btn.getAttribute("data-id")));
    });

    grid.querySelectorAll(".delete-route").forEach(btn => {
      btn.addEventListener("click", () => this.deleteRoute(btn.getAttribute("data-id")));
    });
  },

  deleteRoute(routeId) {
    if (confirm(`Are you sure you want to delete Route ${routeId}? Buses assigned to this route will lose their path configuration.`)) {
      DataService.deleteRoute(routeId);
      ToastComponent.show("Route Deleted", "danger", `Route ${routeId} has been deleted.`);
      this.updateGrid();
    }
  },

  openRouteModal(routeId) {
    let route = { number: "", name: "", source: "", destination: "", stops: [] };
    if (routeId) {
      const existing = DataService.getRoutes().find(r => r.number === routeId);
      if (existing) {
        route = JSON.parse(JSON.stringify(existing));
      }
    }

    const isEdit = !!routeId;

    const bodyHtml = `
      <form id="form-route">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Route Number/ID</label>
            <input type="text" id="route-number" class="form-control" value="${route.number}" ${isEdit ? 'disabled' : 'required'}>
          </div>
          <div class="form-group">
            <label class="form-label">Route Name</label>
            <input type="text" id="route-name" class="form-control" value="${route.name || ''}" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Source Terminal</label>
            <input type="text" id="route-source" class="form-control" value="${route.source}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Destination Terminal</label>
            <input type="text" id="route-destination" class="form-control" value="${route.destination}" required>
          </div>
        </div>

        <div style="border-top:1px solid var(--color-border-subtle); margin-top:24px; padding-top:16px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <h4 style="margin:0; font-size:14px;">Stops Sequence</h4>
            <button type="button" class="btn btn-sm btn-secondary" id="btn-add-stop">
              <span class="material-symbols-outlined" style="font-size:16px;">add</span> Add Stop
            </button>
          </div>
          
          <div id="stops-container" style="display:flex; flex-direction:column; gap:8px; max-height:250px; overflow-y:auto; padding-right:8px;">
            <!-- Stops will be rendered here -->
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-route">Cancel</button>
      <button class="btn btn-primary" id="btn-save-route">Save Route</button>
    `;

    const modal = ModalComponent.show({
      title: isEdit ? `Edit Route ${route.number}` : "Create New Route Path",
      bodyHtml,
      footerHtml
    });

    // Handle Stops Rendering
    let currentStops = [...(route.stops || [])];

    const renderStops = () => {
      const container = document.getElementById("stops-container");
      if (!container) return;

      if (currentStops.length === 0) {
        container.innerHTML = `<div class="text-muted" style="font-size:13px; text-align:center; padding:12px;">No stops added yet.</div>`;
        return;
      }

      container.innerHTML = currentStops.map((stop, idx) => `
        <div style="display:flex; gap:8px; align-items:center; background:var(--color-background); padding:8px; border-radius:6px;">
          <div style="font-weight:700; color:var(--color-muted); width:24px; text-align:center;">${idx+1}</div>
          <input type="text" class="form-control" style="flex:2;" placeholder="Stop Name" value="${stop.name}" data-idx="${idx}" data-field="name" required>
          <input type="number" class="form-control" style="flex:1;" placeholder="Lat" value="${stop.lat || ''}" data-idx="${idx}" data-field="lat" step="any">
          <input type="number" class="form-control" style="flex:1;" placeholder="Lng" value="${stop.lng || ''}" data-idx="${idx}" data-field="lng" step="any">
          <input type="number" class="form-control" style="flex:1;" placeholder="Distance (km)" value="${stop.distance || 0}" data-idx="${idx}" data-field="distance" step="any">
          <button type="button" class="btn-icon text-danger remove-stop" data-idx="${idx}"><span class="material-symbols-outlined" style="font-size:18px;">close</span></button>
        </div>
      `).join("");

      // Bind stop inputs
      container.querySelectorAll("input").forEach(inp => {
        inp.addEventListener("change", (e) => {
          const idx = parseInt(e.target.getAttribute("data-idx"));
          const field = e.target.getAttribute("data-field");
          let val = e.target.value;
          if (field === "lat" || field === "lng" || field === "distance") val = parseFloat(val) || 0;
          currentStops[idx][field] = val;
        });
      });

      // Bind removes
      container.querySelectorAll(".remove-stop").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const idx = parseInt(e.currentTarget.getAttribute("data-idx"));
          currentStops.splice(idx, 1);
          renderStops();
        });
      });
    };

    renderStops();

    document.getElementById("btn-add-stop")?.addEventListener("click", () => {
      currentStops.push({ name: "", lat: 13.0, lng: 80.2, distance: 0, fareToNextStop: 10 });
      renderStops();
      // Scroll to bottom
      const container = document.getElementById("stops-container");
      container.scrollTop = container.scrollHeight;
    });

    document.getElementById("btn-cancel-route")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-route")?.addEventListener("click", () => {
      const form = document.getElementById("form-route");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const newRouteData = {
        number: document.getElementById("route-number").value,
        name: document.getElementById("route-name").value,
        source: document.getElementById("route-source").value,
        destination: document.getElementById("route-destination").value,
        stops: currentStops
      };

      if (isEdit) {
        DataService.updateRoute(routeId, newRouteData);
        ToastComponent.show("Route Updated", "success", `Route ${routeId} saved.`);
      } else {
        // Validate unique
        const existing = DataService.getRoutes().find(r => r.number === newRouteData.number);
        if (existing) {
          alert(`Route number ${newRouteData.number} already exists!`);
          return;
        }
        DataService.addRoute(newRouteData);
        ToastComponent.show("Route Created", "success", `Route ${newRouteData.number} created.`);
      }

      modal.close();
      this.updateGrid();
    });
  }
};
