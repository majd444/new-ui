"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { MailIcon, CalendarIcon, SearchIcon } from "lucide-react";

interface ToolOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ToolNodeContent() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const toolOptions: ToolOption[] = [
    {
      id: "email",
      icon: <MailIcon className="h-5 w-5 text-red-400" />,
      title: "Access and process emails",
      description: "Read, send, and process email messages",
    },
    {
      id: "calendar",
      icon: <CalendarIcon className="h-5 w-5 text-green-400" />,
      title: "Manage events and schedules",
      description: "Create, update, and delete calendar events",
    },
  ];
  
  const filteredOptions = toolOptions.filter(
    (option) =>
      option.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="p-2 w-full">
      <div className="relative mb-3">
        <SearchIcon className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search tools..."
          className="pl-8 bg-gray-900 text-white border-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {filteredOptions.map((option) => (
          <div
            key={option.id}
            className="flex items-start space-x-3 p-2 rounded hover:bg-gray-800 cursor-pointer"
          >
            <div className="mt-0.5 bg-gray-700 rounded-full p-1.5">
              {option.icon}
            </div>
            <div>
              <div className="text-sm text-gray-200">{option.title}</div>
              <div className="text-xs text-gray-400">{option.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
