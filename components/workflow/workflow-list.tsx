import React from "react";
import { WorkflowCard } from "./workflow-card";

interface Workflow {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed" | "failed";
}

interface WorkflowListProps {
  workflows: Workflow[];
  onViewWorkflow: (id: string) => void;
  onEditWorkflow: (id: string) => void;
}

export function WorkflowList({ workflows, onViewWorkflow, onEditWorkflow }: WorkflowListProps) {
  if (workflows.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <h3 className="text-lg font-medium text-gray-500">No workflows found</h3>
        <p className="text-sm text-gray-400 mt-1">Create a new workflow to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          title={workflow.title}
          description={workflow.description}
          status={workflow.status}
          onView={() => onViewWorkflow(workflow.id)}
          onEdit={() => onEditWorkflow(workflow.id)}
        />
      ))}
    </div>
  );
}
