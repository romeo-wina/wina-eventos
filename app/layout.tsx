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
  title: "Wina Eventos",
  description:
    "Alquiler de Vajilla, Cristalería, Mantelería y Picadas en La Plata, City Bell y alrededores.",
  openGraph: {
    title: "Wina Eventos",
    description:
      "Alquiler de Vajilla, Cristalería, Mantelería y Picadas en La Plata, City Bell y alrededores.",
    images: ["/logo.png"],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Wina Eventos",
    description:
      "Alquiler de Vajilla, Cristalería, Mantelería y Picadas en La Plata, City Bell y alrededores.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}