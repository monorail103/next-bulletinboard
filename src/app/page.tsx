import Image from "next/image";
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
    <div>
      <h1>掲示板</h1>
      {threads.map((thread) => (
        <div key={thread.id}>
          <h2>{thread.title}</h2>

        </div>
      ))}
          

    </div>
  );
}
