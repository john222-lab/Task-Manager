"use client"

import { TaskItem, type Task } from "./task-item"
import { ClipboardList } from "lucide-react"

interface TaskListProps {
  tasks: Task[]
  onUpdate: (id: string, title: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, onUpdate, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-4 rounded-full bg-muted p-4">
          <ClipboardList className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">No tasks yet</h3>
        <p className="mt-1 text-muted-foreground">
          Add your first task to get started
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
