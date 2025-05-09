"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ZapIcon, MailIcon, WrenchIcon } from "lucide-react";
import { NodeType } from "./workflow-canvas";

interface SidebarProps {
  onAddNode: (type: NodeType) => void;
}

export function Sidebar({ onAddNode }: SidebarProps) {
  return (
    <div className="w-32 bg-white border-r border-gray-200 flex flex-col">
      <div className="py-4 px-2">
        <div className="flex flex-col items-center mb-6">
          <Button
            variant="ghost"
            className="w-full justify-start mb-1 hover:bg-gray-100"
            onClick={() => onAddNode("starter")}
          >
            <ZapIcon className="mr-2 h-5 w-5 text-green-600" />
            <span className="text-sm text-gray-800">Starter</span>
          </Button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <Button
            variant="ghost"
            className="w-full justify-start mb-1 hover:bg-gray-100"
            onClick={() => onAddNode("prompt")}
          >
            <MailIcon className="mr-2 h-5 w-5 text-blue-600" />
            <span className="text-sm text-gray-800">Prompt</span>
          </Button>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <Button
            variant="ghost"
            className="w-full justify-start mb-1 hover:bg-gray-100"
            onClick={() => onAddNode("tool")}
          >
            <WrenchIcon className="mr-2 h-5 w-5 text-purple-600" />
            <span className="text-sm text-gray-800">Tool</span>
          </Button>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="p-2 text-xs text-gray-500 text-center">
          Quick Add:
        </div>
        <div className="p-2 flex flex-col space-y-2 border-t border-gray-200">
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 bg-black/5 hover:bg-black/10"
            onClick={() => onAddNode("starter")}
          >
            <ZapIcon className="h-5 w-5 text-green-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 bg-black/5 hover:bg-black/10"
            onClick={() => onAddNode("prompt")}
          >
            <MailIcon className="h-5 w-5 text-blue-600" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="flex-1 bg-black/5 hover:bg-black/10"
            onClick={() => onAddNode("tool")}
          >
            <WrenchIcon className="h-5 w-5 text-purple-600" />
          </Button>
        </div>
      </div>
    </div>
  );
}
