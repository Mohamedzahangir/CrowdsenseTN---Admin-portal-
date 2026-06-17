// OperationsPage.js - Transit Operations Center
import { DataService } from '../services/DataService';
import { ModalComponent } from '../components/ModalComponent';
import { ToastComponent } from '../components/ToastComponent';
import { LiveTracking } from '../components/LiveTracking';
import { OccupancyCard } from '../components/OccupancyCard';
import { BusStatusIndicator } from '../components/BusStatusIndicator';
import { ETAComponent } from '../components/ETAComponent';
import { StatusBadge } from '../components/StatusBadge';

let dataSubscription = null;
let selectedBusId = null;

export const OperationsPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Transit Operations Center</h1>
            <p class="page-subtitle">Chennai & Vellore transit grid live monitoring portal.</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="badge badge-success pulse-live">LIVE FEED</span>
            <span id="ops-sync-time" class="text-sm text-muted">Synced: Just now</span>
          </div>
        </div>
      </div>

      <!-- Split Operations layout -->
      <div class="ops-grid fade-in fade-in-delay-1">
        
        <!-- Left Side: Live Buses List -->
        <div class="flex flex-col gap-3" style="max-height: calc(100vh - 180px); overflow-y: auto;">
          <div class="card">
            <div class="card-header" style="padding: 10px 14px;">
              <div class="card-title text-sm">Active Telemetry</div>
              <span class="badge badge-primary" id="active-buses-count">0 Active</span>
            </div>
            <div class="card-body-flush" id="ops-bus-list" style="padding: 10px; display: flex; flex-direction: column; gap: 10px;">
              <!-- Dynamically populated live bus cards -->
            </div>
          </div>

          <!-- Live Incident Feed -->
          <div class="card">
            <div class="card-header" style="padding: 10px 14px;">
              <div class="card-title text-sm" style="color:var(--color-danger)">
                <span class="material-symbols-outlined text-danger">notifications_active</span>Critical Incident Log
              </div>
            </div>
            <div class="card-body-flush" id="ops-critical-alerts" style="max-height: 240px; overflow-y: auto;">
              <!-- Dynamic incidents lists -->
            </div>
          </div>
        </div>

        <!-- Right Side: Live Tracking Map & Selected Detail Sheet -->
        <div class="flex flex-col gap-4">
          <!-- The Leaflet map -->
          <div class="card" style="flex: 1; min-height: 440px; position: relative;">
            <div id="ops-map" style="width: 100%; height: 100%; min-height: 440px; z-index: 1;"></div>
          </div>

          <!-- Bottom Panel: Selected Bus telemetry breakdown -->
          <div class="card hidden" id="selected-telemetry-panel">
            <div class="card-header">
              <div class="card-title" id="telemetry-panel-title">
                <span class="material-symbols-outlined">radar</span>Bus Telemetry Details
              </div>
              <button class="btn-icon" id="close-telemetry-panel"><span class="material-symbols-outlined">close</span></button>
            </div>
            <div class="card-body" id="telemetry-panel-body">
              <!-- populated dynamically -->
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    const hash = window.location.hash;
    const urlParams = new URLSearchParams(hash.split('?')[1]);
    if (urlParams.has('id')) {
      selectedBusId = urlParams.get('id');
    }

    // 1. Initialize Reused LiveTracking Map
    LiveTracking.init("ops-map", [13.0064, 80.2577], 12);
    LiveTracking.drawRoutes(DataService.getRoutes());

    // Subscribe to DataService for live updates
    dataSubscription = (state) => {
      this.updateBusList(state);
      this.updateAlertsFeed(state);
      this.updateTelemetryPanel(state);
      
      // Update markers on Leaflet
      LiveTracking.updateMarkers(state.tracking, state.occupancy);

      const timeEl = document.getElementById("ops-sync-time");
      if (timeEl) {
        timeEl.textContent = `Synced: ${new Date().toLocaleTimeString()}`;
      }
    };

    DataService.subscribe("operations", dataSubscription);

    document.getElementById("close-telemetry-panel")?.addEventListener("click", () => {
      document.getElementById("selected-telemetry-panel")?.classList.add("hidden");
      selectedBusId = null;
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("operations", dataSubscription);
      dataSubscription = null;
    }
    // Clean Leaflet maps
    LiveTracking.destroy();
    selectedBusId = null;
  },

  updateBusList(state) {
    const listContainer = document.getElementById("ops-bus-list");
    if (!listContainer) return;

    const activeBuses = state.buses.filter(b => b.status === "Active");
    const activeCountEl = document.getElementById("active-buses-count");
    if (activeCountEl) {
      activeCountEl.textContent = `${activeBuses.length} Active`;
    }

    if (activeBuses.length === 0) {
      listContainer.innerHTML = `<div class="text-muted text-sm" style="text-align:center; padding: 20px;">No active transit vehicles.</div>`;
      return;
    }

    listContainer.innerHTML = activeBuses.map(bus => {
      const tracking = state.tracking[bus.id];
      const occupancy = state.occupancy[bus.id];
      if (!tracking || !occupancy) return "";

      const isSelected = bus.id === selectedBusId ? "border-color:var(--color-primary); background:rgba(0, 87, 184, 0.04)" : "";

      return `
        <div class="bus-live-card" style="box-shadow:none; ${isSelected}" data-ops-bus-id="${bus.id}">
          <div class="bus-live-header" style="padding:10px 12px; display:flex; align-items:center; justify-content:space-between;">
            <div class="flex items-center gap-2" style="display:flex; align-items:center; gap:8px;">
              <div class="bus-route-badge" style="width:34px; height:34px; border-radius:6px; box-shadow:none; display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <span class="bus-route-num" style="font-size:11px; font-weight:700; color:white;">${bus.id}</span>
                <span class="bus-route-type" style="font-size:5px;">${bus.type}</span>
              </div>
              <div class="bus-live-info" style="padding:0; display:flex; flex-direction:column;">
                <div class="bus-live-name" style="font-size:12px; font-weight:600;">${bus.name}</div>
                <div class="bus-live-reg" style="font-size:9px; color:var(--color-text-muted);">${bus.number}</div>
              </div>
            </div>
            <div>
              ${StatusBadge.render(occupancy.percentage)}
            </div>
          </div>
          <div class="bus-live-body" style="padding:8px 12px; font-size:11px;">
            <div class="flex items-center justify-between mb-2" style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <span class="text-muted">Currently at:</span>
              <span class="font-semibold truncate" style="max-width:140px; font-weight:600;">${tracking.currentStop}</span>
            </div>
            <div class="flex items-center justify-between" style="display:flex; justify-content:space-between;">
              <span class="text-muted">ETA next stop:</span>
              <span class="font-semibold text-primary-color" style="font-weight:600; color:var(--color-primary);">${tracking.eta} mins</span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    // Bind card clicks
    listContainer.querySelectorAll("[data-ops-bus-id]").forEach(card => {
      card.addEventListener("click", () => {
        const busId = card.getAttribute("data-ops-bus-id");
        this.selectBus(busId, state);
      });
    });
  },

  selectBus(busId, state) {
    selectedBusId = busId;
    this.updateTelemetryPanel(state);
    
    // Zoom/focus map
    const tracking = state.tracking[busId];
    if (tracking && LiveTracking.mapInstance) {
      LiveTracking.mapInstance.setView([tracking.lat, tracking.lng], 14, { animate: true });
      if (LiveTracking.busMarkers[busId]) {
        LiveTracking.busMarkers[busId].openPopup();
      }
    }

    // Update list card visual selection state
    this.updateBusList(state);
  },

  updateAlertsFeed(state) {
    const alertsContainer = document.getElementById("ops-critical-alerts");
    if (!alertsContainer) return;

    const activeAlerts = state.alerts.filter(a => a.status === "Unread" && (a.priority === "Critical" || a.priority === "High"));
    
    if (activeAlerts.length === 0) {
      alertsContainer.innerHTML = `<div class="text-muted text-sm" style="text-align:center; padding:15px;">No active incidents recorded.</div>`;
      return;
    }

    alertsContainer.innerHTML = activeAlerts.slice(0, 4).map(alert => {
      const priorityClass = alert.priority === "Critical" ? "critical" : "high";
      return `
        <div class="alert-item" style="padding:10px 14px; border-bottom:1px solid rgba(195,198,215,0.2)" data-ops-alert-id="${alert.id}">
          <div class="alert-icon-wrap ${priorityClass}" style="width:28px; height:28px;">
            <span class="material-symbols-outlined" style="font-size:16px;">warning</span>
          </div>
          <div class="alert-content">
            <div class="alert-title" style="font-size:11px; font-weight:700;">${alert.title}</div>
            <div class="alert-desc" style="font-size:10px; max-height: 28px; overflow:hidden;">${alert.desc}</div>
          </div>
          <div class="alert-meta" style="font-size:9px;">
            <div>${alert.time}</div>
            <a href="javascript:void(0)" class="mark-read-ops" data-alert-id="${alert.id}" style="color:var(--color-primary); font-weight:600;">Acknowledge</a>
          </div>
        </div>
      `;
    }).join("");

    alertsContainer.querySelectorAll(".mark-read-ops").forEach(link => {
      link.addEventListener("click", (e) => {
        e.stopPropagation();
        const alertId = link.getAttribute("data-alert-id");
        DataService.markAlertAsRead(alertId);
        ToastComponent.show("Incident Acknowledged", "success", "Alert marked as read");
      });
    });

    alertsContainer.querySelectorAll(".alert-item").forEach(item => {
      item.addEventListener("click", () => {
        const alertId = item.getAttribute("data-ops-alert-id");
        const alert = state.alerts.find(a => a.id === alertId);
        if (alert && alert.busId) {
          this.selectBus(alert.busId, state);
        }
      });
    });
  },

  updateTelemetryPanel(state) {
    const panel = document.getElementById("selected-telemetry-panel");
    const panelBody = document.getElementById("telemetry-panel-body");
    const panelTitle = document.getElementById("telemetry-panel-title");
    
    if (!panel || !panelBody) return;

    if (!selectedBusId) {
      panel.classList.add("hidden");
      return;
    }

    const bus = state.buses.find(b => b.id === selectedBusId);
    const tracking = state.tracking[selectedBusId];
    const occupancy = state.occupancy[selectedBusId];
    const route = state.routes.find(r => r.number === selectedBusId);
    const device = state.devices.find(d => d.busId === selectedBusId);

    if (!bus || !tracking || !occupancy) {
      panel.classList.add("hidden");
      return;
    }

    panel.classList.remove("hidden");
    
    if (panelTitle) {
      panelTitle.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined text-primary">radar</span>
          <span>Live Operations Feed: Bus ${bus.id} - ${bus.name}</span>
          ${BusStatusIndicator.renderLiveBadge()}
        </div>
      `;
    }

    // Build Stops timeline exactly like the Customer Portal bus-details timeline
    let stopsHtml = "";
    if (route && route.stops) {
      const lastIdx = tracking.lastStopIndex;
      const nextIdx = tracking.nextStopIndex;

      stopsHtml = route.stops.map((stop, index) => {
        let nodeClass = "relative pl-10 pb-8 railway-line";
        let nodeDot = "";
        let contentClass = "flex justify-between items-start";
        let stopLabel = "";
        let estTimeLabel = "";

        if (index === 0) {
          stopLabel = "Source";
        } else if (index === route.stops.length - 1) {
          stopLabel = "Destination";
          nodeClass = "relative pl-10 pb-8";
        }

        // Passed stop
        if (index <= lastIdx) {
          nodeClass += " railway-line-solid";
          nodeDot = `
            <div class="absolute left-0 top-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center z-10 border-4 border-background" style="width:20px; height:20px; border-radius:50%; background:var(--color-primary); display:flex; align-items:center; justify-content:center; left:-10px; border:2px solid white;">
              <span class="material-symbols-outlined text-white text-[12px]" style="font-size:12px; color:white;">check</span>
            </div>
          `;
          contentClass += " opacity-70";
          estTimeLabel = `<span class="text-body-sm text-on-surface-variant font-semibold" style="font-size:11px; color:var(--color-text-muted);">Passed</span>`;
          if (index > 0 && index < route.stops.length - 1) {
            stopLabel = "Departed";
          }
        } 
        // Arriving stop
        else if (index === nextIdx) {
          nodeDot = `
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-highest border-2 border-primary rounded-full flex items-center justify-center z-10" style="width:20px; height:20px; border-radius:50%; background:var(--color-surface-container-high); border: 2px solid var(--color-primary); display:flex; align-items:center; justify-content:center; left:-10px;">
              <div style="width: 8px; height: 8px; background: var(--color-primary); border-radius: 50%;" class="pulse-live"></div>
            </div>
          `;
          nodeClass += " bg-primary/5 p-2.5 md:p-3 rounded-xl border border-primary/20 -mt-1 ml-6 pl-3 pb-3";
          nodeClass = nodeClass.replace("pl-10", "");
          
          stopLabel = stopLabel ? `${stopLabel} • Arriving` : `Arriving in ${tracking.eta} mins`;
          contentClass += " text-primary font-medium";
          estTimeLabel = `<span class="text-body-sm text-primary font-bold" style="font-size:11px; font-weight:700; color:var(--color-primary);">Arriving</span>`;
        } 
        // Upcoming stop
        else {
          nodeDot = `
            <div class="absolute left-0 top-1 w-6 h-6 bg-surface-container-high border-2 border-outline-variant rounded-full z-10" style="width:20px; height:20px; border-radius:50%; background:var(--color-surface-container); border:2px solid var(--color-border); left:-10px;"></div>
          `;
          contentClass += " opacity-50";
          stopLabel = stopLabel || `Distance: ${Math.round((stop.distance - (tracking.progress/100)*route.stops[route.stops.length-1].distance)*10)/10} km`;
          estTimeLabel = `<span class="text-body-sm text-on-surface" style="font-size:11px;">${stop.scheduledTime}</span>`;
        }

        const timeCrossOut = index <= lastIdx ? `line-through` : '';

        return `
          <div class="${nodeClass}" style="position:relative; margin-left: 20px; padding-bottom: 24px; padding-left: 20px;">
            ${nodeDot}
            <div class="${contentClass}" style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <h3 class="text-base text-on-surface font-semibold" style="font-size:13px; font-weight:600; margin:0;">${stop.name}</h3>
                <p class="text-body-sm text-on-surface-variant" style="font-size:11px; color:var(--color-text-secondary); margin:2px 0 0 0;">${stopLabel}</p>
              </div>
              <div class="text-right" style="text-align:right;">
                <span class="block font-label-caps text-label-caps text-on-secondary-container ${timeCrossOut}" style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase; font-weight:600; display:block;">${stop.scheduledTime}</span>
                ${estTimeLabel}
              </div>
            </div>
          </div>
          
          ${index === lastIdx && lastIdx !== route.stops.length - 1 ? `
            <div class="relative pl-10 h-0 z-20" style="position:relative; height:0; z-index:20; margin-left:20px;">
              <div class="absolute -left-3 -top-3 flex items-center justify-center bg-white rounded-full p-1 shadow-md border-2 border-primary" style="position:absolute; left:-12px; top:-12px; background:white; border-radius:50%; padding:4px; border:2px solid var(--color-primary); display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm);">
                <span class="material-symbols-outlined text-primary text-[16px] pulse-live" style="font-size:16px; color:var(--color-primary);" class="pulse-live">directions_bus</span>
              </div>
            </div>
          ` : ''}
        `;
      }).join('');
    }

    // Diagnostics device state
    let deviceHtml = "";
    if (device) {
      let statusClass = "device-online";
      if (device.status === "Offline") statusClass = "device-offline";
      else if (device.status === "Maintenance") statusClass = "device-maintenance";
      else if (device.status === "Fault") statusClass = "device-fault";

      deviceHtml = `
        <div style="font-size:12px;">
          <div style="margin-bottom:6px;"><b>ID:</b> <code style="background:#f1f5f9; padding:2px 4px; border-radius:3px">${device.id}</code></div>
          <div style="margin-bottom:6px;"><b>Status:</b> <span class="badge ${device.status === "Online" ? "badge-success" : "badge-danger"}">${device.status}</span></div>
          <div style="margin-bottom:6px;"><b>Signal:</b> ${device.rssi}</div>
          <div style="margin-bottom:6px;"><b>FW Version:</b> ${device.fwVersion}</div>
          <div style="margin-bottom:6px;"><b>Heap Remaining:</b> ${device.heap}</div>
          <div><b>Core Temp:</b> ${device.temperature}</div>
        </div>
      `;
    } else {
      deviceHtml = `<div class="text-muted text-sm">No IoT transmitter linked to this vehicle.</div>`;
    }

    panelBody.innerHTML = `
      <div class="telemetry-grid">
        
        <!-- Reused Occupancy Cards & Speed indicators -->
        <div>
          <h4 class="font-bold text-sm mb-3" style="text-transform:uppercase; color:var(--color-text-muted); font-size:11px; font-weight:700; margin-bottom:12px;">Live Occupancy & Speed</h4>
          ${OccupancyCard.render(bus, occupancy)}
          
          <div style="display:flex; justify-content:space-between; margin-top:16px; border-top:1px solid var(--color-border-subtle); padding-top:12px;">
            ${BusStatusIndicator.renderSpeed(tracking.speed)}
            ${BusStatusIndicator.renderLastStop(tracking.currentStop)}
          </div>
        </div>

        <!-- Stop timelines progression -->
        <div>
          <h4 class="font-bold text-sm mb-3" style="text-transform:uppercase; color:var(--color-text-muted); font-size:11px; font-weight:700; margin-bottom:12px;">Route Stop Progression</h4>
          <div class="route-timeline" style="max-height:220px; overflow-y:auto; padding-top:4px;">
            ${stopsHtml || '<div class="text-muted text-sm">No active path timeline.</div>'}
          </div>
        </div>

        <!-- IoT Node diagnostics info -->
        <div style="border-left: 1px solid var(--color-border-subtle); padding-left:16px;">
          <h4 class="font-bold text-sm mb-3" style="text-transform:uppercase; color:var(--color-text-muted); font-size:11px; font-weight:700; margin-bottom:12px;">ESP32 Node Status</h4>
          ${deviceHtml}
        </div>
      </div>
    `;
  }
};
