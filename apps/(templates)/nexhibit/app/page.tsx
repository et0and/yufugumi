export default function Component() {
  const pages = [
    {
      title: "Page One",
      date: "34/98/5973",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere in tortor in cursus. Aliquam lacula enim sit amet diam pharetra volutpat. Etiam male.",
      additionalContent: [
        "Proin Rhoncus enim sit amet",
        "Morbi cons",
        "Aliquam tinci dapib",
      ],
    },
    {
      title: "Page Two",
      date: "34/98/5973",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere in tortor in cursus. Aliquam lacula enim sit amet diam pharetra volutpat. Etiam male.",
      additionalContent: [
        "Proin Rhoncus enim sit amet",
        "Morbi cons",
        "Aliquam tinci dapib",
      ],
    },
    {
      title: "Page Three",
      date: "34/98/5973",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere in tortor in cursus. Aliquam lacula enim sit amet diam pharetra volutpat. Etiam male.",
      additionalContent: [
        "Proin Rhoncus enim sit amet",
        "Morbi cons",
        "Aliquam tinci dapib",
      ],
    },
    {
      title: "Page Four",
      date: "34/98/5973",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut posuere in tortor in cursus. Aliquam lacula enim sit amet diam pharetra volutpat. Etiam male.",
      additionalContent: [
        "Proin Rhoncus enim sit amet",
        "Morbi cons",
        "Aliquam tinci dapib",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white selection:bg-yellow-100 text-black font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          {/* Sticky Sidebar */}
          <aside className="lg:w-1/4 lg:sticky lg:top-0 lg:h-screen mx-4">
            <div className="py-16 pr-8">
              <h1 className="lg:text-2xl text-lg font-medium mb-4">ハックショー・トム</h1>
              <div className="lg:absolute lg:bottom-0 py-4 lg:block">
                <p className="text-sm mb-2">
                  Dolor sit amet, consectetur adipiscing elit. Suspendisse purus
                  velit, pretium et vulputate id, consequat dignissim eros.
                </p>
                <p className="text-sm">About</p>
                <p className="text-sm">Work</p>
                <p className="text-sm">Projects</p>
                <p className="text-sm">Commissions</p>
                <p className="text-sm">Email</p>
                <p className="text-sm">Instagram</p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4 flex flex-col lg:flex-row mx-4">
            {/* Middle Column */}
            <div className="lg:w-1/2 py-16 lg:pr-8 space-y-32">
              {pages.map((page, index) => (
                <section key={page.title} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-medium">{page.title}</h2>
                    <span className="text-sm text-gray-400">{page.date}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {page.content}
                  </p>
                  <div className="space-y-2">
                    {page.additionalContent.map((content) => (
                      <p key={content} className="text-sm text-gray-400">
                        {content}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Right Column (Images) */}
            <div className="lg:w-1/2 py-16 space-y-32">
              {pages.map((page, index) => (
                <div
                  key={`image-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    index
                  }`}
                  className="relative aspect-[4/3] w-full overflow-hidden"
                >
                  <div className="absolute inset-0 bg-neutral-300 transform origin-top-right" />
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
