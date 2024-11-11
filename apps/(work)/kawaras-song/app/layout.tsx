import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kawara's song",
  description:
    "As my heart beats in time with yours, I will think over the next one million years.",
  openGraph: {
    title: "Kawara's song",
    description:
      "As my heart beats in time with yours, I will think over the next one million years.",
    url: "https://work.tom.so/kawaras-song",
    siteName: "Kawara's song",
    locale: "en_NZ",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Kawara's song",
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="/kawaras-song/og.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content="/kawaras-song/og.png" />
        <meta
          name="description"
          content="As my heart beats in time with yours, I will think over the next one million years."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/kawaras-song/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/kawaras-song/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/kawaras-song/favicon-16x16.png"
        />
        <link rel="manifest" href="/kawaras-song/site.webmanifest" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
