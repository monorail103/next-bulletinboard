"use client";
import type { Post } from "@/app/_types/Post";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { body } from "framer-motion/client";

export default function ThreadPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const { id } = useParams<{ id: string }>();

  // スレッドの投稿を取得する
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
  }, [id]);

  // 投稿を作成する
  const createPost = async (content: string) => {
    try {
      const res = await fetch(`/api/posts/${id}/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content }),
      });

      console.log(JSON.stringify({ content: content }));

      if (!res.ok) {
        throw new Error("Failed to create post");
      }

      const data: Post = await res.json();
      setPosts((prev) => [...prev, data]);
    } catch (e) {
      console.error(e);
    }

    setNewPostContent("");
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">スレッド</h1>
      {posts.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">Now Loading...</div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-700 font-medium">{post.username}</p>
                <span className="text-gray-500 text-sm">{new Date(post.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-gray-800 leading-relaxed">{post.content}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-6">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            createPost(newPostContent);
          }}
        >
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Write your post here..."
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}