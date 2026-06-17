// ModalComponent.js - Reusable dialog overlay modal control

export const ModalComponent = {
  show({ title, bodyHtml, footerHtml, onClose }) {
    const overlay = document.getElementById("modal-overlay");
    const container = document.getElementById("modal-container");
    const titleEl = document.getElementById("modal-title");
    const bodyEl = document.getElementById("modal-body");
    const footerEl = document.getElementById("modal-footer");
    const closeBtn = document.getElementById("modal-close");

    if (!overlay || !container) return;

    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHtml;
    footerEl.innerHTML = footerHtml || "";

    overlay.classList.remove("hidden");
    document.body.style.overflow = "hidden"; // Disable background scrolling

    // Bind close actions
    const handleClose = () => {
      overlay.classList.add("hidden");
      document.body.style.overflow = "";
      if (onClose) onClose();
      // clean listeners
      closeBtn.removeEventListener("click", handleClose);
      overlay.removeEventListener("click", handleOverlayClick);
    };

    const handleOverlayClick = (e) => {
      if (e.target === overlay) {
        handleClose();
      }
    };

    closeBtn.addEventListener("click", handleClose);
    overlay.addEventListener("click", handleOverlayClick);

    return {
      close: handleClose,
      bodyEl,
      footerEl
    };
  }
};
