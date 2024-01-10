import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from 'next/font/google'
import { Container } from '@chakra-ui/react'
import { Providers } from '@/app/providers'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flight randomizer',
  description: 'Get a random flight from selected airport',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Container minHeight="100vh">{children}</Container>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
