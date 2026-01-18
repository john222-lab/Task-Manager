"use client"

import React from "react"

import { useState } from "react"
import { Check, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

interface TaskItemProps {
  task: Task
  onUpdate: (id: string, title: string) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskItem({ task, onUpdate, onToggle, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(task.title)

  const handleSave = () => {
    if (editValue.trim()) {
      onUpdate(task.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditValue(task.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      handleCancel()
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 border-b border-border bg-background py-4 transition-all duration-200",
        task.completed && "opacity-60"
      )}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-[18px] w-[18px] rounded border-muted-foreground/50 data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
        aria-label={`Mark "${task.title}" as ${task.completed ? "incomplete" : "complete"}`}
      />

      {isEditing ? (
        <div className="flex flex-1 items-center gap-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-background"
            autoFocus
            aria-label="Edit task title"
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={handleSave}
            className="h-8 w-8 text-primary hover:bg-primary/10"
            aria-label="Save changes"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleCancel}
            className="h-8 w-8 text-muted-foreground hover:bg-muted"
            aria-label="Cancel editing"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <span
            className={cn(
              "flex-1 text-foreground transition-all",
              task.completed && "text-muted-foreground line-through"
            )}
          >
            {task.title}
          </span>

          <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted"
              aria-label={`Edit "${task.title}"`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label={`Delete "${task.title}"`}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
