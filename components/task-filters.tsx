"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type FilterType = "all" | "active" | "completed"

interface TaskFiltersProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  stats: {
    total: number
    active: number
    completed: number
  }
  onClearCompleted: () => void
}

export function TaskFilters({
  filter,
  onFilterChange,
  stats,
  onClearCompleted,
}: TaskFiltersProps) {
  const filters: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "All", count: stats.total },
    { value: "active", label: "Active", count: stats.active },
    { value: "completed", label: "Completed", count: stats.completed },
  ]

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-4 mb-2">
      <div className="flex items-center gap-1">
        {filters.map((f) => (
          <Button
            key={f.value}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "rounded px-3 py-1.5 text-sm font-medium transition-all",
              filter === f.value
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {f.label}
            <span
              className={cn(
                "ml-1.5 text-xs",
                filter === f.value
                  ? "text-background/70"
                  : "text-muted-foreground"
              )}
            >
              {f.count}
            </span>
          </Button>
        ))}
      </div>

      {stats.completed > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearCompleted}
          className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
        >
          Clear completed
        </Button>
      )}
    </div>
  )
}
