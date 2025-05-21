// src/app/dashboard/page.tsx
'use client'

import { useState } from 'react'
import DashboardTabs from '@/components/DashboardTabs'

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedWeather, setSelectedWeather] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const handleMoodClick = (mood: string) => setSelectedMood(mood)
  const handleWeatherClick = (weather: string) => setSelectedWeather(weather)
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-6 py-10">
      <DashboardTabs />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Weather Section */}
        <section className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
          <p className="text-sm text-gray-300 mb-4">Weather affects your playlist recommendations</p>
          <div className="flex gap-3">
            {['Sunny', 'Rainy', 'Cloudy'].map((weather) => (
              <button
                key={weather}
                onClick={() => handleWeatherClick(weather)}
                className={`px-4 py-2 rounded-full text-sm border hover:bg-white/20 transition ${
                  selectedWeather === weather ? 'bg-white/20 border-white' : 'border-gray-400'
                }`}
              >
                {weather}
              </button>
            ))}
          </div>
        </section>

        {/* Mood Section */}
        <section className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Your Mood</h2>
          <p className="text-sm text-gray-300 mb-4">Select how you're feeling right now</p>
          <div className="grid grid-cols-2 gap-3">
            {['Happy', 'Chill', 'Energetic', 'Melancholy'].map((mood) => (
              <button
                key={mood}
                onClick={() => handleMoodClick(mood)}
                className={`px-4 py-3 rounded-lg border text-sm hover:bg-white/20 transition ${
                  selectedMood === mood ? 'bg-white/20 border-white' : 'border-gray-400'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </section>

        {/* Genre Section */}
        <section className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Playlist Settings</h2>
          <p className="text-sm text-gray-300 mb-4">Select genres</p>
          <div className="flex flex-wrap gap-2">
            {['Pop', 'Rock', 'R&B', 'Hip Hop', 'Electronic'].map((genre) => (
              <button
                key={genre}
                onClick={() => toggleGenre(genre)}
                className={`px-4 py-2 rounded-full text-sm border hover:bg-white/20 transition ${
                  selectedGenres.includes(genre) ? 'bg-white/20 border-white' : 'border-gray-400'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={() => alert('Generating playlist...')}
          className="px-8 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-300 transition"
        >
          Generate Playlist
        </button>
      </div>
    </main>
  )
}
