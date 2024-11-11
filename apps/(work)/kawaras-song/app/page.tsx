"use client";

import { useState, useEffect } from "react";
import { toWords } from "number-to-words";
import { FixedSizeList as List } from "react-window";

const TOTAL_COUNT = 1000000;
const ITEM_HEIGHT = 40; // Adjust based on your text size and line height

const NumberItem = ({
  index,
  style,
}: {
  index: number;
  style: React.CSSProperties;
}) => (
  <p style={style} className="mb-1">
    {toWords(index + 1)}
  </p>
);

export default function Home() {
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (windowHeight === 0) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <main className="container mx-auto py-8 leading-10 text-center">
      <List
        height={windowHeight}
        itemCount={TOTAL_COUNT}
        itemSize={ITEM_HEIGHT}
        width="100%"
      >
        {NumberItem}
      </List>
    </main>
  );
}
