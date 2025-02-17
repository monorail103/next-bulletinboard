"use client";
import React, { useEffect, useState } from 'react';
import type { Thread } from '@/app/_types/Thread';

const AdminThreadsPage = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchThreads = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/threads", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch threads");
                }

                const data = await res.json();
                setThreads(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchThreads();
    }, []);

    const deleteThread = async (id: string) => {
        const confirmed = window.confirm("関連する書き込みも削除されます。本当によろしいですか？");
        if (!confirmed) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/threads/${id}`, {
                method: 'DELETE',
            });
            
            if(!res.ok) {
                throw new Error('Failed to delete thread');
            }
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Admin Threads Page
            </h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul className="space-y-4">
                {threads.map(thread => (
                    <li key={thread.id} className="bg-white shadow-md rounded-lg p-6">
                        <div className="text-gray-800 mb-8">{thread.title}</div>
                        <button
                            onClick={() => deleteThread(thread.id.toString())}
                            disabled={loading}
                            className={`px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-700'} text-white font-semibold`}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => window.location.href = `/threads/${thread.id}`}
                            className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 text-white font-semibold ml-2"
                        >
                            Access
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminThreadsPage;