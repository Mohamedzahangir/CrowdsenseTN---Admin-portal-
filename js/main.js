// main.js - Client router, event bindings, and application controller
import { DataService } from './services/DataService';
import { LoadingPage } from './pages/LoadingPage';
import { DashboardPage } from './pages/DashboardPage';
import { OperationsPage } from './pages/OperationsPage';
import { BusesPage } from './pages/BusesPage';
import { RoutesPage } from './pages/RoutesPage';
import { DevicesPage } from './pages/DevicesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { ToastComponent } from './components/ToastComponent';

// Route Definitions mapping hashes to page controllers
const routes = {
  "/loading": LoadingPage,
  "/dashboard": DashboardPage,
  "/operations": OperationsPage,
  "/buses": BusesPage,
  "/routes": RoutesPage,
  "/devices": DevicesPage,
  "/analytics": AnalyticsPage,
  "/notifications": NotificationsPage,
  "/users": UsersPage,
  "/settings": SettingsPage
};

let currentPage = null;

function initApp() {
  console.log("main.js: initApp() started");
  // 1. Initialise Simulated Database and live telemetry loops
  DataService.init();
  console.log("main.js: DataService.init() completed");

  // 2. Bind Hash routing
  window.addEventListener("hashchange", handleRouting);
  
  // Store redirect target if it's not the loading page
  const currentHash = window.location.hash;
  if (currentHash && currentHash !== '#/loading') {
    sessionStorage.setItem('redirect_target', currentHash);
  }

  // Always boot into loading screen first
  console.log("main.js: Setting hash to #/loading");
  window.location.hash = "#/loading";
  handleRouting();
  console.log("main.js: initApp() completed successfully");

  // 3. Bind UI shell features
  bindShellEvents();

  // 4. Subscribe to alerts to dynamically update badge counts
  DataService.subscribe("shell-badges", (state) => {
    updateBadges(state);
  });
}

function handleRouting() {
  console.log("main.js: handleRouting() called with hash:", window.location.hash);
  const hash = window.location.hash;
  // Parse path without query strings
  const path = hash.split("?")[0].substring(1) || "/dashboard";
  
  const page = routes[path];
  
  if (!page) {
    window.location.hash = "#/dashboard";
    return;
  }

  // Toggle loading class on body
  if (path === "/loading") {
    document.body.classList.add("loading-screen-active");
  } else {
    document.body.classList.remove("loading-screen-active");
  }

  // Unmount current active page controller
  if (currentPage && currentPage.unmount) {
    currentPage.unmount();
  }

  // Update shell styles for selected sidebar link
  updateSidebarHighlight(path);

  // Render Page
  const contentEl = document.getElementById("page-content");
  if (contentEl) {
    contentEl.innerHTML = page.render();
    currentPage = page;
    
    // Mount page controller events
    if (page.mount) {
      page.mount();
    }
  }

  // Update Topbar Breadcrumb text
  const breadcrumbPage = document.getElementById("breadcrumb-page");
  if (breadcrumbPage) {
    const pageLabel = path.substring(1).charAt(0).toUpperCase() + path.substring(2);
    breadcrumbPage.textContent = pageLabel === "Operations" ? "Operations Center" : pageLabel;
  }

  // Close Mobile sidebar drawer if open
  closeMobileSidebar();
}

function updateSidebarHighlight(activePath) {
  const pageName = activePath.substring(1); // strip leading slash
  
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-page") === pageName) {
      item.classList.add("active");
    }
  });
}

function updateBadges(state) {
  const unreadAlerts = state.alerts.filter(a => a.status === "Unread").length;
  const issueDevices = state.devices.filter(d => d.status === "Fault" || d.status === "Offline").length;

  // Sidebar notifications badge
  const sidebarNotiBadge = document.getElementById("badge-notifications");
  if (sidebarNotiBadge) {
    sidebarNotiBadge.textContent = unreadAlerts;
    sidebarNotiBadge.style.display = unreadAlerts > 0 ? "block" : "none";
  }

  // Topbar notification count
  const topbarNotiCount = document.getElementById("topbar-noti-count");
  if (topbarNotiCount) {
    topbarNotiCount.textContent = unreadAlerts;
    topbarNotiCount.style.display = unreadAlerts > 0 ? "flex" : "none";
  }

  // Devices badge
  const sidebarDeviceBadge = document.getElementById("badge-devices");
  if (sidebarDeviceBadge) {
    sidebarDeviceBadge.textContent = issueDevices;
    sidebarDeviceBadge.style.display = issueDevices > 0 ? "block" : "none";
  }
}

function bindShellEvents() {
  // Sidebar Expand / Collapse Toggle
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");
  
  toggleBtn?.addEventListener("click", () => {
    sidebar?.classList.toggle("collapsed");
  });

  // Mobile Menu Drawer Button
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const backdrop = document.getElementById("sidebar-backdrop");

  mobileBtn?.addEventListener("click", () => {
    sidebar?.classList.add("mobile-open");
    backdrop?.classList.remove("hidden");
  });

  backdrop?.addEventListener("click", closeMobileSidebar);

  // Logout Click
  document.getElementById("btn-logout")?.addEventListener("click", () => {
    if (confirm("Confirm Logout from CrowdSense TN Admin?")) {
      ToastComponent.show("Logged Out", "info", "You have securely signed out.");
      setTimeout(() => {
        alert("Admin Session Ended securely.");
      }, 1000);
    }
  });

  // Clock
  setInterval(() => {
    const clock = document.getElementById("topbar-clock");
    if (clock) {
      clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    }
  }, 1000);

  // Topbar Notification Bell Click
  document.getElementById("topbar-noti-btn")?.addEventListener("click", () => {
    window.location.hash = "#/notifications";
  });
}

function closeMobileSidebar() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  sidebar?.classList.remove("mobile-open");
  backdrop?.classList.add("hidden");
}

// Start app on load
if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}
