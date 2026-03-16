'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { usePostFitnessFile } from '../apis/ExerciseReactQuery';

type Tab = 'url' | 'file';

export default function UploaderBox() {
  const [activeTab, setActiveTab] = useState<Tab>('url');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { mutate: uploadFile, isPending, isError, error } = usePostFitnessFile();

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      router.push(`/yt_editor?url=${encodeURIComponent(url)}`);
    }
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    uploadFile(
      { file },
      {
        onSuccess: (data) => {
          sessionStorage.setItem('file_exercise_data', JSON.stringify(data));
          router.push(`/file_editor?filename=${encodeURIComponent(file.name)}`);
        },
      }
    );
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && isValidFile(dropped)) setFile(dropped);
  };

  const isValidFile = (f: File) =>
    f.type === 'application/pdf' || f.name.endsWith('.md');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && isValidFile(selected)) setFile(selected);
  };

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-black md:text-6xl">
            Transform Your Workout
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Videos Into Guides
            </span>
          </h1>
          <p className="mb-10 text-lg text-black md:text-xl">
            Convert any fitness video into step-by-step workout documentation.
            <br />
            AI-powered analysis with no manual editing needed.
          </p>

          <div className="mx-auto max-w-2xl rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-xl">
            {/* Tab switcher */}
            <div className="mb-6 flex rounded-lg border border-gray-200 bg-gray-50 p-1">
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  activeTab === 'url'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Video URL
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('file')}
                className={`flex-1 rounded-md py-2 text-sm font-medium transition-all ${
                  activeTab === 'file'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Upload File
              </button>
            </div>

            {activeTab === 'url' ? (
              <form onSubmit={handleUrlSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
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
                      className="w-full rounded-lg border border-gray-300 py-4 pl-12 pr-4 text-base text-black transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                  >
                    Process Video
                  </button>
                </div>
                <p className="text-sm text-black">
                  Supports YouTube, Vimeo, and direct video links
                </p>
              </form>
            ) : (
              <form onSubmit={handleFileSubmit} className="flex flex-col gap-4">
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
                    dragOver
                      ? 'border-blue-500 bg-blue-50'
                      : file
                      ? 'border-green-400 bg-green-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.pdf,application/pdf,text/markdown"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="h-10 w-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium text-black">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="mt-1 text-xs text-gray-400 underline hover:text-gray-600"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <svg className="h-10 w-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-base text-black">Drop your file here or click to browse</p>
                      <p className="text-sm text-gray-500">Supports .md and .pdf files</p>
                    </div>
                  )}
                </div>

                {isError && (
                  <p className="text-sm text-red-500">
                    {error instanceof Error ? error.message : 'Upload failed. Please try again.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={!file || isPending}
                  className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPending ? 'Processing...' : 'Process File'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
