"use client";

import React from "react";
import { NodeType } from "./workflow-canvas";

interface NodeConnectionProps {
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  sourceType: NodeType;
  targetType: NodeType; // Keeping in interface but not using in implementation
}

export function NodeConnection({
  sourcePosition,
  targetPosition,
  sourceType,
  targetType // Not using this parameter but keeping it in the interface
}: NodeConnectionProps) {
  // Calculate the path for the curved line
  const sourceX = sourcePosition.x + 250; // Add node width
  const sourceY = sourcePosition.y + 28; // Add half of node height
  const targetX = targetPosition.x;
  const targetY = targetPosition.y + 28; // Add half of node height
  
  // Control points for the bezier curve
  const controlPointX1 = sourceX + 50;
  const controlPointX2 = targetX - 50;
  
  // Path for the bezier curve
  const path = `M ${sourceX} ${sourceY} C ${controlPointX1} ${sourceY}, ${controlPointX2} ${targetY}, ${targetX} ${targetY}`;
  
  // Get color based on node types
  const getColor = () => {
    if (sourceType === "starter") return "#16a34a"; // green-600
    if (sourceType === "prompt") return "#2563eb"; // blue-600
    return "#9333ea"; // purple-600
  };

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={getColor()} />
        </marker>
      </defs>
      <path
        d={path}
        stroke={getColor()}
        strokeWidth="2"
        fill="none"
        strokeDasharray="5,5"
        markerEnd="url(#arrowhead)"
        opacity="0.8"
      />
    </svg>
  );
}
