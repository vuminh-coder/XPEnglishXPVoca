import React from "react";

export interface SeekIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  seconds?: number;
}

/**
 * Precision Rewind 5s Icon with mathematically centered number in SVG coordinate system
 */
export function Rewind5sIcon({ className = "w-5 h-5", seconds = 5, ...props }: SeekIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <text
        x="12"
        y="12.4"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        stroke="none"
        fontSize="8.2"
        fontWeight="900"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
      >
        {seconds}
      </text>
    </svg>
  );
}

/**
 * Precision Forward 5s Icon with mathematically centered number in SVG coordinate system
 */
export function Forward5sIcon({ className = "w-5 h-5", seconds = 5, ...props }: SeekIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.99 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <text
        x="12"
        y="12.4"
        textAnchor="middle"
        dominantBaseline="central"
        fill="currentColor"
        stroke="none"
        fontSize="8.2"
        fontWeight="900"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
      >
        {seconds}
      </text>
    </svg>
  );
}
