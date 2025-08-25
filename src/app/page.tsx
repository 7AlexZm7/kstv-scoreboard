import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            KS TV ScoreBoard
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Create and manage professional sports scoreboards with real-time updates and OBS integration.
          </p>
          
          <div className="space-x-4">
            <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/auth/signin"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
            <p className="text-gray-300">Score changes are reflected instantly across all connected devices.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">OBS Integration</h3>
            <p className="text-gray-300">Dedicated URLs for seamless OBS browser source integration.</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white">
            <h3 className="text-xl font-semibold mb-2">Modern Designs</h3>
            <p className="text-gray-300">Choose from multiple TV-style scoreboard layouts.</p>
          </div>
        </div>
      </div>
    </div>
  )
}