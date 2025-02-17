"use client";
import { useState, useEffect } from "react";

// Aboutページのコンポーネント
export default function Home() {

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10 rounded-lg shadow-lg text-white">
        <h1 className="text-5xl font-extrabold mb-6">About</h1>
        <p className="text-lg mb-4">この掲示板アプリは、Next.jsとSupabaseを使用して作成されています。</p>
    </div>
  );
}
