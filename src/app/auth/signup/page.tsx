'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password || !confirmPassword) {
      return alert('Please fill in all fields.')
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match.')
    }

    // Placeholder: Replace with real signup logic
    router.push('/dashboard')
  }

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-4">
      <div className="relative z-10 flex flex-col items-center px-6 py-10 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
        {/* Icon */}
        <div className="mb-6 p-4 bg-white/20 rounded-full">
          <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2"/>
            <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
          Create a VibeCast Account
        </h2>
        <p className="text-gray-300 mb-6 text-sm text-center">Join the vibe — personalized music, powered by AI</p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400 text-white"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-white"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          Already have an account?{' '}
          <span
            onClick={() => router.push('/auth/login')}
            className="text-cyan-300 cursor-pointer hover:underline"
          >
            Log In
          </span>
        </p>

        <button
          onClick={() => router.push('/')}
          className="mt-6 text-xs text-gray-400 hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </main>
  )
}