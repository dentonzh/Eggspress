'use client'

import Link from 'next/link'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-wrap">
          <div className="my-auto x-auto">
            <div className="my-auto w-5/6 md:w-1/3">
              <h2 className="mb-3 text-xl font-light">Eggspress ran into an error </h2>
              <div className="text-xs text-gray-600">Digest {error.digest}</div>
              <div className="mb-3">
                <button
                  className="bg-blue-600 hover:bg-blue-800 font-semibold px-6 py-2 text-white border-gray-200"
                  onClick={() => reset()}
                >
                  Try again
                </button>
              </div>
              <Link href="/">
                <button className="bg-blue-600 hover:bg-blue-800 font-semibold px-6 py-2 text-white border-gray-200">
                  Return home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
