import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Mild & Petch Wedding",
  description: "Wedding invitation for Mild and Petch",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Mild & Petch Wedding",
    description: "Wedding invitation for Mild and Petch",
    url: "/",
    siteName: "Mild & Petch Wedding",
    type: "website",
    locale: "th_TH",
    images: [
      {
        url: "/og-image.jpg",
        width: 1206,
        height: 633,
        alt: "Mild and Petch wedding invitation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mild & Petch Wedding",
    description: "Wedding invitation for Mild and Petch",
    images: ["/og-image.jpg"]
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
