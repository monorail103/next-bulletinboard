"use client";
import Image from "next/image";
import Link from "next/link";
import type { Thread } from "./_types/Thread";
import { useState, useEffect } from "react";

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);

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
            <Link href={`/threads/${thread.id}`} className="text-blue-500 hover:underline">
        View Thread
            </Link>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
