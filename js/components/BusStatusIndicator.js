// BusStatusIndicator.js - Reusable status indicators: Live pulse, speed, and stops updates (Matches Customer style)

export const BusStatusIndicator = {
  renderLiveBadge() {
    return `
      <span class="text-on-surface-variant font-label-caps text-label-caps tracking-widest px-2.5 py-0.5 bg-surface-container rounded-md flex items-center gap-1 font-bold" style="display: inline-flex; align-items: center; gap: 4px; background: var(--color-surface-container); color: var(--color-text-secondary); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 2px 8px; border-radius: 4px;">
        <span class="w-1.5 h-1.5 rounded-full bg-primary animate-ping" style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-primary); display: inline-block;" class="pulse-live"></span>
        LIVE
      </span>
    `;
  },

  renderSpeed(speed) {
    const spd = speed !== undefined ? speed : "--";
    return `
      <div class="flex flex-col" style="display: flex; flex-direction: column;">
        <span class="text-label-caps font-label-caps text-on-secondary-container mb-1" style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 4px;">CURRENT SPEED</span>
        <div class="flex items-baseline gap-1" style="display: flex; align-items: baseline; gap: 4px;">
          <span class="text-2xl md:text-headline-md text-primary font-bold" style="font-size: 24px; color: var(--color-primary); font-weight: 700;">${spd}</span>
          <span class="text-body-sm text-on-surface-variant" style="font-size: 12px; color: var(--color-text-secondary);">km/h</span>
        </div>
      </div>
    `;
  },

  renderLastStop(lastStopName) {
    const stop = lastStopName || "--";
    return `
      <div class="flex flex-col" style="display: flex; flex-direction: column;">
        <span class="text-label-caps font-label-caps text-on-secondary-container mb-1" style="font-size: 10px; font-weight: 700; text-transform: uppercase; color: var(--color-text-secondary); margin-bottom: 4px;">LAST STOP</span>
        <span class="text-base md:text-title-lg text-on-surface truncate font-semibold" style="font-size: 16px; color: var(--color-text-primary); font-weight: 600; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">${stop}</span>
      </div>
    `;
  }
};
