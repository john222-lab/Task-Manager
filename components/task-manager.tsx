"use client"

import { useState } from "react"
import { AddTaskForm } from "./add-task-form"
import { TaskList } from "./task-list"
import { TaskFilters, type FilterType } from "./task-filters"
import type { Task } from "./task-item"

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Review quarterly report",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Schedule team meeting",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Update project documentation",
      completed: true,
      createdAt: new Date(),
    },
  ])
  const [filter, setFilter] = useState<FilterType>("all")

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  const updateTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    )
  }

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed))
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed
    if (filter === "completed") return task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  return (
    <div className="space-y-6">
      <AddTaskForm onAdd={addTask} />

      <TaskFilters
        filter={filter}
        onFilterChange={setFilter}
        stats={stats}
        onClearCompleted={clearCompleted}
      />

      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onToggle={toggleTask}
        onDelete={deleteTask}
      />
    </div>
  )
}
