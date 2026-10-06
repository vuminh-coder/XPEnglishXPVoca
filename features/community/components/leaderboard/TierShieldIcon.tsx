import React from "react";

export interface TierShieldIconProps {
  tierId: "bronze" | "silver" | "gold" | "platinum" | "diamond" | string;
  className?: string;
  size?: number;
}

/**
 * Agency-grade vector Shield icons for Season Rank tiers.
 * Replaces mixed OS emojis with unified, pixel-perfect metallic shields.
 */
export const TierShieldIcon: React.FC<TierShieldIconProps> = ({
  tierId,
  className = "w-6 h-6",
  size,
}) => {
  const style = size ? { width: size, height: size } : undefined;

  switch (tierId) {
    case "bronze":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Hạng Đồng"
        >
          {/* Bronze Shield */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            fill="url(#bronze-grad)"
            stroke="#92400e"
            strokeWidth="1.2"
          />
          <path
            d="M12 4.2L5.8 7V11.5C5.8 15.3 8.4 18.9 12 19.8C15.6 18.9 18.2 15.3 18.2 11.5V7L12 4.2Z"
            fill="#b45309"
            fillOpacity="0.15"
          />
          {/* Roman I or Chevron */}
          <path
            d="M12 8.5V15.5M10 8.5H14M10 15.5H14"
            stroke="#78350f"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-amber-200"
          />
          <defs>
            <linearGradient id="bronze-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d97706" />
              <stop offset="1" stopColor="#92400e" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "silver":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Hạng Bạc"
        >
          {/* Silver Shield */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            fill="url(#silver-grad)"
            stroke="#64748b"
            strokeWidth="1.2"
          />
          <path
            d="M12 4.2L5.8 7V11.5C5.8 15.3 8.4 18.9 12 19.8C15.6 18.9 18.2 15.3 18.2 11.5V7L12 4.2Z"
            fill="#ffffff"
            fillOpacity="0.3"
          />
          {/* Roman II */}
          <path
            d="M10.5 9V15M13.5 9V15M9 9H15M9 15H15"
            stroke="#334155"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="dark:stroke-slate-100"
          />
          <defs>
            <linearGradient id="silver-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e2e8f0" />
              <stop offset="0.5" stopColor="#cbd5e1" />
              <stop offset="1" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "gold":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Hạng Vàng"
        >
          {/* Gold Shield */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            fill="url(#gold-grad)"
            stroke="#d97706"
            strokeWidth="1.2"
          />
          <path
            d="M12 4.2L5.8 7V11.5C5.8 15.3 8.4 18.9 12 19.8C15.6 18.9 18.2 15.3 18.2 11.5V7L12 4.2Z"
            fill="#fef3c7"
            fillOpacity="0.3"
          />
          {/* Gold Star */}
          <path
            d="M12 7.8L13.2 10.3L16 10.7L14 12.6L14.5 15.3L12 14L9.5 15.3L10 12.6L8 10.7L10.8 10.3L12 7.8Z"
            fill="#ffffff"
            stroke="#b45309"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="gold-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "platinum":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Hạng Bạch Kim"
        >
          {/* Platinum Shield */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            fill="url(#platinum-grad)"
            stroke="#0284c7"
            strokeWidth="1.2"
          />
          <path
            d="M12 4.2L5.8 7V11.5C5.8 15.3 8.4 18.9 12 19.8C15.6 18.9 18.2 15.3 18.2 11.5V7L12 4.2Z"
            fill="#e0f2fe"
            fillOpacity="0.35"
          />
          {/* Platinum Diamond Core */}
          <path
            d="M12 7.5L15 11.5L12 15.5L9 11.5L12 7.5Z"
            fill="#ffffff"
            stroke="#0369a1"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M9 11.5H15M12 7.5V15.5"
            stroke="#0284c7"
            strokeWidth="0.8"
          />
          <defs>
            <linearGradient id="platinum-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="0.6" stopColor="#0ea5e9" />
              <stop offset="1" stopColor="#0284c7" />
            </linearGradient>
          </defs>
        </svg>
      );

    case "diamond":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          style={style}
          aria-label="Hạng Kim Cương"
        >
          {/* Diamond Royal Shield */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            fill="url(#diamond-grad)"
            stroke="#0059bb"
            strokeWidth="1.2"
          />
          <path
            d="M12 4.2L5.8 7V11.5C5.8 15.3 8.4 18.9 12 19.8C15.6 18.9 18.2 15.3 18.2 11.5V7L12 4.2Z"
            fill="#bfdbfe"
            fillOpacity="0.3"
          />
          {/* Faceted Brilliant Gem */}
          <path
            d="M12 6.8L15.8 9.8L14.3 14.8L9.7 14.8L8.2 9.8L12 6.8Z"
            fill="#ffffff"
            stroke="#1d4ed8"
            strokeWidth="0.9"
            strokeLinejoin="round"
          />
          <path
            d="M12 6.8L12 14.8M8.2 9.8L15.8 9.8M10.2 9.8L9.7 14.8M13.8 9.8L14.3 14.8"
            stroke="#2563eb"
            strokeWidth="0.7"
          />
          <defs>
            <linearGradient id="diamond-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" />
              <stop offset="0.5" stopColor="#0059bb" />
              <stop offset="1" stopColor="#1e3a8a" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
};
