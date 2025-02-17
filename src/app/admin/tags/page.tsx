"use client";
import React, { useEffect, useState } from 'react';
import type { Tag } from '@/app/_types/Tag';

export default function Page() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [newTagName, setNewTagName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTags = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/tags", {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch tags");
                }

                const data = await res.json();
                setTags(data);
            } catch (err) {
                setError('Failed to fetch tags');
            } finally {
                setLoading(false);
            }
        };

        fetchTags();
    }, []);

    const addTag = async (name: string) => {
        try {
            const res = await fetch("/api/admin/tags", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (!res.ok) {
                throw new Error("Failed to add tag");
            }

            const data = await res.json();
            setTags([...tags, data]);
        } catch (err) {
            setError('Failed to add tag');
        }
    }

    const deleteTag = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/tags/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete tag");
            }

            setTags(tags.filter((tag) => tag.id !== id));
        } catch (err) {
            setError('Failed to delete tag');
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">タグ一覧</h1>
            {loading && <p className="text-blue-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-4">
            {tags.map((tag) => (
                <li key={tag.id} className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md">
                <span className="text-lg">{tag.name}</span>
                <div className="flex space-x-2">
                    <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => deleteTag(tag.id)}
                    >
                    削除
                    </button>
                </div>
                </li>
            ))}
            </ul>
            <div className="mt-4">
            <input
                type="text"
                placeholder="新しいタグ名"
                className="px-4 py-2 border rounded mr-2"
                value={newTagName}
                key={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
            />
            <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={() => addTag(newTagName)}
            >
                追加
            </button>
            </div>
        </div>
    );
}