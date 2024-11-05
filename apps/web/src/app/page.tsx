import { AnimatedText } from "@/components/animated-text";

export default function Page() {
  return (
    <div
        className="relative bg-center bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(/blue.webp)`,
        }}
        aria-label=""
      >
    <div className="h-screen w-screen flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      
      <h1 className="font-departure text-white text-[40px] md:text-[84px] relative z-10 text-center h-[120px] md:h-auto leading-tight">
        <AnimatedText text="It's time to build" />
      </h1>

      <p className="relative z-10 text-center text-white font-departure max-w-[80%] mt-0 md:mt-4">
        A digital creation company
      </p>

    </div>
    </div>
  );
}
