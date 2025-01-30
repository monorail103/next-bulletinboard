"use client";
import Image from "next/image";
import Link from "next/link";
import type { Thread } from "./_types/Thread";
import { useState, useEffect } from "react";

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");

  useEffect(() => {
    const fetchThreads = async () => {
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

        const data: Thread[] = await res.json();
        setThreads(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchThreads();
  }, []);

  const createThread = async (title: string, content: string) => {
    try {
      const res = await fetch("/api/threads/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ threadTitle: title, postContent: content }),
      });

      if (!res.ok) {
        throw new Error("Failed to create thread");
      }

      const data: Thread = await res.json();
      setThreads((prev) => [...prev, data]);
    } catch (e) {
      console.error(e);
    }
  }

  // スレッドのいいね数を+1する
  const handleLike = async (id: number) => {
    try {
      const res = await fetch(`/api/threads/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to like thread");
      }

      const data: Thread = await res.json();
      setThreads((prev) => prev.map((thread) => {
        if (thread.id === id) {
          return {
            ...thread,
            good: thread.good + 1,
          };
        }
        return thread;
      }));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">掲示板</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {threads.length === 0 ? (
        <div className="text-center text-gray-500">Now Loading...</div>
      ) : (
        threads.map((thread) => (
          <div key={thread.id} className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{thread.title}</h2>
        <button 
          className="text-blue-500 hover:underline"
          onClick={() => window.location.href = `/threads/${thread.id}`}
        >
          View
        </button>
        <div className="mt-4">
          <button 
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
            onClick={() => handleLike(thread.id)}
          >
            いいね
          </button>
        </div>
          </div>
        ))
      )}
      </div>
      <h2 className="text-2xl font-semibold mt-8">スレッドを作成</h2>
      <div className="mt-8">
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
            placeholder="Title"
            className="p-2 border border-gray-200 rounded"
          />
          <textarea
            value={newThreadContent}
            onChange={(e) => setNewThreadContent(e.target.value)}
            placeholder="Content"
            className="p-2 border border-gray-200 rounded" 
          />
          <button 
            type="submit"
            onClick={(e) => createThread(newThreadTitle, newThreadContent)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            スレッドを作成
          </button>
        </form>
      </div>
    </div>
  );
}
