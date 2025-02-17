"use client";
import type { Thread } from "./_types/Thread";
import type { Tag } from "./_types/Tag";
import { useState, useEffect } from "react";

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

    const fetchTags = async () => {
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

        const data: Tag[] = await res.json();
        setTags(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchThreads();
    fetchTags();

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
    } catch (e) {
      console.error(e);
    }
    // クライアント側でいいね数を更新する
    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === id) {
          return { ...thread, good: thread.good + 1 };
        }
        return thread;
      })
    );
  }

  const handleTagSelection = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((id) => id !== tagId) : [...prev, tagId]
    );
  };

  const filteredThreads = threads.filter((thread) =>
    selectedTags.length === 0 || thread.tags.some((tag) => selectedTags.includes(tag.id.toString()))
  );

  return (

    <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="flex flex-wrap mb-4">
        {tags.map((tag) => (
          <button
            key={tag.id}
            className={`p-2 m-1 rounded-full ${selectedTags.includes(tag.id.toString()) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => handleTagSelection(tag.id.toString())}
          >
            {tag.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {threads.length === 0 ? (
          <div className="text-center text-gray-500 animate-pulse">
            Now Loading...
          </div>
        ) : (
          filteredThreads && filteredThreads.length > 0 ? (
            filteredThreads.map((thread) => (
              <div key={thread.id} className="bg-white shadow-xl rounded-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">{thread.title}</h2>
          <div className="flex flex-wrap mb-4">
            {thread.tags && thread.tags.map((tag) => (
              <span key={tag.id} className="bg-blue-100 text-blue-600 text-sm p-1 rounded-full mr-2 mb-2">{tag.name}</span>
            ))}
            {thread.tags.length === 0 && (
              <span className="bg-gray-200 text-gray-600 text-sm p-1 rounded-full mr-2 mb-2">タグなし</span>
            )}
          </div>
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-full hover:from-blue-600 hover:to-purple-600 flex items-center justify-center mb-4"
            onClick={() => window.location.href = `/threads/${thread.id}`}
          >
            スレッドを開く
          </button>
          <div className="mt-4 flex justify-between items-center">
            <button
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-2 rounded-full hover:from-green-600 hover:to-teal-600 flex items-center"
              onClick={() => handleLike(thread.id)}
            >
              いいね
              <span className="ml-2">{thread.good}</span>
            </button>
            <span className="text-gray-500 text-sm">{new Date(thread.createdAt).toLocaleDateString()}</span>
          </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              該当するコンテンツがありません
            </div>
          )
        )}
      </div>
      <h2 className="text-2xl font-semibold mt-8 flex items-center">
        スレッドを作成
      </h2>
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <form 
          className="flex flex-col space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h3 className="text-lg font-semibold mb-2 text-blue-500 font-serif">タイトル</h3>
          <input
            type="text"
            value={newThreadTitle}
            onChange={(e) => setNewThreadTitle(e.target.value)}
            placeholder="Title"
            className="p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h3 className="text-lg font-semibold mb-2 text-blue-500 font-serif">本文</h3>
          <textarea
            value={newThreadContent}
            onChange={(e) => setNewThreadContent(e.target.value)}
            placeholder="Content"
            className="p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <h3 className="text-lg font-semibold mb-2 text-blue-500 font-serif">タグ</h3>
          <div className="flex flex-wrap">
          {tags.map((tag) => (
            <label key={tag.id} className="flex items-center mr-4 mb-2">
            <input
              type="checkbox"
              value={tag.id}
              className="mr-2"
              key={tag.id}
            />
            {tag.name}
            </label>
          ))}
          </div>
          <button
            type="submit"
            onClick={() => createThread(newThreadTitle, newThreadContent)}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex items-center justify-center"
          >
            スレッドを作成
          </button>
        </form>
      </div>
    </div>
  );
}
