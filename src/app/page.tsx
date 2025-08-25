import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            KS TV ScoreBoard
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Professional scoreboard system for live streaming. Create beautiful, real-time scoreboards 
            that integrate seamlessly with OBS and other streaming software.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/auth/signup"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/auth/signin"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-2xl mb-4">🏆</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Live Updates</h3>
              <p className="text-gray-500">
                Real-time score updates that sync instantly across all devices and streams.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-2xl mb-4">📺</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">OBS Integration</h3>
              <p className="text-gray-500">
                Seamless integration with OBS Studio and other streaming software.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-blue-600 text-2xl mb-4">🎨</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Beautiful Designs</h3>
              <p className="text-gray-500">
                Multiple professional scoreboard designs to match your brand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}