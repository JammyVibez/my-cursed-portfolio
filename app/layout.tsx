import type React from "react"
import type { Metadata } from "next"
import { Inter, Orbitron, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" })

export const metadata: Metadata = {
  title: "Cursed Energy Developer | Anime-Tech Portfolio",
  description:
    "Professional portfolio of a fullstack developer and anime-tech entrepreneur. Inspired by Jujutsu Kaisen, powered by cutting-edge technology.",
  keywords: ["developer", "portfolio", "anime", "tech", "fullstack", "Next.js", "React"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${orbitron.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
