'use client';

import { createClient } from '@supabase/supabase-js';
import { useState } from 'react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AIFormBuilder() {
  const [prompt, setPrompt] = useState('');
  const [fields, setFields] = useState<{ name: string; type: string }[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function generateForm() {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setFields(data.fields || []);
      setFormData({});
    } catch (err) {
      alert('Failed to generate form');
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('submissions').insert({
        form_type: prompt,
        data: formData,
      });
      if (error) throw error;
      alert('Form submitted successfully!');
      setFormData({});
    } catch (err) {
      alert('Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">AI Form Builder</h1>
        
        <div className="mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the form you need (e.g., 'contact form with name, email, and message')"
            className="w-full p-3 border rounded-lg mb-3"
            rows={3}
          />
          <button
            onClick={generateForm}
            disabled={isGenerating}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : 'Generate Form'}
          </button>
        </div>

        {fields.length > 0 && (
          <form onSubmit={handleSubmit} className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Your Form:</h2>
            {fields.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="block mb-1 capitalize">{field.name}</label>
                <input
                  type={field.type === 'email' ? 'email' : 'text'}
                  value={formData[field.name] || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
