"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, MaximizeIcon, PlayIcon, SaveIcon, UploadIcon } from "lucide-react";
import { WorkflowNode } from "./workflow-node";
import { NodeConnection } from "./node-connection";
import { Sidebar } from "./sidebar";

export type NodeType = "starter" | "prompt" | "tool";

export interface Node {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  title: string;
  connections: string[];
}

export function WorkflowCanvas() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "node-1",
      type: "starter",
      position: { x: 450, y: 166 },
      title: "Conversation Starter",
      connections: ["node-2", "node-3"],
    },
    {
      id: "node-2",
      type: "prompt",
      position: { x: 800, y: 166 },
      title: "Prompt",
      connections: [],
    },
    {
      id: "node-3",
      type: "tool",
      position: { x: 650, y: 360 },
      title: "Tool",
      connections: [],
    },
  ]);

  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeDragStart = (nodeId: string, e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - node.position.x * zoom;
    const offsetY = e.clientY - rect.top - node.position.y * zoom;
    
    setDraggedNodeId(nodeId);
    setDragOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedNodeId || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - dragOffset.x) / zoom;
    const y = (e.clientY - rect.top - dragOffset.y) / zoom;
    
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === draggedNodeId
          ? { ...node, position: { x, y } }
          : node
      )
    );
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNodeId(null);
  };

  const handleStartConnection = (nodeId: string) => {
    setIsConnecting(true);
    setConnectingFrom(nodeId);
  };

  const handleCompleteConnection = (toNodeId: string) => {
    if (isConnecting && connectingFrom && connectingFrom !== toNodeId) {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === connectingFrom
            ? {
                ...node,
                connections: [...node.connections, toNodeId],
              }
            : node
        )
      );
      setIsConnecting(false);
      setConnectingFrom(null);
    }
  };

  const handleCancelConnection = () => {
    setIsConnecting(false);
    setConnectingFrom(null);
  };

  const handleAddNode = (type: NodeType) => {
    const id = `node-${nodes.length + 1}`;
    const newNode: Node = {
      id,
      type,
      position: { x: 400, y: 300 },
      title: type === "starter" ? "Conversation Starter" : type === "prompt" ? "Prompt" : "Tool",
      connections: [],
    };
    
    setNodes([...nodes, newNode]);
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onAddNode={handleAddNode} />
      
      <div className="flex-1 flex flex-col">
        <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">Workflow Builder</h1>
            
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 ml-4">
              <span className="mr-2">Start</span> ↓
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <PlayIcon className="mr-2 h-4 w-4" /> Test
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <SaveIcon className="mr-2 h-4 w-4" /> Save
            </Button>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <UploadIcon className="mr-2 h-4 w-4" /> Load
            </Button>
          </div>
        </div>
        
        <div className="flex-1 relative overflow-hidden">
          <div className="absolute top-4 right-4 flex flex-col space-y-1 z-10">
            <Button size="icon" variant="outline" className="bg-white shadow-sm" onClick={handleZoomIn}>
              <PlusIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white shadow-sm" onClick={handleZoomOut}>
              <MinusIcon className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="outline" className="bg-white shadow-sm" onClick={handleReset}>
              <MaximizeIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <div
            ref={canvasRef}
            className="w-full h-full bg-white relative overflow-hidden"
            style={{
              backgroundImage: "radial-gradient(circle, #ddd 1px, transparent 1px)",
              backgroundSize: `${20 * zoom}px ${20 * zoom}px`,
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={() => handleCancelConnection()}
          >
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: "0 0",
              }}
            >
              {/* Render connections */}
              {nodes.map((node) =>
                node.connections.map((targetId) => {
                  const targetNode = nodes.find((n) => n.id === targetId);
                  if (!targetNode) return null;
                  
                  return (
                    <NodeConnection
                      key={`${node.id}-${targetId}`}
                      sourcePosition={node.position}
                      targetPosition={targetNode.position}
                      sourceType={node.type}
                      targetType={targetNode.type}
                    />
                  );
                })
              )}
              
              {/* Render nodes */}
              {nodes.map((node) => (
                <WorkflowNode
                  key={node.id}
                  node={node}
                  onDragStart={(e) => handleNodeDragStart(node.id, e)}
                  onStartConnection={() => handleStartConnection(node.id)}
                  onCompleteConnection={() => handleCompleteConnection(node.id)}
                  isConnecting={isConnecting}
                  isConnectionTarget={isConnecting && connectingFrom !== node.id}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
