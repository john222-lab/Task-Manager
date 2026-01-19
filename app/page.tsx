'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function TaskApp() {
  // ✅ Initialize ONLY when component mounts (in browser)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [tasks, setTasks] = useState<any[]>([]);
  const [newTask, setNewTask] = useState('');

  async function fetchTasks() {
    const { data, error } = await supabase.from('tasks').select('*');
    if (error) console.error('Fetch error:', error);
    else setTasks(data || []);
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function addTask() {
    if (!newTask.trim()) return;
    const { error } = await supabase.from('tasks').insert({ name: newTask });
    if (error) console.error('Add error:', error);
    else {
      setNewTask('');
      fetchTasks();
    }
  }

  async function deleteTask(id: number) {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) console.error('Delete error:', error);
    else fetchTasks();
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Task App</h1>
      
      <div className="flex gap-2 mb-4">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className="border px-3 py-2 flex-1 rounded"
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between items-center border p-3 rounded">
            {task.name}
            <button 
              onClick={() => deleteTask(task.id)}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
