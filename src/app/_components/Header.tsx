"use client";
import React from 'react';
import Link from 'next/link';
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();
  const { isLoading, session } = useAuth();
  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white no-underline hover:underline">
          <h1 className="text-2xl font-bold">Bulletin Board</h1>
        </Link>
        <nav>
          <ul className="list-none p-0 flex space-x-4">
            <li><Link href="/admin" className="text-white no-underline hover:underline">Admin</Link></li>
            <li><Link href="/about" className="text-white no-underline hover:underline">About</Link></li>
          </ul>
        </nav>
        <div>
          {!isLoading && (
            session ? (
              <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Logout</button>
            ) : (
              <Link href="/login" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Login</Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;