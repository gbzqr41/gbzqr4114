"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">GBZQR</h1>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                Email or Phone
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-black mb-4">Reset Link Sent!</h2>
            <p className="text-gray-600">Please check your email for password reset instructions.</p>
          </div>
        )}
      </div>
    </div>
  );
}










