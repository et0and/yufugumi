"use client";
import type React from "react";
import { useEffect, useState } from "react";

interface TextEncryptedProps {
  text: string;
  interval?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const Text: React.FC<TextEncryptedProps> = ({ text, interval = 20 }) => {
  const [outputText, setOutputText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (outputText !== text) {
      timer = setInterval(() => {
        if (outputText.length < text.length) {
          setOutputText((prev) => prev + text[prev.length]);
        } else {
          clearInterval(timer);
        }
      }, interval);
    }

    return () => clearInterval(timer);
  }, [text, interval, outputText]);

  const remainder =
    outputText.length < text.length
      ? text
          .slice(outputText.length)
          .split("")
          .map(() => chars[Math.floor(Math.random() * chars.length)])
          .join("")
      : "";

  if (!isMounted) {
    return (
      <div
        className={`${
          text.length >= 50 ? "h-[48px]" : "h-auto"
        } sm:h-auto text-white font-mono overflow-clip`}
      >
        <span>{text}</span>
      </div>
    );
  }

  return (
    <div className={`${text.length >= 50 ? "h-[48px]" : "h-auto"} sm:h-auto`}>
      <span className="text-white font-mono overflow-clip" aria-label={text}>
        {outputText}
        <span className="text-blue-300" aria-hidden="true">
          {remainder.slice(1)}
        </span>
      </span>
    </div>
  );
};

export default Text;
