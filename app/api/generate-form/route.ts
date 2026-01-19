import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          {
            role: 'system',
            content:
              'You are a form generator. Output ONLY a JSON array like [{"name":"email","type":"email"}]. No markdown, no explanation.',
          },
          { role: 'user', content: `Create fields for: ${prompt}` },
        ],
      }),
    });

    const data = await response.json();
    let content = data.choices[0].message.content.trim();

    // Clean up markdown if present
    content = content.replace(/```json|```/g, '').trim();

    const fields = JSON.parse(content);
    return Response.json({ fields });
  } catch (error) {
    console.error('AI Error:', error);
    return Response.json(
      { fields: [{ name: 'response', type: 'text' }] },
      { status: 200 }
    );
  }
}
