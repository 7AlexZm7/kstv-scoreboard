'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'

interface Scoreboard {
  id: string
  name: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  designType: string
  isActive: boolean
}

export default function ManageScoreboardPage() {
  const { data: session, status } = useSession()
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()
  const params = useParams()
  const scoreboardId = params.id as string

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    fetchScoreboard()
  }, [session, status, router, scoreboardId])

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

  const updateScore = async (field: 'homeScore' | 'awayScore', value: number) => {
    if (!scoreboard) return

    const newScoreboard = { ...scoreboard, [field]: value }
    setScoreboard(newScoreboard)

    setSaving(true)
    try {
      await fetch(`/api/scoreboards/${scoreboardId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: value })
      })
    } catch (error) {
      console.error('Error updating score:', error)
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async () => {
    if (!scoreboard) return

    const newActive = !scoreboard.isActive
    setScoreboard({ ...scoreboard, isActive: newActive })

    try {
      await fetch(`/api/scoreboards/${scoreboardId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: newActive })
      })
    } catch (error) {
      console.error('Error toggling active status:', error)
    }
  }

  const getObsUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/scoreboard/${scoreboardId}`
    }
    return ''
  }

  const copyObsUrl = () => {
    navigator.clipboard.writeText(getObsUrl())
    alert('OBS URL copied to clipboard!')
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!scoreboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Scoreboard not found</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Scoreboard</h1>
                <p className="text-gray-600">{scoreboard.name}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={copyObsUrl}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Copy OBS URL
                </button>
                <Link
                  href={`/scoreboard/${scoreboardId}`}
                  target="_blank"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Preview
                </Link>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Back
                </button>
              </div>
            </div>
          </div>

          <div className="px-6 py-4">
            {saving && (
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded mb-4">
                Saving changes...
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Management</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Home Team: {scoreboard.homeTeam}</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() => updateScore('homeScore', Math.max(0, scoreboard.homeScore - 1))}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        -1
                      </button>
                      <span className="text-2xl font-bold w-12 text-center">{scoreboard.homeScore}</span>
                      <button
                        onClick={() => updateScore('homeScore', scoreboard.homeScore + 1)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        +1
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Away Team: {scoreboard.awayTeam}</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <button
                        onClick={() => updateScore('awayScore', Math.max(0, scoreboard.awayScore - 1))}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        -1
                      </button>
                      <span className="text-2xl font-bold w-12 text-center">{scoreboard.awayScore}</span>
                      <button
                        onClick={() => updateScore('awayScore', scoreboard.awayScore + 1)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <button
                      onClick={toggleActive}
                      className={`mt-1 px-4 py-2 rounded ${
                        scoreboard.isActive
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {scoreboard.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Design Type</label>
                    <p className="mt-1 text-gray-600">{scoreboard.designType}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">OBS URL</label>
                    <input
                      type="text"
                      value={getObsUrl()}
                      readOnly
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              <iframe
                src={`/scoreboard/${scoreboardId}`}
                className="w-full h-96 border rounded"
                title="Scoreboard Preview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}