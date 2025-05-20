'use client'

import { JSX, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

interface AuthFormProps {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps): JSX.Element {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
        return alert('Email is required.')
    }
    if (!password) {
        return alert('Password is required.')
    }
    if (mode === 'signup' && !confirmPassword) {
        return alert('Please confirm your password.')
    }
    if (mode === 'signup' && password !== confirmPassword) {
      return alert('Passwords do not match.')
    }
    if (mode === 'signup' && password.length < 8) {
      return alert('Password must be at least 8 characters long.')
    }

    if (mode === 'login') {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
        if (loginError) {
            alert(loginError.message)
            return
        }
        router.push('/dashboard')
    } else {
      const { error: error, data } = await supabase.auth.signUp({ email, password })
      if (error) {
        alert(error.message)
        return
      }

      const user = data?.user
      if (user) {
        const { error: profileError } = await supabase.from('profiles').insert([
            {
                id: user.id,
                email,
                preferences: {},
            },
            ])
            if (profileError) {
                alert('Failed to create user profile. Please try again.')
                return
            }
      }
    }

    router.push('/dashboard')
  }
  

  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-4">
      <div className="relative z-10 flex flex-col items-center px-6 py-10 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full">
        <div className="mb-6 p-4 bg-white/20 rounded-full">
          <svg className="w-14 h-14" viewBox="0 0 24 24" fill="none">
            <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2"/>
            <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="2"/>
          </svg>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">
          {mode === 'login' ? 'Log In to VibeCast' : 'Create a VibeCast Account'}
        </h2>
        <p className="text-gray-300 mb-6 text-sm text-center">
          {mode === 'login' ? 'AI-powered music that matches your vibe' : 'Join the vibe — personalized music, powered by AI'}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
          {mode === 'signup' && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400 text-white"
            />
          )}
          <button
            type="submit"
            className={`${
              mode === 'login'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500'
                : 'bg-gradient-to-r from-purple-500 to-pink-500'
            } px-6 py-3 rounded-lg hover:opacity-90 transition font-medium`}
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-400">
          {mode === 'login' ? 'Don’t have an account?' : 'Already have an account?'}{' '}
          <span
            onClick={() => router.push(mode === 'login' ? '/auth/signup' : '/auth/login')}
            className="text-cyan-300 cursor-pointer hover:underline"
          >
            {mode === 'login' ? 'Sign Up' : 'Log In'}
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
