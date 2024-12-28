'use client';

import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-8">
          <Image
            src="/logo.png"
            alt="PM GPT Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h2 className="text-2xl font-bold mt-4">Sign in to PM GPT</h2>
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Image
            src="/google-logo.png"
            alt="Google Logo"
            width={20}
            height={20}
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
} 