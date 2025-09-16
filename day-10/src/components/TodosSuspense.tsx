import { useSuspenseQuery } from '@tanstack/react-query';
import { supabase } from '../config/supabaseClient';
import { useState } from 'react';

type Todo = { id: number; title: string; completed: boolean; category: string };

export default function TodosSuspense() {
    const [apiMode, setApiMode] = useState<'normal' | 'error' | 'slow'>('normal');

    async function fetchTodos(): Promise<Todo[]> {
        let query = supabase.from('todos').select('*').order('id', { ascending: false });

        // Actual error mode - fetch from a non-existing table
        if (apiMode === 'error') {
            query = supabase.from('invalid_table').select('*');
        }

        const { data, error } = await query;

        if (error) throw error;

        // Slow mode - simulate network delay for demo
        if (apiMode === 'slow') {
            await new Promise((res) => setTimeout(res, 2000));
        }

        return data as Todo[];
    }

    const { data: todos } = useSuspenseQuery({
        queryKey: ['todos-suspense', apiMode],
        queryFn: fetchTodos,
    });

    return (
        <div className="card">
            <strong>Todos (Suspense + ErrorBoundary + Reset)</strong>

            <div style={{ margin: '1rem 0' }}>
                <label>
                    Select Demo Mode:{' '}
                    <select value={apiMode} style={{height: '25px'}} onChange={(e) => setApiMode(e.target.value as any)}>
                        <option value="normal">Normal</option>
                        <option value="slow">Loading (Suspense)</option>
                        <option value="error">Error (Fallback + Retry)</option>
                    </select>
                </label>
            </div>

            <ul className="list" style={{ marginTop: '1rem' }}>
                {todos.map((t) => (
                    <li key={t.id}>
                        <span className="dot" /> {t.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
