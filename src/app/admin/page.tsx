"use client";
import Link from "next/link";

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-12">管理画面</h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Link href="/admin/posts">
                <p className="w-full flex items-center justify-center px-8 py-6 border border-gray-300 text-lg font-semibold rounded-lg text-indigo-600 bg-white shadow-md hover:bg-indigo-50">
                    Posts
                </p>
            </Link>
            <Link href="/admin/threads">
                <p className="w-full flex items-center justify-center px-8 py-6 border border-gray-300 text-lg font-semibold rounded-lg text-indigo-600 bg-white shadow-md hover:bg-indigo-50">
                    Threads
                </p>
            </Link>
            <Link href="/admin/tags">
                <p className="w-full flex items-center justify-center px-8 py-6 border border-gray-300 text-lg font-semibold rounded-lg text-indigo-600 bg-white shadow-md hover:bg-indigo-50">
                    Tags
                </p>
            </Link>
            </div>
        </div>
    );
}