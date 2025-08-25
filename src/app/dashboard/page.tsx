'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Scoreboard {
  id: string
  name: string
  homeTeam: string
  awayTeam: string
  homeScore: number
  awayScore: number
  designType: string
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [scoreboards, setScoreboards] = useState<Scoreboard[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    fetchScoreboards()
  }, [session, status, router])

  const fetchScoreboards = async () => {
    try {
      const response = await fetch('/api/scoreboards')
      const data = await response.json()
      setScoreboards(data)
    } catch (error) {
      console.error('Error fetching scoreboards:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteScoreboard = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scoreboard?')) return

    try {
      await fetch(`/api/scoreboards/${id}`, { method: 'DELETE' })
      setScoreboards(scoreboards.filter(s => s.id !== id))
    } catch (error) {
      console.error('Error deleting scoreboard:', error)
    }
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {session?.user?.name || session?.user?.email}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Account Status</p>
              <p className={`font-semibold ${session?.user?.isPremium ? 'text-green-600' : 'text-yellow-600'}`}>
                {session?.user?.isPremium ? 'Premium' : 'Free'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
            <div className="space-y-2">
              <Link
                href="/dashboard/create"
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Create Scoreboard
              </Link>
              <Link
                href="/dashboard/billing"
                className="block w-full text-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Manage Billing
              </Link>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">OBS Integration</h3>
            <p className="text-gray-600 text-sm mb-2">
              Use the scoreboard URLs in OBS browser sources for live streaming.
            </p>
            <p className="text-xs text-gray-500">
              Each scoreboard has a unique URL for OBS integration.
            </p>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Support</h3>
            <p className="text-gray-600 text-sm">
              Need help? Check the documentation or contact support.
            </p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Scoreboards</h2>
          </div>
          
          {scoreboards.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No scoreboards created yet.</p>
              <Link
                href="/dashboard/create"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Create Your First Scoreboard
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {scoreboards.map((scoreboard) => (
                <div key={scoreboard.id} className="px-6 py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{scoreboard.name}</h3>
                      <p className="text-sm text-gray-500">
                        {scoreboard.homeTeam} {scoreboard.homeScore} - {scoreboard.awayScore} {scoreboard.awayTeam}
                      </p>
                      <p className="text-xs text-gray-400">
                        Design: {scoreboard.designType} | Created: {new Date(scoreboard.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/dashboard/scoreboards/${scoreboard.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        Manage
                      </Link>
                      <Link
                        href={`/scoreboard/${scoreboard.id}`}
                        target="_blank"
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteScoreboard(scoreboard.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}