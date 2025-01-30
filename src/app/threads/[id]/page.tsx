"use client";
import type { Post } from "@/app/_types/Post";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ThreadPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data: Post[] = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-5 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl text-center text-gray-800 mb-8">スレッド</h1>
      {posts.length === 0 ? (
        <div className="text-center text-gray-500">Now Loading...</div>
      ) :
      posts.map((post) => (
      <div key={post.id} className="bg-white rounded-lg p-5 mb-5 shadow-md transition-transform transform hover:-translate-y-1">
        <h2 className="text-2xl text-blue-500 mb-3">{post.title}</h2>
        <p className="text-gray-700">投稿者: {post.username}</p>
        <p className="text-gray-700">投稿日: {new Date(post.createdAt).toLocaleString()}</p>
        <p className="text-gray-700">{post.content}</p>
      </div>
      ))}
    </div>
  );
}