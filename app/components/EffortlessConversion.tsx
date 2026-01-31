export default function EffortlessConversion() {
  const benefits = [
    {
      title: "Smart Exercise Detection",
      description: "Advanced AI recognizes workout movements, rep counts, and exercise variations automatically.",
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Multiple Export Formats",
      description: "Download your workout guides as PDF, Word documents, or save them to your personal library.",
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Form Cue Extraction",
      description: "Captures important coaching tips and form instructions directly from the video content.",
      icon: (
        <svg className="h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="features" className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">Effortless Conversion</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Built for fitness professionals, trainers, and enthusiasts who want structured workout plans without the manual work.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${benefit.gradient} p-4 text-white shadow-lg`}>
                {benefit.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>

              {/* Decorative gradient on hover */}
              <div className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br ${benefit.gradient} opacity-0 blur-3xl transition-opacity group-hover:opacity-10`} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-[1.02]">
            Start Converting Videos
          </button>
        </div>
      </div>
    </section>
  );
}
