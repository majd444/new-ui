import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface WorkflowStep {
  id: string;
  name: string;
  status: "pending" | "in-progress" | "completed" | "failed";
  startTime?: string;
  endTime?: string;
}

interface WorkflowDetailProps {
  workflow: {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed" | "failed";
    createdAt: string;
    updatedAt: string;
    steps: WorkflowStep[];
  };
}

export function WorkflowDetail({ workflow }: WorkflowDetailProps) {
  const getStatusColor = (status: string) => {
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
          <div>
            <CardTitle className="text-2xl">{workflow.title}</CardTitle>
            <CardDescription className="mt-2">{workflow.description}</CardDescription>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(workflow.status)}`}>
            {workflow.status.replace("-", " ")}
          </span>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <div>Created: {new Date(workflow.createdAt).toLocaleString()}</div>
          <div>Last Updated: {new Date(workflow.updatedAt).toLocaleString()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="steps">
          <TabsList className="mb-4">
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
          </TabsList>
          <TabsContent value="steps">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Step Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Time</TableHead>
                  <TableHead>End Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflow.steps.map((step) => (
                  <TableRow key={step.id}>
                    <TableCell>{step.name}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(step.status)}`}>
                        {step.status.replace("-", " ")}
                      </span>
                    </TableCell>
                    <TableCell>{step.startTime ? new Date(step.startTime).toLocaleString() : "-"}</TableCell>
                    <TableCell>{step.endTime ? new Date(step.endTime).toLocaleString() : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="visualization">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
              <span className="text-gray-400">Workflow Visualization Placeholder</span>
            </div>
          </TabsContent>
          <TabsContent value="logs">
            <div className="bg-gray-900 text-gray-100 p-4 rounded-md font-mono text-sm h-64 overflow-y-auto">
              <div>[2025-05-08 20:15:32] Workflow started</div>
              <div>[2025-05-08 20:15:33] Step 1 started: Data Extraction</div>
              <div>[2025-05-08 20:15:45] Step 1 completed successfully</div>
              <div>[2025-05-08 20:15:46] Step 2 started: Data Transformation</div>
              <div>[2025-05-08 20:16:02] Step 2 completed successfully</div>
              <div>[2025-05-08 20:16:03] Step 3 started: Data Loading</div>
              <div>[2025-05-08 20:16:15] Step 3 completed successfully</div>
              <div>[2025-05-08 20:16:16] Workflow completed successfully</div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
