"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, CheckIcon } from "lucide-react";

interface OAuthButtonProps {
  toolType: string;
  onAuthorize?: () => void;
}

export function OAuthButton({ toolType, onAuthorize }: OAuthButtonProps) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  const handleAuthorize = () => {
    // Simulate OAuth flow
    setIsAuthorized(true);
    if (onAuthorize) {
      onAuthorize();
    }
  };
  
  const getServiceName = () => {
    switch (toolType) {
      case "email":
        return "Gmail";
      case "calendar":
        return "Google Calendar";
      case "database":
        return "Database";
      default:
        return "Service";
    }
  };
  
  return (
    <div className="mt-2 mb-2">
      {isAuthorized ? (
        <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded-md">
          <CheckIcon className="h-4 w-4 text-green-600 mr-2" />
          <span className="text-sm text-green-700">Connected to {getServiceName()}</span>
        </div>
      ) : (
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full border-purple-300 hover:bg-purple-50 hover:text-purple-700"
          onClick={handleAuthorize}
        >
          <LockIcon className="h-4 w-4 mr-2" />
          <span>Authorize {getServiceName()}</span>
        </Button>
      )}
    </div>
  );
}
