// LiveTracking.js - Reusable Live Map Tracking component (Leaflet base + Custom DivIcons + glides)
// Matches Customer Portal map.js visualization exactly

export const LiveTracking = {
  mapInstance: null,
  busMarkers: {},
  animMarkers: {},
  animationFrameId: null,

  init(containerId, centerLatLng = [13.0064, 80.2577], initialZoom = 12) {
    if (typeof window.L === 'undefined') {
      console.error("Leaflet.js library is not loaded.");
      return null;
    }

    const L = window.L;

    // Create Leaflet instance
    this.mapInstance = L.map(containerId, {
      zoomControl: true,
      scrollWheelZoom: true,
      attributionControl: false
    }).setView(centerLatLng, initialZoom);

    // CartoDB Positron Styled Tiles (Matches Customer style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(this.mapInstance);

    // Start glides loop
    this.startGlidesLoop();

    return this.mapInstance;
  },

  createBusIcon(busId) {
    const markerColor = busId === "19B" ? "bg-primary" : "bg-primary-container";
    const bgHex = busId === "19B" ? "var(--color-primary)" : "var(--color-primary-light)";
    
    return window.L.divIcon({
      className: 'custom-bus-marker-icon',
      html: `
        <div class="relative flex flex-col items-center select-none" style="transform: translate(-20px, -20px); width: 40px; height: 40px; display: flex; flex-direction: column; align-items: center;">
          <div style="background: ${bgHex}; padding: 8px; border-radius: 50%; box-shadow: var(--shadow-md); border: 2px solid white; display: flex; align-items: center; justify-content: center;" class="pulse-live">
            <span class="material-symbols-outlined text-white text-[14px]" style="font-size: 14px; color: white; font-variation-settings: 'FILL' 1;">directions_bus</span>
          </div>
          <div style="margin-top: 4px; padding: 2px 6px; background: rgba(255,255,255,0.95); border-radius: 9999px; border: 1px solid rgba(195,198,215,0.4); box-shadow: var(--shadow-sm);">
            <span class="font-label-caps text-[8px] font-bold text-primary" style="font-size: 8px; font-weight: 700; color: var(--color-primary);">${busId}</span>
          </div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });
  },

  updateMarkers(trackingStates, occupancyStates) {
    if (!this.mapInstance) return;
    const L = window.L;

    Object.keys(trackingStates).forEach(busId => {
      const state = trackingStates[busId];
      if (!state) return;

      if (!this.busMarkers[busId]) {
        // Create marker
        const marker = L.marker([state.lat, state.lng], {
          icon: this.createBusIcon(busId)
        }).addTo(this.mapInstance);

        this.busMarkers[busId] = marker;
        this.animMarkers[busId] = {
          startLat: state.lat,
          startLng: state.lng,
          currentLat: state.lat,
          currentLng: state.lng,
          targetLat: state.lat,
          targetLng: state.lng,
          startTime: performance.now(),
          duration: 3000
        };
      } else {
        // Update glider destinations
        const anim = this.animMarkers[busId];
        if (anim) {
          anim.startLat = anim.currentLat;
          anim.startLng = anim.currentLng;
          anim.targetLat = state.lat;
          anim.targetLng = state.lng;
          anim.startTime = performance.now();
        }
      }
    });
  },

  drawRoutes(routes) {
    if (!this.mapInstance) return;
    const L = window.L;

    routes.forEach(route => {
      const coords = route.stops.map(stop => [stop.lat, stop.lng]);
      
      let pathColor = '#0057B8'; // default primary
      if (route.number === "19B") pathColor = '#00A8E8'; 
      else if (route.number === "23C") pathColor = '#22C55E';
      else if (route.number === "M70") pathColor = '#EF4444';

      L.polyline(coords, {
        color: pathColor,
        weight: 4,
        opacity: 0.7,
        lineJoin: 'round'
      }).addTo(this.mapInstance);
    });
  },

  startGlidesLoop() {
    const animate = (timestamp) => {
      Object.keys(this.busMarkers).forEach(busId => {
        const marker = this.busMarkers[busId];
        const anim = this.animMarkers[busId];
        if (!marker || !anim) return;

        const elapsed = timestamp - anim.startTime;
        const progress = Math.min(elapsed / anim.duration, 1.0);

        if (anim.startLat !== undefined) {
          const currentLat = anim.startLat + (anim.targetLat - anim.startLat) * progress;
          const currentLng = anim.startLng + (anim.targetLng - anim.startLng) * progress;
          
          anim.currentLat = currentLat;
          anim.currentLng = currentLng;
          marker.setLatLng([currentLat, currentLng]);
        } else {
          anim.currentLat = anim.targetLat;
          anim.currentLng = anim.targetLng;
          marker.setLatLng([anim.targetLat, anim.targetLng]);
        }
      });
      this.animationFrameId = requestAnimationFrame(animate);
    };
    this.animationFrameId = requestAnimationFrame(animate);
  },

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.mapInstance) {
      this.mapInstance.remove();
      this.mapInstance = null;
    }
    this.busMarkers = {};
    this.animMarkers = {};
  }
};
