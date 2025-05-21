'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulating loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  function RainDrop() {
    const [style, setStyle] = useState({})
  
    useEffect(() => {
      setStyle({
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 1}s`,
        animationDelay: `${Math.random() * 2}s`
      })
    }, [])
  
    return <div className="rain-drop" style={style}></div>
  }  

  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rain effect */}
        <div className="rain-container">
          {[...Array(20)].map((_, i) => (
              <RainDrop key={i} />
        ))}
        </div>
      </div>
      
      {/* Content container with frosted glass effect */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-2xl max-w-md w-full mx-4">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin mb-4"></div>
            <p className="text-lg">Tuning in...</p>
          </div>
        ) : (
          <>
            {/* Logo/Icon */}
            <div className="mb-6 p-4 bg-white/20 rounded-full">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V6L21 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="6" cy="18" r="3" stroke="white" strokeWidth="2"/>
                <circle cx="18" cy="15" r="3" stroke="white" strokeWidth="2"/>
              </svg>
            </div>

            <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-pink-300">VibeCast</h1>
            <p className="mb-8 text-lg text-gray-200 text-center">AI-powered music, tuned to your mood & weather</p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <button
                onClick={() => router.push('/auth/login')}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-3 rounded-lg font-medium 
  transition-transform transform hover:scale-96 active:scale-95"
              >
                Login
              </button>
              <button
                onClick={() => router.push('/auth/signup')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-medium 
  transition-transform transform hover:scale-96 active:scale-95"
              >
                Sign Up
              </button>
            </div>
          </>
        )}
      </div>
      
      {/* Weather indicators in background */}
      <div className="absolute bottom-4 left-4 text-white/50 text-sm flex items-center">
        <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z"></path>
        </svg>
        <span>Weather-based recommendations</span>
      </div>
    </main>
  )
}
