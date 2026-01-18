import { TaskManager } from "@/components/task-manager"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-24">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Tasks
          </h1>
          <p className="mt-3 text-muted-foreground">
            Manage your work efficiently
          </p>
        </header>

        <TaskManager />

        <footer className="mt-20 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>Tasks are stored in this session only</p>
        </footer>
      </div>
    </main>
  )
}
