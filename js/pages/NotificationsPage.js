// NotificationsPage.js - Operations Alerts Hub
import { DataService } from '../services/DataService';
import { ToastComponent } from '../components/ToastComponent';
import { ModalComponent } from '../components/ModalComponent';

let dataSubscription = null;
let currentTab = "All"; // All, Unread, Read
let currentPriority = "All"; // All, Critical, High, Medium, Low

export const NotificationsPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">Notification & Alerts Center</h1>
            <p class="page-subtitle">Acknowledge critical incident reports, hardware offline alerts, and passenger overloads.</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn btn-secondary" id="btn-mark-all-read">
              <span class="material-symbols-outlined">done_all</span>Mark All Acknowledged
            </button>
            <button class="btn btn-primary" id="btn-publish-notif">
              <span class="material-symbols-outlined">campaign</span>Publish Notification
            </button>
          </div>
        </div>
      </div>

      <!-- Filters Row -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px; display:flex; justify-content:between; align-items:center; flex-wrap:wrap; gap:12px;">
          <!-- Tabs -->
          <div class="notif-filter-tabs" style="margin-bottom:0;">
            <button class="notif-tab ${currentTab === "All" ? "active" : ""}" data-tab="All">All Logs</button>
            <button class="notif-tab ${currentTab === "Unread" ? "active" : ""}" data-tab="Unread">Active/Unread</button>
            <button class="notif-tab ${currentTab === "Read" ? "active" : ""}" data-tab="Read">Archived/Read</button>
          </div>

          <!-- Priority Select -->
          <select id="filter-notif-priority" class="filter-select">
            <option value="All" ${currentPriority === "All" ? "selected" : ""}>All Priorities</option>
            <option value="Critical" ${currentPriority === "Critical" ? "selected" : ""}>Critical Only</option>
            <option value="High" ${currentPriority === "High" ? "selected" : ""}>High</option>
            <option value="Medium" ${currentPriority === "Medium" ? "selected" : ""}>Medium</option>
            <option value="Low" ${currentPriority === "Low" ? "selected" : ""}>Low</option>
          </select>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="card fade-in fade-in-delay-2">
        <div class="card-body-flush" id="alerts-hub-container">
          <!-- populated dynamically -->
        </div>
      </div>
    `;
  },

  mount() {
    dataSubscription = (state) => {
      this.renderAlerts(state);
    };

    DataService.subscribe("notifications", dataSubscription);

    // Bind tabs
    document.querySelectorAll(".notif-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelector(".notif-tab.active")?.classList.remove("active");
        tab.classList.add("active");
        currentTab = tab.getAttribute("data-tab");
        this.updateAlertsList();
      });
    });

    // Bind Priority selector
    document.getElementById("filter-notif-priority")?.addEventListener("change", (e) => {
      currentPriority = e.target.value;
      this.updateAlertsList();
    });

    // Mark all read
    document.getElementById("btn-mark-all-read")?.addEventListener("click", () => {
      DataService.markAllAlertsAsRead();
      ToastComponent.show("All Notifications Read", "success", "Incident logs acknowledged");
      this.updateAlertsList();
    });

    // Publish Notification Click
    document.getElementById("btn-publish-notif")?.addEventListener("click", () => {
      this.openPublishNotificationModal();
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("notifications", dataSubscription);
      dataSubscription = null;
    }
  },

  openPublishNotificationModal() {
    const buses = DataService.getBuses();
    const busOptionsHtml = `<option value="">System Wide (All Routes)</option>` + 
      buses.map(b => `<option value="${b.id}">Route ${b.id} - ${b.name}</option>`).join("");

    const bodyHtml = `
      <form id="form-publish-notif">
        <div class="form-group">
          <label class="form-label">Notification Title</label>
          <input type="text" name="title" class="form-control" placeholder="e.g. Route 19B Diversion due to road work" required style="width:100%; padding:8px; border:1px solid var(--color-border-subtle); border-radius:4px;">
        </div>
        <div class="form-group" style="margin-top: 12px;">
          <label class="form-label">Message Details</label>
          <textarea name="desc" class="form-control" rows="3" placeholder="Explain the notification or alert details for the commuters..." required style="width:100%; padding:8px; border:1px solid var(--color-border-subtle); border-radius:4px; font-family:inherit;"></textarea>
        </div>
        <div class="form-row" style="margin-top: 12px; display:flex; gap:12px;">
          <div class="form-group" style="flex:1;">
            <label class="form-label">Alert Type</label>
            <select name="type" class="form-control" style="width:100%; padding:8px; border:1px solid var(--color-border-subtle); border-radius:4px; background:white;">
              <option value="Route Delay">Route Delay</option>
              <option value="Bus Delay">Bus Delay</option>
              <option value="High Occupancy">High Occupancy</option>
              <option value="Device Offline">Device Offline</option>
              <option value="Sensor Failure">Sensor Failure</option>
              <option value="System Notification">System Notification</option>
              <option value="General Update">General Update</option>
            </select>
          </div>
          <div class="form-group" style="flex:1;">
            <label class="form-label">Priority Level</label>
            <select name="priority" class="form-control" style="width:100%; padding:8px; border:1px solid var(--color-border-subtle); border-radius:4px; background:white;">
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High" selected>High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
        <div class="form-group" style="margin-top: 12px;">
          <label class="form-label">Affected Bus Route</label>
          <select name="busId" class="form-control" style="width:100%; padding:8px; border:1px solid var(--color-border-subtle); border-radius:4px; background:white;">
            ${busOptionsHtml}
          </select>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-publish">Cancel</button>
      <button class="btn btn-primary" id="btn-submit-publish">Publish Alert</button>
    `;

    const modal = ModalComponent.show({
      title: "Publish Commuter Notification / Alert",
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-publish")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-submit-publish")?.addEventListener("click", () => {
      const form = document.getElementById("form-publish-notif");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const newAlert = {
        title: formData.get("title"),
        desc: formData.get("desc"),
        type: formData.get("type"),
        priority: formData.get("priority"),
        busId: formData.get("busId") || "",
      };

      DataService.createAlert(newAlert);
      DataService.addActivity("Alert Broadcasted", `Broadcasted: "${newAlert.title}"`);
      ToastComponent.show("Notification Broadcasted", "success", `Published alert successfully.`);
      modal.close();
      this.updateAlertsList();
    });
  },

  updateAlertsList() {
    const state = {
      alerts: DataService.getAlerts()
    };
    this.renderAlerts(state);
  },

  renderAlerts(state) {
    const container = document.getElementById("alerts-hub-container");
    if (!container) return;

    let filtered = state.alerts;

    // Filter by tab status
    if (currentTab === "Unread") {
      filtered = filtered.filter(a => a.status === "Unread");
    } else if (currentTab === "Read") {
      filtered = filtered.filter(a => a.status === "Read");
    }

    // Filter by priority
    if (currentPriority !== "All") {
      filtered = filtered.filter(a => a.priority === currentPriority);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="text-muted" style="text-align:center; padding: 40px;">
          No incident alerts matches selection criteria.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(alert => {
      const priorityClass = alert.priority.toLowerCase(); // critical, high, medium, low
      const unreadDot = alert.status === "Unread" ? `<span class="alert-dot unread"></span>` : `<span class="alert-dot read"></span>`;
      
      const actionBtn = alert.status === "Unread" 
        ? `<button class="btn btn-secondary btn-sm ack-alert" data-alert-id="${alert.id}">Acknowledge</button>`
        : `<button class="btn btn-ghost btn-sm del-alert" style="color:var(--color-danger)" data-alert-id="${alert.id}">Archive</button>`;

      return `
        <div class="alert-item">
          ${unreadDot}
          <div class="alert-icon-wrap ${priorityClass}">
            <span class="material-symbols-outlined">${alert.priority === "Critical" ? "gpp_maybe" : "warning"}</span>
          </div>
          <div class="alert-content">
            <div class="alert-title">${alert.title} <span class="badge ${this.getBadgeClass(alert.priority)}" style="font-size:8px; padding:1px 4px; margin-left:6px">${alert.priority}</span></div>
            <div class="alert-desc">${alert.desc}</div>
          </div>
          <div class="flex items-center gap-3">
            <div class="alert-meta">
              <div>${alert.time}</div>
              <div style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">Target: ${alert.busId || "System"}</div>
            </div>
            ${actionBtn}
          </div>
        </div>
      `;
    }).join("");

    // Bind action events
    container.querySelectorAll(".ack-alert").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-alert-id");
        DataService.markAlertAsRead(id);
        ToastComponent.show("Alert Acknowledged", "success", `Incident marked as read.`);
        this.updateAlertsList();
      });
    });

    container.querySelectorAll(".del-alert").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-alert-id");
        DataService.archiveAlert(id);
        ToastComponent.show("Alert Archived", "info", `Log entry deleted.`);
        this.updateAlertsList();
      });
    });
  },

  getBadgeClass(priority) {
    if (priority === "Critical") return "badge-danger";
    if (priority === "High") return "badge-warning";
    if (priority === "Medium") return "badge-secondary";
    return "badge-neutral";
  }
};
