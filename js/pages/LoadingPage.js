// LoadingPage.js - Loading screen page module for Admin Portal
export const LoadingPage = {
  render() {
    return `
      <div class="loading-page-container">
        <!-- Top Spacer for vertical balance -->
        <div class="top-spacer"></div>
        
        <!-- Central Focal Point -->
        <main class="fade-in">
          <!-- Logo & Tagline Container -->
          <div class="logo-container">
            <img class="logo-img" src="/logo_with_tagline.png" alt="CrowdSense TN Logo with Tagline" />
          </div>
          
          <p class="version-tag">
            CrowdSense TN Transit System v4.2
          </p>
          
          <!-- Progress Indicator -->
          <div class="progress-container">
            <div class="progress-info">
              <span class="status-text" id="loading-status">Initializing Systems</span>
              <span class="percent-text" id="percent">0%</span>
            </div>
            <div class="progress-track">
              <div class="progress-bar shimmer-effect" id="progress-bar" style="width: 0%"></div>
            </div>
          </div>
        </main>
        
        <!-- Footer Branding -->
        <footer class="fade-in" style="animation-delay: 0.2s;">
          <div class="footer-divider"></div>
          <div class="footer-brand">
            <p class="dept-label">
              Department of Transport
            </p>
            <div class="govt-title">
              <span class="material-symbols-outlined" style="color: var(--color-primary); font-variation-settings: 'FILL' 1; font-size: 20px;">account_balance</span>
              <h2 class="govt-name">
                Government of Tamil Nadu
              </h2>
            </div>
          </div>
          <div class="dots-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </footer>
      </div>
    `;
  },

  mount() {
    const progressBar = document.getElementById('progress-bar');
    const percentText = document.getElementById('percent');
    const statusText = document.getElementById('loading-status');
    if (!progressBar || !percentText || !statusText) return;
    
    const steps = [
      { threshold: 20, label: "Connecting to Satellite..." },
      { threshold: 45, label: "Fetching Transit Data..." },
      { threshold: 70, label: "Optimizing Route Matrices..." },
      { threshold: 90, label: "Synchronizing Dashboards..." },
      { threshold: 100, label: "System Ready" }
    ];

    let progress = 0;
    let timeoutId = null;
    
    function updateProgress() {
      if (progress < 100) {
        progress += Math.floor(Math.random() * 10) + 2;
        if (progress > 100) progress = 100;
        
        progressBar.style.width = `${progress}%`;
        percentText.innerText = `${progress}%`;
        
        const currentStep = steps.find(s => progress <= s.threshold) || steps[steps.length - 1];
        statusText.innerText = currentStep.label;
        
        timeoutId = setTimeout(updateProgress, Math.random() * 200 + 80);
      } else {
        statusText.style.color = "var(--color-success)";
        timeoutId = setTimeout(() => {
          const redirectTarget = sessionStorage.getItem('redirect_target');
          sessionStorage.removeItem('redirect_target');
          window.location.hash = redirectTarget || '#/dashboard';
        }, 600);
      }
    }

    updateProgress();

    // Store timeout ID to clear if unmounted early
    this._timeoutId = timeoutId;
  },

  unmount() {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
    }
  }
};
