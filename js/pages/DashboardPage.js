// DashboardPage.js - Command Center Dashboard Overview
import { DataService } from '../services/DataService';
import { LiveTracking } from '../components/LiveTracking';
import { RouteCard } from '../components/RouteCard';
import { StatusBadge } from '../components/StatusBadge';

let dataSubscription = null;
let chartInstance = null;

export const DashboardPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Command Center Overview</h1>
            <p class="page-subtitle">Real-time IoT transit telemetry and system status.</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-secondary" id="btn-refresh-dashboard">
              <span class="material-symbols-outlined">refresh</span>Refresh
            </button>
            <a href="#/operations" class="btn btn-primary">
              <span class="material-symbols-outlined">radar</span>Launch Live Ops
            </a>
          </div>
        </div>
      </div>

      <!-- Overview Statistics Grid -->
      <div class="stats-grid fade-in fade-in-delay-1" id="stats-container">
        <!-- populated dynamically -->
      </div>

      <!-- Main Columns Grid -->
      <div class="analytics-grid fade-in fade-in-delay-2">
        
        <!-- Live Fleet Map Card -->
        <div class="card flex flex-col" style="min-height: 400px;">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">map</span>Live Fleet Map Trace
            </div>
            <div class="badge badge-success">
              <span class="status-dot pulse-green" style="margin-right:4px;"></span>Live Tracking
            </div>
          </div>
          <div class="card-body-flush" style="position:relative; flex: 1; min-height: 340px;">
            <!-- Live Leaflet tracking component -->
            <div id="dashboard-map" style="width: 100%; height: 100%; min-height: 340px; z-index: 1;"></div>
          </div>
        </div>

        <!-- Recent Activities Feed -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">list_alt</span>Recent Activity
            </div>
            <a href="#/settings" class="btn-icon" title="Configure Logs"><span class="material-symbols-outlined">settings</span></a>
          </div>
          <div class="card-body" id="activity-feed-container" style="max-height: 340px; overflow-y: auto;">
            <!-- populated dynamically -->
          </div>
        </div>
      </div>

      <!-- Highlighted Fleet Cards (Reused Customer Bus Cards) -->
      <div class="card mb-4 fade-in fade-in-delay-3">
        <div class="card-header">
          <div class="card-title"><span class="material-symbols-outlined">directions_bus</span>Live Fleet Occupancy Overview</div>
          <a href="#/buses" class="btn btn-secondary btn-sm">Configure Vehicles</a>
        </div>
        <div class="card-body">
          <div class="grid-3" id="live-fleet-cards-container">
            <!-- Rendered exactly like Customer Homepage cards -->
          </div>
        </div>
      </div>

      <!-- Bottom Charts Row -->
      <div class="grid-2 fade-in fade-in-delay-4">
        <!-- Passenger Load Chart -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">analytics</span>Passenger Load Curve (Today)
            </div>
            <div class="card-actions">
              <span class="badge badge-primary">Hourly Aggregate</span>
            </div>
          </div>
          <div class="card-body">
            <div class="chart-wrap">
              <canvas id="passenger-load-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Device Status breakdown -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">
              <span class="material-symbols-outlined">memory</span>IoT Device Nodes
            </div>
            <a href="#/devices" class="btn btn-secondary btn-sm">Manage Hardware</a>
          </div>
          <div class="card-body">
            <div class="grid-2" style="align-items: center;">
              <div class="chart-wrap-sm">
                <canvas id="device-donut-chart"></canvas>
              </div>
              <div class="flex flex-col gap-3" id="device-summary-list">
                <!-- Dynamic device summary list -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    // 1. Initialize Reused LiveTracking Map
    LiveTracking.init("dashboard-map", [13.0064, 80.2577], 11);
    LiveTracking.drawRoutes(DataService.getRoutes());

    // Refresh action
    document.getElementById("btn-refresh-dashboard")?.addEventListener("click", () => {
      DataService.init(); // Reset or re-simulate
      this.updateUI();
    });

    // Subscribe to DataService for live updates
    dataSubscription = (state) => {
      this.renderStats(state);
      this.renderActivities(state);
      this.renderDeviceBreakdown(state);
      this.updateLoadChart(state);
      
      // Update Live Map Tracking Markers
      LiveTracking.updateMarkers(state.tracking, state.occupancy);

      // Render Reused Route Cards
      this.renderFleetCards(state);
    };

    DataService.subscribe("dashboard", dataSubscription);
    this.initLoadChart();
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("dashboard", dataSubscription);
      dataSubscription = null;
    }
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
    // Clean Leaflet instances
    LiveTracking.destroy();
  },

  updateUI() {
    const state = {
      buses: DataService.getBuses(),
      routes: DataService.getRoutes(),
      devices: DataService.getDevices(),
      alerts: DataService.getAlerts(),
      tracking: DataService.getLiveState().tracking,
      occupancy: DataService.getLiveState().occupancy
    };
    dataSubscription(state);
  },

  renderFleetCards(state) {
    const container = document.getElementById("live-fleet-cards-container");
    if (!container) return;

    // Pick top 3 active buses to display as cards (like customer portal)
    const activeBuses = state.buses.filter(b => b.status === "Active").slice(0, 3);
    if (activeBuses.length === 0) {
      container.innerHTML = `<div class="text-muted text-sm">No active buses to display.</div>`;
      return;
    }

    container.innerHTML = activeBuses.map(bus => {
      const tracking = state.tracking[bus.id];
      const occupancy = state.occupancy[bus.id];
      return RouteCard.render(bus, tracking, occupancy);
    }).join("");

    // Add navigation action on click
    container.querySelectorAll('[data-bus-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-bus-id');
        window.location.hash = `#/operations?id=${id}`;
      });
    });
  },

  renderStats(state) {
    const container = document.getElementById("stats-container");
    if (!container) return;

    const totalBuses = state.buses.length;
    const activeBuses = state.buses.filter(b => b.status === "Active").length;
    const totalRoutes = state.routes.length;
    const onlineDevices = state.devices.filter(d => d.status === "Online").length;
    
    let currentPassengers = 0;
    let totalOccupancyPercentage = 0;
    let occupiedBusesCount = 0;

    Object.keys(state.occupancy).forEach(busId => {
      const occ = state.occupancy[busId];
      const bus = state.buses.find(b => b.id === busId);
      if (bus && bus.status === "Active") {
        currentPassengers += occ.passengers;
        totalOccupancyPercentage += occ.percentage;
        occupiedBusesCount++;
      }
    });

    const avgOccupancy = occupiedBusesCount > 0 ? Math.round(totalOccupancyPercentage / occupiedBusesCount) : 0;
    const alertsToday = state.alerts.length;

    container.innerHTML = `
      <div class="stat-card accent-primary">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">directions_bus</span></div>
        <div class="stat-label">Active Buses</div>
        <div class="stat-value">${activeBuses}/${totalBuses}</div>
        <div class="stat-trend up">
          <span class="material-symbols-outlined text-sm">check_circle</span>
          <span>${Math.round((activeBuses / totalBuses) * 100)}% Fleet Active</span>
        </div>
      </div>

      <div class="stat-card accent-secondary">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">route</span></div>
        <div class="stat-label">Active Routes</div>
        <div class="stat-value">${totalRoutes}</div>
        <div class="stat-trend neutral">
          <span class="material-symbols-outlined text-sm">hub</span>
          <span>Inter-city Grid</span>
        </div>
      </div>

      <div class="stat-card accent-success">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">memory</span></div>
        <div class="stat-label">Online Devices</div>
        <div class="stat-value">${onlineDevices}/${state.devices.length}</div>
        <div class="stat-trend up">
          <span class="material-symbols-outlined text-sm">wifi</span>
          <span>${Math.round((onlineDevices / state.devices.length) * 100)}% Online</span>
        </div>
      </div>

      <div class="stat-card accent-primary">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">groups</span></div>
        <div class="stat-label">Current Passengers</div>
        <div class="stat-value">${currentPassengers}</div>
        <div class="stat-trend up">
          <span class="material-symbols-outlined text-sm">trending_up</span>
          <span>Live Boarding</span>
        </div>
      </div>

      <div class="stat-card accent-warning">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">analytics</span></div>
        <div class="stat-label">Average Occupancy</div>
        <div class="stat-value">${avgOccupancy}%</div>
        <div class="stat-trend ${avgOccupancy > 75 ? "down" : "up"}">
          <span class="material-symbols-outlined text-sm">${avgOccupancy > 75 ? "warning" : "check_circle"}</span>
          <span>${avgOccupancy > 75 ? "Overloaded" : "Optimal"} Load</span>
        </div>
      </div>

      <div class="stat-card accent-danger">
        <div class="stat-icon-inner"><span class="material-symbols-outlined">notifications_active</span></div>
        <div class="stat-label">Alerts Today</div>
        <div class="stat-value">${alertsToday}</div>
        <div class="stat-trend down">
          <span class="material-symbols-outlined text-sm">error</span>
          <span>Unresolved Alerts</span>
        </div>
      </div>
    `;
  },

  renderActivities(state) {
    const container = document.getElementById("activity-feed-container");
    if (!container) return;

    const activities = DataService.getActivities();
    if (activities.length === 0) {
      container.innerHTML = `
        <div class="text-muted text-sm" style="padding:20px; text-align:center">No recent activities log.</div>
      `;
      return;
    }

    container.innerHTML = activities.map(act => {
      let icon = "info";
      let colorClass = "bg-primary-subtle text-primary-color";
      if (act.title.includes("Created") || act.title.includes("Added")) {
        icon = "add_box";
        colorClass = "badge-success";
      } else if (act.title.includes("Deleted") || act.title.includes("Removed")) {
        icon = "delete_sweep";
        colorClass = "badge-danger";
      } else if (act.title.includes("Modified") || act.title.includes("Updated")) {
        icon = "edit";
        colorClass = "badge-warning";
      }

      return `
        <div class="activity-item">
          <div class="activity-icon ${colorClass}">
            <span class="material-symbols-outlined">${icon}</span>
          </div>
          <div class="activity-text">
            <div class="activity-main">${act.title}</div>
            <div class="activity-sub">${act.desc}</div>
          </div>
          <div class="activity-time">${act.time}</div>
        </div>
      `;
    }).join("");
  },

  renderDeviceBreakdown(state) {
    const listContainer = document.getElementById("device-summary-list");
    if (!listContainer) return;

    const devices = state.devices;
    const online = devices.filter(d => d.status === "Online").length;
    const offline = devices.filter(d => d.status === "Offline").length;
    const maintenance = devices.filter(d => d.status === "Maintenance").length;
    const fault = devices.filter(d => d.status === "Fault").length;

    listContainer.innerHTML = `
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#22c55e;"></span>Online Nodes
        </span>
        <span class="font-bold">${online}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#737686;"></span>Offline Nodes
        </span>
        <span class="font-bold">${offline}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#f59e0b;"></span>Maintenance
        </span>
        <span class="font-bold">${maintenance}</span>
      </div>
      <div class="flex items-center justify-between text-sm">
        <span class="flex items-center gap-2 font-semibold">
          <span class="legend-dot" style="background:#ef4444;"></span>Fault Detected
        </span>
        <span class="font-bold">${fault}</span>
      </div>
    `;

    const canvas = document.getElementById("device-donut-chart");
    if (!canvas) return;

    if (window.deviceDonutChartInstance) {
      window.deviceDonutChartInstance.destroy();
    }

    window.deviceDonutChartInstance = new Chart(canvas, {
      type: "doughnut",
      data: {
        labels: ["Online", "Offline", "Maintenance", "Fault"],
        datasets: [{
          data: [online, offline, maintenance, fault],
          backgroundColor: ["#22c55e", "#737686", "#f59e0b", "#ef4444"],
          borderWidth: 2,
          borderColor: "#ffffff"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        cutout: "70%"
      }
    });
  },

  initLoadChart() {
    const canvas = document.getElementById("passenger-load-chart");
    if (!canvas) return;

    chartInstance = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["06:00 AM", "08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM"],
        datasets: [{
          label: "Current Passengers",
          data: [120, 480, 560, 310, 290, 450, 680, 520, 210],
          borderColor: "#0057B8",
          backgroundColor: "rgba(0, 87, 184, 0.08)",
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#0057B8"
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: "rgba(0,0,0,0.05)" } }
        }
      }
    });
  },

  updateLoadChart(state) {
    if (!chartInstance) return;
    
    let activePassengers = 0;
    Object.keys(state.occupancy).forEach(busId => {
      const occ = state.occupancy[busId];
      const bus = state.buses.find(b => b.id === busId);
      if (bus && bus.status === "Active") {
        activePassengers += occ.passengers;
      }
    });

    const data = chartInstance.data.datasets[0].data;
    data[6] = activePassengers;
    data[7] = Math.round(activePassengers * 0.85);
    chartInstance.update();
  }
};
