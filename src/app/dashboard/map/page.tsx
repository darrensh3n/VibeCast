'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import DashboardTabs from '@/components/DashboardTabs'

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
})

export default function MapPage() {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [city, setCity] = useState<string | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        setLocation({ lat: latitude, lon: longitude })

        // Optional: get city name
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
        const data = await res.json()
        setCity(data.address.city || data.address.town || data.address.village || 'Your Location')
      },
      (err) => {
        console.error('Location access denied', err)
      }
    )
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white p-6">
        <DashboardTabs />
      <h1 className="mt-8 text-2xl font-bold mb-4">📍 Current Location</h1>

      {location ? (
        <div className="h-[500px] rounded-xl overflow-hidden border border-white/20">
          <MapContainer
            center={[location.lat, location.lon]}
            zoom={13}
            scrollWheelZoom={false}
            className="h-full w-full z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[location.lat, location.lon]} icon={customIcon}>
              <Popup>
                {city || 'You are here'}<br />
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      ) : (
        <p className="text-gray-300">Fetching location...</p>
      )}
    </main>
  )
}
