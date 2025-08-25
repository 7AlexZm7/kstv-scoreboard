'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateScoreboardPage() {
  const [homeTeam, setHomeTeam] = useState('')
  const [awayTeam, setAwayTeam] = useState('')
  const [designType, setDesignType] = useState('MODERN')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/scoreboards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ homeTeam, awayTeam, designType })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to create scoreboard')
        return
      }

      router.push(`/dashboard/scoreboards/${data.id}`)
    } catch (error) {
      setError('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">Create New Scoreboard</h1>
            </div>
            
            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}
              
              <div>
                <label htmlFor="homeTeam" className="block text-sm font-medium text-gray-700">
                  Home Team
                </label>
                <input
                  type="text"
                  id="homeTeam"
                  value={homeTeam}
                  onChange={(e) => setHomeTeam(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g., Team A"
                />
              </div>

              <div>
                <label htmlFor="awayTeam" className="block text-sm font-medium text-gray-700">
                  Away Team
                </label>
                <input
                  type="text"
                  id="awayTeam"
                  value={awayTeam}
                  onChange={(e) => setAwayTeam(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                  placeholder="e.g., Team B"
                />
              </div>

              <div>
                <label htmlFor="designType" className="block text-sm font-medium text-gray-700">
                  Design Style
                </label>
                <select
                  id="designType"
                  value={designType}
                  onChange={(e) => setDesignType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="MODERN">Modern</option>
                  <option value="CLASSIC">Classic</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Scoreboard'}
                </button>
                <Link
                  href="/dashboard"
                  className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}