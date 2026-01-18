"use client"

import React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AddTaskFormProps {
  onAdd: (title: string) => void
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAdd(title.trim())
      setTitle("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 h-11 bg-card border-border text-sm placeholder:text-muted-foreground focus-visible:ring-foreground"
        aria-label="New task title"
      />
      <Button
        type="submit"
        disabled={!title.trim()}
        className="h-11 px-5 bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm font-medium"
      >
        <Plus className="h-4 w-4 mr-1.5" />
        Add
      </Button>
    </form>
  )
}
