// DevicesPage.js - ESP32 IoT Hardware nodes module
import { DataService } from '../services/DataService';
import { ModalComponent } from '../components/ModalComponent';
import { ToastComponent } from '../components/ToastComponent';
import { supabase } from '../services/supabaseClient';
import { saveOrUpdateTelemetry } from '../services/SharedStore';

let dataSubscription = null;
let currentSearch = "";
let currentStatusFilter = "All";

export const DevicesPage = {
  render() {
    return `
      <div class="page-header fade-in">
        <div class="page-header-row">
          <div>
            <h1 class="page-title">ESP32 IoT Nodes telemetry</h1>
            <p class="page-subtitle">Monitor physical sensor units, firmware states, and serial log lines.</p>
          </div>
          <button class="btn btn-primary" id="btn-add-device">
            <span class="material-symbols-outlined">developer_board</span>Register ESP32 Node
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="card mb-4 fade-in fade-in-delay-1">
        <div class="card-body" style="padding:16px;">
          <div class="search-filter-bar" style="margin-bottom:0;">
            <div class="search-input-wrap">
              <span class="material-symbols-outlined">search</span>
              <input type="text" id="device-search" class="search-input" placeholder="Search by Device ID or linked bus..." value="${currentSearch}">
            </div>
            
            <select id="filter-device-status" class="filter-select">
              <option value="All" ${currentStatusFilter === "All" ? "selected" : ""}>All States</option>
              <option value="Online" ${currentStatusFilter === "Online" ? "selected" : ""}>Online</option>
              <option value="Offline" ${currentStatusFilter === "Offline" ? "selected" : ""}>Offline</option>
              <option value="Maintenance" ${currentStatusFilter === "Maintenance" ? "selected" : ""}>Maintenance</option>
              <option value="Fault" ${currentStatusFilter === "Fault" ? "selected" : ""}>Fault Detected</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Devices List -->
      <div class="card fade-in fade-in-delay-2">
        <div class="card-body-flush">
          <div class="data-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Assigned Vehicle</th>
                  <th>Signal (RSSI)</th>
                  <th>Core Temp</th>
                  <th>Free Memory Heap</th>
                  <th>FW Version</th>
                  <th>Last Telemetry Sync</th>
                  <th>Health Status</th>
                  <th style="text-align:right">Actions</th>
                </tr>
              </thead>
              <tbody id="devices-table-body">
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

    DataService.subscribe("devices", dataSubscription);

    document.getElementById("device-search")?.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      this.updateTable();
    });

    document.getElementById("filter-device-status")?.addEventListener("change", (e) => {
      currentStatusFilter = e.target.value;
      this.updateTable();
    });

    document.getElementById("btn-add-device")?.addEventListener("click", () => {
      this.openAddDeviceModal();
    });
  },

  unmount() {
    if (dataSubscription) {
      DataService.unsubscribe("devices", dataSubscription);
      dataSubscription = null;
    }
  },

  updateTable() {
    const state = {
      buses: DataService.getBuses(),
      devices: DataService.getDevices(),
      tracking: DataService.getLiveState().tracking,
      occupancy: DataService.getLiveState().occupancy
    };
    this.renderTable(state);
  },

  renderTable(state) {
    const tbody = document.getElementById("devices-table-body");
    if (!tbody) return;

    let filtered = state.devices;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      filtered = filtered.filter(d => 
        d.id.toLowerCase().includes(q) ||
        (d.busId && d.busId.toLowerCase().includes(q))
      );
    }

    if (currentStatusFilter !== "All") {
      filtered = filtered.filter(d => d.status === currentStatusFilter);
    }

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align:center; padding: 32px;" class="text-muted">No hardware node logs matching selection.</td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = filtered.map(device => {
      let badgeClass = "badge-success";
      if (device.status === "Offline") badgeClass = "badge-neutral";
      else if (device.status === "Maintenance") badgeClass = "badge-warning";
      else if (device.status === "Fault") badgeClass = "badge-danger";

      const linkedBus = device.busId 
        ? `<span class="td-primary">Bus Route ${device.busId}</span>`
        : `<span class="text-muted text-sm">Unassigned</span>`;

      return `
        <tr>
          <td class="td-primary"><code>${device.id}</code></td>
          <td data-label="Assigned Vehicle">${linkedBus}</td>
          <td data-label="RSSI">${device.rssi}</td>
          <td data-label="Temp">${device.temperature}</td>
          <td data-label="Free Heap">${device.heap}</td>
          <td data-label="FW Version"><code>${device.fwVersion}</code></td>
          <td data-label="Last Ping">${device.lastComm}</td>
          <td data-label="Status"><span class="badge ${badgeClass}">${device.status}</span></td>
          <td style="text-align:right" class="td-actions" data-label="Actions">
            <button class="btn-icon view-logs" data-device-id="${device.id}" title="ESP32 Console Stream"><span class="material-symbols-outlined">terminal</span></button>
            <button class="btn-icon flash-fw" data-device-id="${device.id}" title="OTA Update Firmware"><span class="material-symbols-outlined">system_update_alt</span></button>
            <button class="btn-icon edit-device" data-device-id="${device.id}" title="Edit Device"><span class="material-symbols-outlined">edit</span></button>
            <button class="btn-icon delete-device" style="color:var(--color-danger)" data-device-id="${device.id}" title="De-register Node"><span class="material-symbols-outlined">delete</span></button>
          </td>
        </tr>
      `;
    }).join("");

    // Action triggers
    tbody.querySelectorAll(".view-logs").forEach(btn => {
      btn.addEventListener("click", () => this.viewSerialMonitor(btn.getAttribute("data-device-id")));
    });

    tbody.querySelectorAll(".flash-fw").forEach(btn => {
      btn.addEventListener("click", () => this.flashFirmwareOta(btn.getAttribute("data-device-id")));
    });

    tbody.querySelectorAll(".edit-device").forEach(btn => {
      btn.addEventListener("click", () => this.openEditDeviceModal(btn.getAttribute("data-device-id")));
    });

    tbody.querySelectorAll(".delete-device").forEach(btn => {
      btn.addEventListener("click", () => this.deleteDevice(btn.getAttribute("data-device-id")));
    });
  },

  viewSerialMonitor(deviceId) {
    const device = DataService.getDevices().find(d => d.id === deviceId);
    if (!device) return;

    let bootTime = new Date(Date.now() - 3600000).toLocaleString();

    const bodyHtml = `
      <div style="background:#0F172A; color:#38BDF8; font-family:'Courier New', monospace; padding:16px; border-radius:8px; height: 320px; overflow-y: auto; font-size:12px; line-height:1.5;" id="serial-terminal">
        <p style="color:#22C55E;">[SYS] Serial Console initialized. Baud Rate: 115200</p>
        <p style="color:#94A3B8;">[SYS] Listening for Supabase Realtime 'iot_events' on ID: ${device.id}</p>
        <p style="color:#E2E8F0;">[INIT] Target Table: public.iot_events</p>
        <p style="color:#22C55E;">[INIT] Status: Listening for incoming pings...</p>
        <p style="color:#94A3B8;">[LOOP] Current state: RSSI ${device.rssi}, Heap: ${device.heap}, Temp: ${device.temperature}</p>
        <p id="serial-pulse" style="color:#E2E8F0;">[LOOP] Waiting for ESP32 packet...</p>
      </div>
    `;

    let autoStreamInterval = null;

    const modal = ModalComponent.show({
      title: `ESP32 Serial Stream - Node ${device.id}`,
      bodyHtml,
      footerHtml: `
        <button class="btn btn-secondary btn-sm" id="btn-auto-stream"><span class="material-symbols-outlined">play_arrow</span>Start Auto Stream (3s)</button>
        <button class="btn btn-secondary btn-sm" id="btn-test-telemetry"><span class="material-symbols-outlined">send</span>Send Test Ping</button>
        <button class="btn btn-secondary btn-sm" id="btn-reboot-node"><span class="material-symbols-outlined">restart_alt</span>Soft Reset</button>
        <button class="btn btn-primary btn-sm" id="btn-close-serial">Close Terminal</button>
      `
    });

    const term = document.getElementById("serial-terminal");
    if (term) term.scrollTop = term.scrollHeight;

    // Listen to real-time events from Supabase
    const telemetryHandler = (e) => {
      const data = e.detail;
      const term = document.getElementById("serial-terminal");
      if (!term) return;

      const p = document.createElement("p");
      p.style.color = "#4ADE80";
      p.style.fontWeight = "bold";
      p.textContent = `[REALTIME RECV] [${new Date().toLocaleTimeString()}] ${JSON.stringify(data)}`;
      term.insertBefore(p, document.getElementById("serial-pulse"));
      term.scrollTop = term.scrollHeight;
    };

    window.addEventListener("crowdsense_iot_telemetry_received", telemetryHandler);

    // Periodic heartbeat log
    const interval = setInterval(() => {
      const term = document.getElementById("serial-terminal");
      if (!term) {
        clearInterval(interval);
        if (autoStreamInterval) clearInterval(autoStreamInterval);
        window.removeEventListener("crowdsense_iot_telemetry_received", telemetryHandler);
        return;
      }
      const p = document.createElement("p");
      p.style.color = "#38BDF8";
      p.textContent = `[LOOP] [${new Date().toLocaleTimeString()}] Telemetry listener active for ${device.id}`;
      term.insertBefore(p, document.getElementById("serial-pulse"));
      term.scrollTop = term.scrollHeight;
    }, 5000);

    const sendSinglePacket = async () => {
      const dynamicPassengers = Math.floor(Math.random() * 20) + 6;
      const dynamicRssi = `-${55 + Math.floor(Math.random() * 15)} dBm`;
      const dynamicTemp = `${(36 + Math.random() * 5).toFixed(1)} °C`;
      const dynamicSpeed = Math.floor(Math.random() * 25) + 20;
      const lat = 12.9238 + (Math.random() * 0.005);
      const lng = 79.1352 + (Math.random() * 0.005);
      const busId = device.busId || "BUS_001";

      const testPayload = {
        device_id: device.id,
        bus_id: busId,
        latitude: lat,
        longitude: lng,
        speed: dynamicSpeed,
        passengers: dynamicPassengers,
        rssi: dynamicRssi,
        temperature: dynamicTemp,
        event_type: "telemetry"
      };

      await saveOrUpdateTelemetry(testPayload);
    };

    document.getElementById("btn-test-telemetry")?.addEventListener("click", async () => {
      await sendSinglePacket();
      ToastComponent.show("Packet Sent", "success", `Upserted telemetry for ${device.id}`);
    });

    document.getElementById("btn-auto-stream")?.addEventListener("click", () => {
      const btn = document.getElementById("btn-auto-stream");
      if (autoStreamInterval) {
        clearInterval(autoStreamInterval);
        autoStreamInterval = null;
        btn.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>Start Auto Stream (3s)`;
        btn.classList.remove("btn-success");
        btn.classList.add("btn-secondary");
        ToastComponent.show("Auto Stream Stopped", "info", "3s packet stream paused.");
      } else {
        sendSinglePacket();
        autoStreamInterval = setInterval(sendSinglePacket, 3000);
        btn.innerHTML = `<span class="material-symbols-outlined">pause</span>Streaming (3s)... [Stop]`;
        btn.classList.remove("btn-secondary");
        btn.classList.add("btn-success");
        ToastComponent.show("Auto Stream Started", "success", "Sending telemetry packet every 3 seconds.");
      }
    });

    document.getElementById("btn-close-serial")?.addEventListener("click", () => {
      if (autoStreamInterval) clearInterval(autoStreamInterval);
      clearInterval(interval);
      window.removeEventListener("crowdsense_iot_telemetry_received", telemetryHandler);
      modal.close();
    });

    document.getElementById("btn-reboot-node")?.addEventListener("click", () => {
      if (autoStreamInterval) clearInterval(autoStreamInterval);
      ToastComponent.show("Reset Command Sent", "warning", `ESP32 ${device.id} restarting.`);
      clearInterval(interval);
      window.removeEventListener("crowdsense_iot_telemetry_received", telemetryHandler);
      modal.close();
    });
  },

  flashFirmwareOta(deviceId) {
    const bodyHtml = `
      <div style="font-size:13px; line-height:1.6;">
        <p>You are about to flash a firmware update Over-The-Air (OTA) to <b>ESP32 Node ${deviceId}</b>.</p>
        <div style="margin: 16px 0; background:#f8fafc; padding:12px; border-radius:8px;">
          <div><b>Current version:</b> v1.4.2</div>
          <div><b>New target version:</b> v1.5.0-Stable</div>
          <div><b>Payload size:</b> 1.84 MB</div>
        </div>
        <div class="form-group">
          <label class="form-label">Update Speed / Profile</label>
          <select class="form-control" id="fw-profile">
            <option value="standard">Standard Secure (Recommended)</option>
            <option value="fast">High-speed Unbuffered</option>
          </select>
        </div>
        <div class="occ-bar-wrap hidden" id="flash-progress-bar" style="margin-top:12px;">
          <div class="occ-bar low" style="width: 0%;" id="flash-progress-fill"></div>
        </div>
        <p id="flash-status" class="text-muted text-sm mt-1"></p>
      </div>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-flash">Cancel</button>
      <button class="btn btn-primary" id="btn-do-flash">Start Flash update</button>
    `;

    const modal = ModalComponent.show({
      title: `OTA Firmware Update Node ${deviceId}`,
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-flash")?.addEventListener("click", () => modal.close());
    
    document.getElementById("btn-do-flash")?.addEventListener("click", () => {
      const btn = document.getElementById("btn-do-flash");
      btn.disabled = true;
      btn.textContent = "Flashing...";
      
      const bar = document.getElementById("flash-progress-bar");
      const fill = document.getElementById("flash-progress-fill");
      const statusText = document.getElementById("flash-status");
      
      bar?.classList.remove("hidden");
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (fill) fill.style.width = `${progress}%`;
        if (statusText) statusText.textContent = `Uploading binaries: ${progress}%`;

        if (progress >= 100) {
          clearInterval(interval);
          if (statusText) statusText.textContent = `Update complete. Rebooting ESP32 Node...`;
          
          setTimeout(() => {
            DataService.updateDevice(deviceId, { fwVersion: "v1.5.0", status: "Online" });
            ToastComponent.show("Firmware Updated", "success", `ESP32 Node ${deviceId} flashed to v1.5.0`);
            modal.close();
            this.updateTable();
          }, 1500);
        }
      }, 300);
    });
  },

  openAddDeviceModal() {
    const buses = DataService.getBuses().filter(b => !b.deviceId);
    const busOptionsHtml = `<option value="">Unassigned</option>` + buses.map(b => `<option value="${b.id}">Bus ${b.id} - ${b.name}</option>`).join("");

    const bodyHtml = `
      <form id="form-add-device">
        <div class="form-group">
          <label class="form-label">Device MAC ID</label>
          <input type="text" name="id" class="form-control" placeholder="e.g. ESP32-0570" required>
        </div>
        <div class="form-group">
          <label class="form-label">Linked Bus Vehicle</label>
          <select name="busId" class="form-control">
            ${busOptionsHtml}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Firmware Version</label>
            <input type="text" name="fwVersion" class="form-control" value="v1.4.2" required>
          </div>
          <div class="form-group">
            <label class="form-label">Initial Status</label>
            <select name="status" class="form-control">
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-device">Cancel</button>
      <button class="btn btn-primary" id="btn-save-device">Save IoT node</button>
    `;

    const modal = ModalComponent.show({
      title: "Provision New ESP32 Sensor Node",
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-device")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-device")?.addEventListener("click", () => {
      const form = document.getElementById("form-add-device");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const devId = formData.get("id");
      const busId = formData.get("busId");

      const newDevice = {
        id: devId,
        busId: busId || "",
        status: formData.get("status"),
        lastComm: "Just now",
        fwVersion: formData.get("fwVersion"),
        rssi: "-62 dBm",
        heap: "182 KB",
        temperature: "40.5 °C"
      };

      DataService.addDevice(newDevice);

      // Link to bus if selected
      if (busId) {
        DataService.updateBus(busId, { deviceId: devId });
      }

      ToastComponent.show("IoT Node Provisioned", "success", `Device ${devId} registered.`);
      modal.close();
      this.updateTable();
    });
  },

  openEditDeviceModal(deviceId) {
    const device = DataService.getDevices().find(d => d.id === deviceId);
    if (!device) return;

    const buses = DataService.getBuses().filter(b => !b.deviceId || b.id === device.busId);
    const busOptionsHtml = `<option value="">Unassigned</option>` + buses.map(b => `<option value="${b.id}" ${b.id === device.busId ? "selected" : ""}>Bus ${b.id} - ${b.name}</option>`).join("");

    const bodyHtml = `
      <form id="form-edit-device">
        <div class="form-group">
          <label class="form-label">Device MAC ID</label>
          <input type="text" name="id" class="form-control" value="${device.id}" disabled>
        </div>
        <div class="form-group">
          <label class="form-label">Linked Bus Vehicle</label>
          <select name="busId" class="form-control">
            ${busOptionsHtml}
          </select>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Firmware Version</label>
            <input type="text" name="fwVersion" class="form-control" value="${device.fwVersion}" required>
          </div>
          <div class="form-group">
            <label class="form-label">Node Status</label>
            <select name="status" class="form-control">
              <option value="Online" ${device.status === "Online" ? "selected" : ""}>Online</option>
              <option value="Offline" ${device.status === "Offline" ? "selected" : ""}>Offline</option>
              <option value="Maintenance" ${device.status === "Maintenance" ? "selected" : ""}>Maintenance</option>
              <option value="Fault" ${device.status === "Fault" ? "selected" : ""}>Fault</option>
            </select>
          </div>
        </div>
      </form>
    `;

    const footerHtml = `
      <button class="btn btn-ghost" id="btn-cancel-device">Cancel</button>
      <button class="btn btn-primary" id="btn-save-device">Save Changes</button>
    `;

    const modal = ModalComponent.show({
      title: `Configure IoT Node: ${device.id}`,
      bodyHtml,
      footerHtml
    });

    document.getElementById("btn-cancel-device")?.addEventListener("click", () => modal.close());

    document.getElementById("btn-save-device")?.addEventListener("click", () => {
      const form = document.getElementById("form-edit-device");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const formData = new FormData(form);
      const prevBus = device.busId;
      const newBus = formData.get("busId") || "";

      const updatedFields = {
        busId: newBus,
        status: formData.get("status"),
        fwVersion: formData.get("fwVersion")
      };

      // Handle Bus Link updates
      if (prevBus !== newBus) {
        if (prevBus) {
          DataService.updateBus(prevBus, { deviceId: "" });
        }
        if (newBus) {
          DataService.updateBus(newBus, { deviceId: device.id });
        }
      }

      DataService.updateDevice(device.id, updatedFields);
      ToastComponent.show("IoT Node Saved", "success", `Configuration updated for ESP32 ${device.id}`);
      modal.close();
      this.updateTable();
    });
  },

  deleteDevice(deviceId) {
    if (confirm(`Are you sure you want to de-register and delete ESP32 Node ${deviceId}?`)) {
      const device = DataService.getDevices().find(d => d.id === deviceId);
      if (device && device.busId) {
        DataService.updateBus(device.busId, { deviceId: "" });
      }
      DataService.deleteDevice(deviceId);
      ToastComponent.show("Device Removed", "danger", `IoT node ${deviceId} removed.`);
      this.updateTable();
    }
  }
};
