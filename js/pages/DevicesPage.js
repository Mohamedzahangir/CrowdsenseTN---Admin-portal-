// DevicesPage.js - ESP32 IoT Hardware nodes module
import { DataService } from '../services/DataService';
import { ModalComponent } from '../components/ModalComponent';
import { ToastComponent } from '../components/ToastComponent';

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
        <p style="color:#94A3B8;">[SYS] Node Connected. Boot Time: ${bootTime}</p>
        <p style="color:#E2E8F0;">[INIT] WiFi connecting to 'CrowdSense_Net_5G' ...</p>
        <p style="color:#22C55E;">[INIT] WiFi Connected! IP Address: 192.168.4.152</p>
        <p style="color:#E2E8F0;">[MQTT] Establishing connection to Broker: broker.hivemq.com:1883</p>
        <p style="color:#22C55E;">[MQTT] Connected. Subscribing to: crowdsense/bus/${device.busId || "unassigned"}/cmd</p>
        <p style="color:#F1F5F9;">[SENSORS] VL53L1X laser rangefinder loaded. Status: OK</p>
        <p style="color:#F1F5F9;">[SENSORS] GPS Neo-6M Lock established. Sats: 8</p>
        <p style="color:#94A3B8;">[LOOP] Telemetry heartbeat sent. RSSI: ${device.rssi}, Heap: ${device.heap}, Temp: ${device.temperature}</p>
        <p style="color:#34D399;">[JSON] {"client_id":"${device.id}","lat":13.0064,"lng":80.2577,"passengers":${device.busId ? "35" : "0"},"doors_active":0}</p>
        <p id="serial-pulse" style="color:#E2E8F0;">[LOOP] Listening for IR beams events...</p>
      </div>
    `;

    const modal = ModalComponent.show({
      title: `ESP32 Serial Stream - Node ${device.id}`,
      bodyHtml,
      footerHtml: `
        <button class="btn btn-secondary btn-sm" id="btn-reboot-node"><span class="material-symbols-outlined">restart_alt</span>Soft Reset</button>
        <button class="btn btn-primary btn-sm" id="btn-close-serial">Close Terminal</button>
      `
    });

    // Auto scroll to bottom
    const term = document.getElementById("serial-terminal");
    if (term) term.scrollTop = term.scrollHeight;

    // Simulate logs stream
    const interval = setInterval(() => {
      const term = document.getElementById("serial-terminal");
      if (!term) {
        clearInterval(interval);
        return;
      }
      const p = document.createElement("p");
      p.style.color = "#38BDF8";
      p.textContent = `[LOOP] [${new Date().toLocaleTimeString()}] Ping heartbeat OK. RSSI: -${60 + Math.floor(Math.random()*10)} dBm | Free Heap: ${170 + Math.floor(Math.random()*10)} KB`;
      term.insertBefore(p, document.getElementById("serial-pulse"));
      term.scrollTop = term.scrollHeight;
    }, 3000);

    document.getElementById("btn-close-serial")?.addEventListener("click", () => {
      clearInterval(interval);
      modal.close();
    });

    document.getElementById("btn-reboot-node")?.addEventListener("click", () => {
      ToastComponent.show("Reset Command Sent", "warning", `ESP32 ${device.id} restarting.`);
      clearInterval(interval);
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
