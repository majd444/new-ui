import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface WorkflowCardProps {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  onView: () => void;
  onEdit: () => void;
}

export function WorkflowCard({ title, description, status, onView, onEdit }: WorkflowCardProps) {
  const getStatusColor = () => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status.replace("-", " ")}
          </span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-24 flex items-center justify-center bg-gray-50 rounded-md">
          <span className="text-gray-400">Workflow Visualization</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onView}>View Details</Button>
        <Button onClick={onEdit}>Edit Workflow</Button>
      </CardFooter>
    </Card>
  );
}
