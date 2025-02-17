"use client";
import React, { useEffect, useState } from 'react';
import type { Post } from '@/app/_types/Post';
import { Thread } from '@/app/_types/Thread';

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                // IP込みでのPostをfetch
                const res = await fetch("/api/admin/posts", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch posts");
                }

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError('Failed to fetch posts');
            } finally {
                setLoading(false);
            }
        };

        // スレッドをすべて取得する
        const fetchThreadList = async () => {
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
                setError('Failed to fetch threads');
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
        fetchThreadList();
    }, []);

    const deletePost = async (id: number) => {
        const confirmed = window.confirm("本当によろしいですか？");
        if (!confirmed) {
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/posts/${id}`, {
                method: 'DELETE',
            });
            
            if(!res.ok) {
                throw new Error('Failed to delete post');
            }
        } catch (err) {
            setError('Failed to delete post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Admin Posts Page</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {threads.map((thread) => (
            <div key={thread.id} className="w-full max-w-2xl mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">{thread.title}</h2>
                <ul className="space-y-4">
                    {posts.filter(post => post.ThreadId === thread.id.toString()).map((post) => (
                        <li key={post.id} className="bg-white shadow-md rounded-lg p-6">
                            <div className="text-gray-600 mb-2">IP Address: {post.ipaddress}</div>
                            <div className="text-gray-800 mb-4">{post.content}</div>
                            <div className="flex justify-end">
                                <button 
                                    onClick={() => deletePost(post.id)} 
                                    disabled={loading} 
                                    className={`px-4 py-2 rounded ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-700'} text-white font-semibold`}
                                >
                                    {loading ? 'Deleting...' : 'Delete'}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        ))}
        </div>
    );
}