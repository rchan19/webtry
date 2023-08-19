import { FC } from "react";

interface TooltipProps {
  content: string;
  x: number;
  y: number;
}

const DotMapTooltip: FC<TooltipProps> = ({ content, x, y }) => (
  <div
    style={{
      position: "absolute",
      top: `${y}px`,
      left: `${x}px`,
      background: "#1ed760",
      border: "1px solid #1DB954",
      padding: "5px",
      borderRadius: "3px",
      pointerEvents: "none", // So that it doesn't interfere with map interactions.
      transform: "translate(-50%, -100%)", // Center the tooltip and position it above the marker.
      zIndex: 100000, // Adding z-index to ensure it's rendered above other elements
    }}
  >
    {content}
  </div>
);

export default DotMapTooltip;
