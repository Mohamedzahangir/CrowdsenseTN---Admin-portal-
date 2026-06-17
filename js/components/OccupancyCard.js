// OccupancyCard.js - Reusable Occupancy Card (radial progress ring + passenger load details) matches Customer style
import { StatusBadge } from './StatusBadge';

export const OccupancyCard = {
  renderRadialProgress(percentage) {
    const pct = percentage !== undefined ? percentage : 0;
    // Mobile circle circumference is 175.9 (radius 28), Desktop is 226.2 (radius 36)
    const strokeDashoffset = 226.2 - (pct / 100) * 226.2;

    return `
      <div class="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center flex-shrink-0" style="position: relative; width: 80px; height: 80px; display: flex; align-items: center; justify-center: center; flex-shrink: 0;">
        <svg class="w-full h-full -rotate-90 radial-progress-svg" style="width: 100%; height: 100%;">
          <circle class="text-surface-container-highest" cx="40" cy="40" fill="transparent" r="36" stroke="var(--color-surface-container-high)" stroke-width="8"></circle>
          <circle id="radial-progress-ring" class="text-primary transition-all duration-700 ease-out" cx="40" cy="40" fill="transparent" r="36" stroke="var(--color-primary)" stroke-dasharray="226.2" stroke-dashoffset="${strokeDashoffset}" stroke-width="8" stroke-linecap="round" style="transition: stroke-dashoffset 0.7s ease-out;"></circle>
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center" style="position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; left:0; top:0; right:0; bottom:0;">
          <span class="font-bold text-base md:text-title-lg text-on-surface font-sans" style="font-weight: 700; font-size: 16px; color: var(--color-text-primary);">${pct}%</span>
        </div>
      </div>
    `;
  },

  render(bus, occupancyState) {
    const percentage = occupancyState ? occupancyState.percentage : 0;
    const passengers = occupancyState ? occupancyState.passengers : 0;
    const capacity = bus.capacity || 60;
    const vacant = capacity - passengers;

    return `
      <div class="bg-surface-container-high p-4 md:p-6 rounded-xl border border-primary/10 shadow-md flex items-center justify-between gap-4 md:gap-6" style="background: var(--color-surface-container); border: 1px solid var(--color-border-subtle); padding: 20px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: var(--shadow-sm);">
        <div class="flex items-center gap-4" style="display: flex; align-items: center; gap: 16px;">
          ${this.renderRadialProgress(percentage)}
          <div class="flex flex-col" style="display: flex; flex-direction: column;">
            <span class="text-label-caps font-bold text-primary uppercase tracking-widest mb-1" style="font-size: 10px; font-weight: 700; color: var(--color-primary); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">Occupancy</span>
            <div id="occupancy-badge-container">
              ${StatusBadge.render(percentage)}
            </div>
          </div>
        </div>
        
        <div class="flex flex-col items-end flex-shrink-0" style="display: flex; flex-direction: column; align-items: flex-end;">
          <div class="flex items-baseline gap-1" style="display: flex; align-items: baseline; gap: 4px;">
            <span class="font-bold text-xl md:text-headline-md text-on-surface" style="font-size: 24px; font-weight: 700; color: var(--color-text-primary);">${passengers}</span>
            <span class="text-on-surface-variant text-body-sm" style="font-size: 12px; color: var(--color-text-muted);">/ ${capacity}</span>
          </div>
          <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest" style="font-size: 9px; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.05em; margin-top: 4px;">Passengers</span>
        </div>
      </div>

      <!-- Detailed Crowd / Seats Availability widget -->
      <div class="bg-surface-container rounded-xl p-4 flex items-center justify-between shadow-sm" style="background: var(--color-surface-container); padding: 16px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; margin-top: 12px; border: 1px solid var(--color-border-subtle);">
        <div class="flex items-center gap-3" style="display: flex; align-items: center; gap: 12px;">
          <div class="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm" style="width: 44px; height: 44px; background: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);">
            <span class="material-symbols-outlined text-primary text-[28px]" style="color: var(--color-primary); font-size: 24px;">airline_seat_recline_normal</span>
          </div>
          <div>
            <h4 class="font-title-lg text-title-lg text-on-surface font-semibold" style="font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin:0;">Seat Availability</h4>
            <p class="text-body-sm text-on-secondary-container" style="font-size: 12px; color: var(--color-text-secondary); margin: 4px 0 0 0;">${vacant > 0 ? vacant : 0} seats vacant</p>
          </div>
        </div>
      </div>
    `;
  }
};
