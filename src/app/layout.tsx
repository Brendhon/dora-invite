import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"]
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
        className={`${quicksand.variable} min-h-screen w-full bg-gradient-to-b from-[#a18cd1] via-[#fbc2eb] to-[#fad0c4] antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
