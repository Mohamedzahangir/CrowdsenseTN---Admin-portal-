// SettingsPage.js - System configurations setting module
import { DataService } from '../services/DataService';
import { ToastComponent } from '../components/ToastComponent';

export const SettingsPage = {
  render() {
    const settings = DataService.getSettings();

    return `
      <div class="page-header fade-in">
        <h1 class="page-title">System & Operational Settings</h1>
        <p class="page-subtitle">Configure thresholds limits, IoT connection intervals, and notification dispatch rules.</p>
      </div>

      <div class="grid-2 fade-in fade-in-delay-1" style="grid-template-columns: 2fr 1fr; gap: 20px;">
        
        <!-- Main Settings Controls -->
        <div class="flex flex-col gap-4">
          <!-- Threshold settings -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <span class="material-symbols-outlined">analytics</span>Occupancy Load Thresholds
              </div>
            </div>
            <div class="card-body">
              <div class="settings-section">
                <div class="settings-row">
                  <div>
                    <div class="settings-label">High Occupancy Limit (%)</div>
                    <div class="settings-desc">Triggers medium crowd indicator & warning logs. Default: 75%</div>
                  </div>
                  <input type="number" id="setting-high-occ" class="filter-select" style="width: 80px;" value="${settings.highOccupancyThreshold}" min="40" max="85">
                </div>
                
                <div class="settings-row">
                  <div>
                    <div class="settings-label">Critical Load Overload (%)</div>
                    <div class="settings-desc">Triggers Red warning indicator & operator SMS. Default: 90%</div>
                  </div>
                  <input type="number" id="setting-critical-occ" class="filter-select" style="width: 80px;" value="${settings.criticalOccupancyThreshold}" min="80" max="100">
                </div>
              </div>
            </div>
          </div>

          <!-- Telemetry configuration -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <span class="material-symbols-outlined">memory</span>IoT ESP32 Node Timers
              </div>
            </div>
            <div class="card-body">
              <div class="settings-section">
                <div class="settings-row">
                  <div>
                    <div class="settings-label">GPS Polling Rate (seconds)</div>
                    <div class="settings-desc">Controls frequency of coordinates update transmissions. Default: 3s</div>
                  </div>
                  <input type="number" id="setting-gps-poll" class="filter-select" style="width: 80px;" value="${settings.gpsPollingInterval}" min="1" max="30">
                </div>
                
                <div class="settings-row">
                  <div>
                    <div class="settings-label">Heartbeat Timeout Limit (seconds)</div>
                    <div class="settings-desc">Time duration before declaring node offline. Default: 60s</div>
                  </div>
                  <input type="number" id="setting-timeout-limit" class="filter-select" style="width: 80px;" value="${settings.offlineTimeout}" min="10" max="300">
                </div>
              </div>
            </div>
          </div>

          <!-- Dispatch rules toggles -->
          <div class="card">
            <div class="card-header">
              <div class="card-title">
                <span class="material-symbols-outlined">notifications</span>Alert Dispatch Channels
              </div>
            </div>
            <div class="card-body">
              <div class="settings-section">
                <div class="settings-row">
                  <div>
                    <div class="settings-label">Send Email Alerts</div>
                    <div class="settings-desc">Dispatch daily transit summary logs to transport superintendents.</div>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" id="setting-email-notif" ${settings.alertEmailNotif ? "checked" : ""}>
                    <span class="toggle-track"></span>
                  </label>
                </div>

                <div class="settings-row">
                  <div>
                    <div class="settings-label">Send SMS Alerts (Critical Load)</div>
                    <div class="settings-desc">Dispatch cellular SMS message to assigned depot driver when occupancy is exceeded.</div>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" id="setting-sms-notif" ${settings.alertSmsNotif ? "checked" : ""}>
                    <span class="toggle-track"></span>
                  </label>
                </div>

                <div class="settings-row">
                  <div>
                    <div class="settings-label">Browser Push Notifications</div>
                    <div class="settings-desc">Enable desktop toast notifications for system warnings.</div>
                  </div>
                  <label class="toggle">
                    <input type="checkbox" id="setting-push-notif" ${settings.alertPushNotif ? "checked" : ""}>
                    <span class="toggle-track"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 justify-end" style="margin-top:8px;">
            <button class="btn btn-ghost" id="btn-reset-settings">Restore Defaults</button>
            <button class="btn btn-primary" id="btn-save-settings">Save System Settings</button>
          </div>
        </div>

        <!-- Sidebar helper info -->
        <div class="flex flex-col gap-4">
          <div class="card">
            <div class="card-header">
              <div class="card-title"><span class="material-symbols-outlined">info</span>Platform Info</div>
            </div>
            <div class="card-body" style="font-size:12px; line-height:1.6;">
              <div style="margin-bottom:8px;"><b>System ID:</b> CROWDSENSE-TN-PROD-01</div>
              <div style="margin-bottom:8px;"><b>Region code:</b> TN-01 (Chennai Area)</div>
              <div style="margin-bottom:8px;"><b>Database Schema:</b> PostgreSQL v15.4 Ready</div>
              <div style="margin-bottom:8px;"><b>Firmware Compatibility:</b> ESP32-WROOM-32E</div>
              <div style="margin-bottom:8px;"><b>API server gateway:</b> <code>https://api.crowdsense.tn.gov/v1/</code></div>
              <div style="border-top:1px solid var(--color-border-subtle); padding-top:10px; margin-top:10px;">
                <span style="font-weight:600; color:var(--color-primary);">Need Technical Help?</span>
                <p class="text-muted mt-1" style="font-size:11px">Contact smart city support hub at: <code>support@crowdsense.tn.gov</code></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  mount() {
    document.getElementById("btn-save-settings")?.addEventListener("click", () => {
      const updated = {
        highOccupancyThreshold: parseInt(document.getElementById("setting-high-occ").value),
        criticalOccupancyThreshold: parseInt(document.getElementById("setting-critical-occ").value),
        gpsPollingInterval: parseInt(document.getElementById("setting-gps-poll").value),
        offlineTimeout: parseInt(document.getElementById("setting-timeout-limit").value),
        alertEmailNotif: document.getElementById("setting-email-notif").checked,
        alertSmsNotif: document.getElementById("setting-sms-notif").checked,
        alertPushNotif: document.getElementById("setting-push-notif").checked,
        autoRefreshDashboard: true
      };

      DataService.saveSettings(updated);
      DataService.addActivity("Configuration Modified", "System parameters and alert thresholds modified.");
      ToastComponent.show("Settings Saved", "success", "Configuration limits updated successfully.");
    });

    document.getElementById("btn-reset-settings")?.addEventListener("click", () => {
      if (confirm("Reset settings back to defaults?")) {
        const defaults = {
          highOccupancyThreshold: 75,
          criticalOccupancyThreshold: 90,
          gpsPollingInterval: 3,
          offlineTimeout: 60,
          alertEmailNotif: true,
          alertSmsNotif: false,
          alertPushNotif: true,
          autoRefreshDashboard: true
        };
        DataService.saveSettings(defaults);
        ToastComponent.show("Defaults Restored", "info", "Threshold limits reset.");
        // Rerender page by changing hash or mounting again
        window.location.reload();
      }
    });
  }
};
