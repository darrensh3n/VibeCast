'use client'

import { use, useState } from 'react'
import DashboardTabs from '@/components/DashboardTabs'
import { useEffect } from 'react'

export default function Dashboard() {
  const [selectedMood, setSelectedMood] = useState('')
  const [selectedWeather, setSelectedWeather] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [weather, setWeather] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)

  const handleMoodClick = (mood: string) => setSelectedMood(mood)
  const handleWeatherClick = (weather: string) => setSelectedWeather(weather)
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    )
  }

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser')
      return
    }
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        console.error('Geolocation permission denied or failed:', error)
      }
    )
  }, [])

  useEffect(() => {
    if (!location) return
  
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=imperial&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        )
  
        if (!res.ok) {
          throw new Error('Failed to fetch weather data')
        }
  
        const data = await res.json()
        console.log('Weather API response:', data)
  
        if (data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
          setWeather(data.weather[0].description)
        } else {
          throw new Error('Weather data is missing or malformed')
        }
      } catch (error) {
        console.error('Error fetching weather data:', error)
        setWeather('Unable to fetch weather data')
      }
    }
  
    fetchWeather()
  }, [location])

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white px-6 py-10">
      <DashboardTabs />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Weather Section */}
        <section className="bg-white/10 rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold mb-2">Current Weather</h2>
          <p className="text-sm text-gray-300 mb-4">Weather affects your playlist recommendations</p>
          <div className="flex gap-3">
            {weather && (
              <p className="mt-4 text-center text-white/80 text-sm">
                Current Weather: <span className="font-medium">{weather}</span>
              </p>
            )}
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
