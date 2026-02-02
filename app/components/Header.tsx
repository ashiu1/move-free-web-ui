import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <span className="text-xl font-bold text-white">M</span>
          </div>
          <span className="text-xl font-bold text-gray-900">MoveFree</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="#how-it-works" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
            How It Works
          </a>
          <a href="#features" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 md:block">
            Sign In
          </button>
          <button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
