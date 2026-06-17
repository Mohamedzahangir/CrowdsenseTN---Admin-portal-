// RouteCard.js - Reusable Route/Bus Card component (Matches Customer BusCard.js exactly)
import { StatusBadge } from './StatusBadge';
import { ETAComponent } from './ETAComponent';

export const RouteCard = {
  getBadgeColors(bus) {
    if (bus.type === "Express") {
      return "background: var(--color-primary); color: white;";
    } else if (bus.type === "Local") {
      return "background: rgba(115, 118, 134, 0.2); color: var(--color-text-primary);";
    } else if (bus.type === "Fast") {
      return "background: rgba(0, 87, 184, 0.8); color: white;";
    } else {
      return "background: var(--color-surface-container-high); color: var(--color-primary);";
    }
  },

  render(bus, trackingState, occupancyState) {
    const bgStyle = this.getBadgeColors(bus);
    const eta = trackingState ? trackingState.eta : 10;
    const currentStop = trackingState ? trackingState.currentStop : bus.stops[0].name;
    const percentage = occupancyState ? occupancyState.percentage : 30;
    
    return `
      <div data-bus-id="${bus.id}" class="bus-card-item glass-card p-3.5 md:p-4 rounded-xl flex items-center gap-3 md:gap-4 transition-all hover:bg-white/90 active:scale-[0.99] cursor-pointer group relative overflow-hidden" style="background: rgba(255,255,255,0.75); border: 1px solid var(--color-border-subtle); border-radius: 12px; padding: 16px; display: flex; align-items: center; gap: 16px; transition: all 0.2s; box-shadow: var(--shadow-sm); cursor: pointer;">
        <!-- Route Badge -->
        <div class="w-12 h-12 md:w-14 md:h-14 rounded-lg flex flex-col items-center justify-center flex-shrink-0 font-sans" style="${bgStyle} width: 52px; height: 52px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">
          <span class="text-lg md:text-xl font-bold leading-tight" style="font-size: 18px; font-weight: 700; line-height: 1.1;">${bus.id}</span>
          <span class="text-[8px] md:text-[9px] font-semibold uppercase tracking-tighter" style="font-size: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">${bus.type}</span>
        </div>
        
        <!-- Details Content -->
        <div class="flex-1 min-w-0" style="flex: 1; min-width: 0;">
          <div class="flex justify-between items-start mb-1 gap-2" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
            <h3 class="text-base md:text-title-lg truncate pr-1 font-semibold text-on-surface" style="font-size: 15px; font-weight: 600; margin:0; color: var(--color-text-primary); text-overflow: ellipsis; white-space: nowrap; overflow: hidden; max-width: 140px;">${bus.name}</h3>
            ${ETAComponent.render(eta)}
          </div>
          
          <div class="flex items-center gap-1.5 mb-2" style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
            <span class="material-symbols-outlined text-outline text-sm md:text-base" style="font-size: 16px; color: var(--color-text-muted);">location_on</span>
            <p class="font-body-sm text-xs md:text-body-sm text-on-surface-variant truncate" style="font-size: 12px; color: var(--color-text-secondary); margin:0; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Currently at ${currentStop}</p>
          </div>
          
          <div class="flex items-center justify-between gap-2" style="display: flex; align-items: center; justify-content: space-between;">
            <div class="flex flex-wrap items-center gap-1.5 md:gap-3" style="display: flex; align-items: center; gap: 8px;">
              ${StatusBadge.render(percentage)}
              <span class="font-body-sm text-xs md:text-body-sm text-on-surface-variant flex items-center gap-1" style="font-size: 11px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined text-sm md:text-base" style="font-size: 14px;">meeting_room</span>
                ${bus.platform || 'P1'}
              </span>
            </div>
            
            <div class="flex -space-x-1 opacity-70 flex-shrink-0" style="display: flex; opacity: 0.7; gap: 2px;">
              <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]" style="font-size: 16px; color: var(--color-text-muted);">wifi</span>
              <span class="material-symbols-outlined text-outline text-[16px] md:text-[18px]" style="font-size: 16px; color: var(--color-text-muted);">ac_unit</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
};
