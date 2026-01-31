export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Submit Video URL",
      description: "Paste the link to your workout video from any supported platform.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
    },
    {
      number: "02",
      title: "AI Analysis",
      description: "Our advanced AI processes the video and extracts workout movements, timing, and form cues.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      number: "03",
      title: "Generate Document",
      description: "Receive a professionally formatted workout guide with exercises, sets, and detailed instructions.",
      icon: (
        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="w-full bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600">
            From video to documentation in three simple steps
          </p>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, shown on larger screens */}
          <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600 md:left-1/2 md:block md:-translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-lg ${
                    index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                  } md:max-w-md`}>
                    <div className={`mb-3 flex items-center gap-3 ${
                      index % 2 === 0 ? 'md:flex-row-reverse md:justify-end' : ''
                    }`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {step.icon}
                      </div>
                      <span className="text-sm font-bold text-gray-400">{step.number}</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-gray-900">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>

                {/* Timeline dot */}
                <div className="absolute left-8 hidden h-4 w-4 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg md:left-1/2 md:block md:-translate-x-1/2" />

                {/* Spacer for alternating layout */}
                <div className="hidden flex-1 md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
