// ETAComponent.js - Reusable transit ETA component (Matches Customer Portal style)

export const ETAComponent = {
  render(etaMinutes) {
    const formattedMinutes = etaMinutes || 0;
    return `
      <div class="text-right flex flex-col items-end flex-shrink-0" style="text-align: right; display: flex; flex-direction: column; align-items: flex-end;">
        <span class="font-bold text-primary text-base md:text-lg leading-none" style="font-weight: 700; color: var(--color-primary); font-size: 16px; line-height: 1;">${formattedMinutes} min</span>
        <span class="text-[9px] md:text-[10px] text-outline uppercase font-semibold mt-1" style="font-size: 9px; color: var(--color-text-muted); font-weight: 600; text-transform: uppercase; margin-top: 4px;">ETA</span>
      </div>
    `;
  }
};
