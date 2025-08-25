'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Scoreboard {
  id: string
  name: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  designType: 'CLASSIC' | 'MODERN'
  isActive: boolean
}

export default function ScoreboardDisplayPage() {
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const scoreboardId = params.id as string

  useEffect(() => {
    fetchScoreboard()
    const interval = setInterval(fetchScoreboard, 2000) // Poll every 2 seconds
    return () => clearInterval(interval)
  }, [scoreboardId])

  const fetchScoreboard = async () => {
    try {
      const response = await fetch(`/api/scoreboards/${scoreboardId}`)
      const data = await response.json()
      setScoreboard(data)
    } catch (error) {
      console.error('Error fetching scoreboard:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (!scoreboard || !scoreboard.isActive) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Scoreboard not found or inactive</div>
      </div>
    )
  }

  const ClassicDesign = () => (
    <div className="w-full h-screen bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
      <div className="bg-black text-white p-8 rounded-lg shadow-2xl min-w-96">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-yellow-400">{scoreboard?.name}</h2>
        </div>
        <div className="flex justify-between items-center space-x-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{scoreboard?.homeTeam}</div>
            <div className="text-6xl font-bold text-green-400">{scoreboard?.homeScore}</div>
          </div>
          <div className="text-4xl font-bold text-gray-400">VS</div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">{scoreboard?.awayTeam}</div>
            <div className="text-6xl font-bold text-red-400">{scoreboard?.awayScore}</div>
          </div>
        </div>
      </div>
    </div>
  )

  const ModernDesign = () => (
    <div className="w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
      <div className="bg-black/50 backdrop-blur-sm rounded-2xl p-12 shadow-2xl min-w-96">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">{scoreboard?.name}</h2>
        </div>
        <div className="flex justify-between items-center space-x-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-4">{scoreboard?.homeTeam}</div>
            <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {scoreboard?.homeScore}
            </div>
          </div>
          <div className="text-5xl font-bold text-gray-300">VS</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-4">{scoreboard?.awayTeam}</div>
            <div className="text-7xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              {scoreboard?.awayScore}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {scoreboard.designType === 'CLASSIC' ? <ClassicDesign /> : <ModernDesign />}
    </>
  )
}