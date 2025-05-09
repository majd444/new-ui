"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ZapIcon, MailIcon, WrenchIcon } from "lucide-react";
import { Node } from "./workflow-canvas";
import { ExpandedToolView } from "./expanded-tool-view";
import { OAuthButton } from "./oauth-button";

interface WorkflowNodeProps {
  node: Node;
  onDragStart: (e: React.MouseEvent) => void;
  onStartConnection: () => void;
  onCompleteConnection: () => void;
  isConnecting: boolean;
  isConnectionTarget: boolean;
}

export function WorkflowNode({
  node,
  onDragStart,
  onStartConnection,
  onCompleteConnection,
  isConnecting,
  isConnectionTarget,
}: WorkflowNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const { type, position, title } = node;

  const getNodeStyles = () => {
    const baseStyles = "absolute cursor-move select-none rounded-md";
    
    switch (type) {
      case "starter":
        return `${baseStyles} border-2 border-green-600 bg-gray-50`;
      case "prompt":
        return `${baseStyles} border-2 border-blue-600 bg-gray-50`;
      case "tool":
        return `${baseStyles} border-2 border-purple-600 bg-gray-50`;
      default:
        return baseStyles;
    }
  };

  const getNodeIcon = () => {
    switch (type) {
      case "starter":
        return <ZapIcon className="h-5 w-5 text-green-600" />;
      case "prompt":
        return <MailIcon className="h-5 w-5 text-blue-600" />;
      case "tool":
        return <WrenchIcon className="h-5 w-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const handleConnectionPointClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isConnecting && isConnectionTarget) {
      onCompleteConnection();
    } else {
      onStartConnection();
    }
  };

  const handleNodeClick = (e: React.MouseEvent) => {
    if (type === 'tool') {
      e.stopPropagation();
      setIsExpanded(!isExpanded);
    }
  };

  const handleSelectTool = (toolId: string) => {
    setSelectedTool(toolId);
    setIsExpanded(false);
  };

  return (
    <Card
      className={getNodeStyles()}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: isExpanded && type === "tool" ? "450px" : "250px",
        zIndex: 10,
      }}
      onMouseDown={onDragStart}
      onClick={handleNodeClick}
    >
      {isExpanded && type === "tool" ? (
        <div className="w-[450px]">
          <ExpandedToolView onSelectTool={handleSelectTool} />
          
          {/* Connection points */}
          <div
            className={`absolute w-4 h-4 rounded-full -right-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-purple-600 ${isConnecting && isConnectionTarget ? "ring-2 ring-offset-2 ring-blue-400" : ""}`}
            onClick={handleConnectionPointClick}
          />
          
          <div
            className={`absolute w-4 h-4 rounded-full -left-2 top-1/2 transform -translate-y-1/2 cursor-pointer bg-purple-600 ${isConnecting && isConnectionTarget ? "ring-2 ring-offset-2 ring-blue-400" : ""}`}
            onClick={handleConnectionPointClick}
          />
        </div>
      ) : (
        <div>
          <CardContent className="p-4 flex items-center space-x-2">
            {getNodeIcon()}
            <span className="font-medium text-gray-800">{selectedTool && type === "tool" ? 
              (selectedTool === "email" ? "Access and process emails" : 
               selectedTool === "calendar" ? "Manage events and schedules" : 
               selectedTool === "database" ? "Database operations" : title) : 
              title}
            </span>
            
            {/* Connection points */}
            <div
              className={`absolute w-4 h-4 rounded-full -right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                type === "starter" ? "bg-green-600" : type === "prompt" ? "bg-blue-600" : "bg-purple-600"
              } ${isConnecting && isConnectionTarget ? "ring-2 ring-offset-2 ring-blue-400" : ""}`}
              onClick={handleConnectionPointClick}
            />
            
            <div
              className={`absolute w-4 h-4 rounded-full -left-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
                type === "starter" ? "bg-green-600" : type === "prompt" ? "bg-blue-600" : "bg-purple-600"
              } ${isConnecting && isConnectionTarget ? "ring-2 ring-offset-2 ring-blue-400" : ""}`}
              onClick={handleConnectionPointClick}
            />
          </CardContent>
          
          {/* Show OAuth button if a tool is selected */}
          {selectedTool && type === "tool" && (
            <div className="px-4 pb-3">
              <OAuthButton toolType={selectedTool} />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
