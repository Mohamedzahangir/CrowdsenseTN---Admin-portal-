// ToastComponent.js - System Toast notifications manager

export const ToastComponent = {
  show(message, type = "info", subtitle = "") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "info";
    if (type === "success") icon = "check_circle";
    if (type === "warning") icon = "warning";
    if (type === "danger") icon = "error";

    toast.innerHTML = `
      <span class="material-symbols-outlined toast-icon">${icon}</span>
      <div class="toast-message">
        <div>${message}</div>
        ${subtitle ? `<div class="toast-sub">${subtitle}</div>` : ""}
      </div>
    `;

    container.appendChild(toast);

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      toast.style.animation = "slideInToast 0.3s ease reverse forwards";
      toast.addEventListener("animationend", () => {
        toast.remove();
      });
    }, 4000);
  }
};
