// AnalyticsPage.js - Fleet Analytics & Reports Module
import { DataService } from '../services/DataService';
import { ToastComponent } from '../components/ToastComponent';

let charts = [];

export const AnalyticsPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Fleet Analytics & Intelligence</h1>
            <p class="page-subtitle">Historical occupancy curves, route load performance, and demand forecasting.</p>
          </div>
          <div class="flex items-center gap-2">
            <!-- Date range picker -->
            <input type="date" id="date-from" class="filter-select" value="2026-06-01" style="padding: 6px 10px;">
            <span class="text-muted text-sm">to</span>
            <input type="date" id="date-to" class="filter-select" value="2026-06-17" style="padding: 6px 10px;">
            
            <button class="btn btn-secondary btn-sm" id="btn-export-csv">
              <span class="material-symbols-outlined">description</span>Export CSV
            </button>
            <button class="btn btn-primary btn-sm" id="btn-export-pdf">
              <span class="material-symbols-outlined">picture_as_pdf</span>Export PDF Report
            </button>
          </div>
        </div>
      </div>

      <!-- Stat breakdown row -->
      <div class="stats-grid fade-in fade-in-delay-1">
        <div class="stat-card accent-primary" style="padding:16px;">
          <div class="stat-label" style="font-size:10px">Total Passenger Trips (This Month)</div>
          <div class="stat-value" style="font-size:24px">54,230</div>
          <div class="stat-trend up" style="font-size:11px"><span class="material-symbols-outlined text-sm">trending_up</span>+12% vs May</div>
        </div>
        <div class="stat-card accent-success" style="padding:16px;">
          <div class="stat-label" style="font-size:10px">Fleet Capacity Utilization</div>
          <div class="stat-value" style="font-size:24px">64.5%</div>
          <div class="stat-trend up" style="font-size:11px"><span class="material-symbols-outlined text-sm">check_circle</span>Optimal Range</div>
        </div>
        <div class="stat-card accent-warning" style="padding:16px;">
          <div class="stat-label" style="font-size:10px">Peak Hours Congestion Rate</div>
          <div class="stat-value" style="font-size:24px">88.2%</div>
          <div class="stat-trend down" style="font-size:11px"><span class="material-symbols-outlined text-sm">warning</span>Critical loads detected</div>
        </div>
      </div>

      <!-- Charts grid columns -->
      <div class="analytics-grid fade-in fade-in-delay-2">
        <!-- Route Utilization performance bar -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">bar_chart</span>Daily Passenger Volume by Route</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap-lg">
              <canvas id="route-perf-chart"></canvas>
            </div>
          </div>
        </div>

        <!-- Hourly Peak Analysis line -->
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">timeline</span>Peak Demand hours (24h clock)</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap-lg">
              <canvas id="peak-hours-chart"></canvas>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom charts: Device health distribution & Load categories -->
      <div class="grid-2 fade-in fade-in-delay-3">
        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">pie_chart</span>Commuter Density categories</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap">
              <canvas id="density-pie-chart"></canvas>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="card-title"><span class="material-symbols-outlined">stacked_bar_chart</span>Monthly Commuter Growth</div>
          </div>
          <div class="card-body">
            <div class="chart-wrap">
              <canvas id="monthly-commuter-chart"></canvas>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    this.initCharts();

    // Export binds
    document.getElementById("btn-export-csv")?.addEventListener("click", () => {
      this.triggerMockExport("CSV");
    });

    document.getElementById("btn-export-pdf")?.addEventListener("click", () => {
      this.triggerMockExport("PDF");
    });
  },

  unmount() {
    charts.forEach(c => c.destroy());
    charts = [];
  },

  initCharts() {
    // 1. Route Performance Chart (Bar)
    const ctx1 = document.getElementById("route-perf-chart")?.getContext("2d");
    if (ctx1) {
      const chart1 = new Chart(ctx1, {
        type: "bar",
        data: {
          labels: ["Route 19B", "Route M70", "Route 47A", "Route 23C", "Route 102"],
          datasets: [{
            label: "Average Daily Commuters",
            data: [2400, 3100, 1250, 1800, 1500],
            backgroundColor: ["#0057B8", "#00A8E8", "#22C55E", "#F59E0B", "#737686"],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(0,0,0,0.05)" } }
          }
        }
      });
      charts.push(chart1);
    }

    // 2. Peak Hours Chart (Line)
    const ctx2 = document.getElementById("peak-hours-chart")?.getContext("2d");
    if (ctx2) {
      const chart2 = new Chart(ctx2, {
        type: "line",
        data: {
          labels: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
          datasets: [{
            label: "Load utilization (%)",
            data: [42, 91, 75, 48, 40, 62, 94, 70, 35],
            borderColor: "#EF4444",
            backgroundColor: "rgba(239, 68, 68, 0.05)",
            borderWidth: 3,
            fill: true,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: "#EF4444"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(0,0,0,0.05)" }, min: 0, max: 100 }
          }
        }
      });
      charts.push(chart2);
    }

    // 3. Commuter Density Pie Chart
    const ctx3 = document.getElementById("density-pie-chart")?.getContext("2d");
    if (ctx3) {
      const chart3 = new Chart(ctx3, {
        type: "pie",
        data: {
          labels: ["Low Crowd (<40%)", "Medium Crowd (40-75%)", "High Crowd (>75%)"],
          datasets: [{
            data: [45, 35, 20],
            backgroundColor: ["#22C55E", "#F59E0B", "#EF4444"]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "right", labels: { boxWidth: 15, font: { family: "Inter" } } }
          }
        }
      });
      charts.push(chart3);
    }

    // 4. Monthly Commuter Growth Stacked Bar Chart
    const ctx4 = document.getElementById("monthly-commuter-chart")?.getContext("2d");
    if (ctx4) {
      const chart4 = new Chart(ctx4, {
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
            label: "Total Commuters",
            data: [34000, 38000, 42000, 47000, 50000, 54230],
            backgroundColor: "#0057B8",
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(0,0,0,0.05)" } }
          }
        }
      });
      charts.push(chart4);
    }
  },

  triggerMockExport(format) {
    const from = document.getElementById("date-from")?.value;
    const to = document.getElementById("date-to")?.value;

    ToastComponent.show(`Generating ${format} file...`, "info", `Compiling data logs: ${from} to ${to}`);

    setTimeout(() => {
      // Mock triggers browser file download
      const element = document.createElement('a');
      const fileData = `CrowdSense TN Transit Analytics Summary\nGenerated: ${new Date().toLocaleString()}\nDate Range: ${from} to ${to}\nTotal Trips: 54,230\nFleet utilization: 64.5%\nPeak Hours load: 88.2%`;
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileData));
      element.setAttribute('download', `crowdsense_report_${from}_to_${to}.${format.toLowerCase() === 'pdf' ? 'pdf' : 'csv'}`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);

      ToastComponent.show(`Report Downloaded`, "success", `Saved as crowdsense_report_${from}_to_${to}.${format.toLowerCase()}`);
    }, 2000);
  }
};
