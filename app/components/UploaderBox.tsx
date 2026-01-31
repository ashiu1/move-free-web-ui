'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploaderBox() {
  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      // Navigate to the editor page with the URL as a query parameter
      router.push(`/yt_editor?url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Transform Your Workout
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Videos Into Guides
            </span>
          </h1>
          <p className="mb-10 text-lg text-gray-600 md:text-xl">
            Convert any fitness video into step-by-step workout documentation.
            <br />
            AI-powered analysis with no manual editing needed.
          </p>

          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Paste your video URL here (YouTube, Vimeo, etc.)"
                    className="w-full rounded-lg border border-gray-300 py-4 pl-12 pr-4 text-base transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                >
                  Process Video
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Supports YouTube, Vimeo, and direct video links
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
