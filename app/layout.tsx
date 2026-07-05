import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://e-wedding-card-mild-petch.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mild & Petch Wedding Invitation",
  description: "Saturday, August 8, 2026 at Vivace Watcharaphon.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  alternates: {
    canonical: SITE_URL
  },
  openGraph: {
    title: "Mild & Petch Wedding Invitation",
    description: "Saturday, August 8, 2026 at Vivace Watcharaphon.",
    url: SITE_URL,
    siteName: "Mild & Petch Wedding Invitation",
    type: "website",
    locale: "th_TH",
    images: [
      {
        url: OG_IMAGE,
        secureUrl: OG_IMAGE,
        width: 800,
        height: 420,
        alt: "Mild & Petch Wedding Photo",
        type: "image/jpeg"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mild & Petch Wedding Invitation",
    description: "Saturday, August 8, 2026 at Vivace Watcharaphon.",
    images: [OG_IMAGE]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#f5f0ea"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
