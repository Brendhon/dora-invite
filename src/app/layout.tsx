import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dora, a Aventureira",
  description: "Dora vai ao cinema e quer te convidar!",

  openGraph: {
    title: "Dora, a Aventureira",
    description: "Dora vai ao cinema e quer te convidar!",
    url: "https://dora-lyart.vercel.app",
    siteName: "Dora, a Aventureira",
    images: [
      {
        url: "https://dora-lyart.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dora convidando para o cinema",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Dora, a Aventureira",
    description: "Dora vai ao cinema e quer te convidar!",
    images: ["https://dora-lyart.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
