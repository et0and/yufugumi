import Image from "next/image";

export default function Component() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen selection:bg-pink-300">
      {/* Left Image Section */}
      <div className="lg:w-1/2 bg-gray-300">
        <Image
          src="/a-drawing.jpg"
          alt="Featured image"
          width={800}
          height={1000}
          className="w-full h-full object-cover invert"
        />
      </div>

      {/* Right Content Section */}
      <div className="lg:w-1/2 p-8 lg:p-12 space-y-8">
        {/* Header Text */}
        <p className="text-gray-700 text-lg leading-relaxed font-serif">
          Nulla ipsum augue, viverra ac neque a, gravida temps tellus. Nam vitae
          nisl risus. Pellentesque ex libero pharetra sodales vel eu ante.
          Quisque interdum ipsum a ante lacinia, a vehicula quam gravida. In hac
          habitasse platea dictum.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap gap-8 text-sm text-gray-600">
          <div className="space-y-1">
            <p>Sed Faucibus Condi</p>
            <p>Cras Gravida</p>
            <p>Pellentesque Est</p>
          </div>
          <div className="space-y-1">
            <p>Sed Faucibus</p>
            <p>Donec AC Ultrici</p>
            <p>Mauris Sed</p>
          </div>
          <div className="space-y-1">
            <p>Laoreet Sollici</p>
            <p>Est Laro</p>
            <p>Communicado</p>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl lg:text-6xl font-serif">Lorem Ipsum</h1>

        {/* Content Cards */}
        <div className="space-y-8">
          {[
            {
              title: "Neque",
              description:
                "Quisque elit velit, efficitur eu erat non, suscipit consectetur neque. Sed a dignissim ex. Donec nec eleifend ipsum. Curabitur ligula dui.",
            },
            {
              title: "Quam Gravida",
              description:
                "Aenean ut bibendum lacus. Nam vitae felis diam. Aenean ligula ligula, malesuada at volutpat ullamcorper, convallis quis dolor.",
            },
            {
              title: "Habitasse",
              description:
                "Aenean id mattis enim. Aliquam semper est a efficitur dictum. Nullam laoreet vitae ante quis dictum. Fusce maximus vel purus.",
            },
            {
              title: "Etiam Finibus",
              description:
                "Aenean suscipit felis vel luctus iaculis. Etiam finibus maximus posuere. Suspendisse facilisis euismod augue ut ultricies.",
            },
          ].map((item, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <div key={index} className="flex gap-6">
              <div className="w-24 h-24 bg-gray-100 flex-shrink-0" />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-gray-500 text-sm">2734-234</span>
                  <span className="text-gray-600">{item.title}</span>
                </div>
                <p className="text-gray-700">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
