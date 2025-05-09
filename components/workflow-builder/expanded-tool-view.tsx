"use client";

import React, { useState } from "react";
import { MailIcon, CalendarIcon, SearchIcon, WrenchIcon, DatabaseIcon } from "lucide-react";

interface ToolOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

interface ExpandedToolViewProps {
  onSelectTool?: (toolId: string) => void;
}

export function ExpandedToolView({ onSelectTool }: ExpandedToolViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const toolOptions: ToolOption[] = [
    {
      id: "email",
      icon: <MailIcon className="h-5 w-5 text-red-500" />,
      title: "Access and process emails",
      description: "Read, send, and process email messages",
      bgColor: "bg-red-100",
    },
    {
      id: "calendar",
      icon: <CalendarIcon className="h-5 w-5 text-green-500" />,
      title: "Manage events and schedules",
      description: "Create, update, and delete calendar events",
      bgColor: "bg-green-100",
    },
    {
      id: "database",
      icon: <DatabaseIcon className="h-5 w-5 text-blue-500" />,
      title: "Database operations",
      description: "Query and update database records",
      bgColor: "bg-blue-100",
    },
  ];
  
  const filteredOptions = toolOptions.filter(
    (option) =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-6 w-full">
      <div className="flex items-center mb-6">
        <div className="bg-purple-100 p-3 rounded-full mr-4">
          <WrenchIcon className="h-7 w-7 text-purple-600" />
        </div>
        <h3 className="text-xl font-medium text-gray-800">Tool</h3>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search tools..."
          className="h-10 w-full rounded-md border border-gray-700 bg-gray-900 text-white pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-4 max-h-72 overflow-y-auto">
        {filteredOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-start p-4 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelectTool && onSelectTool(option.id)}
          >
            <div className={`mt-0.5 ${option.bgColor} rounded-full p-3 mr-4`}>
              {option.icon}
            </div>
            <div>
              <div className="text-base font-medium text-gray-700">{option.title}</div>
              <div className="text-sm text-gray-500">{option.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
