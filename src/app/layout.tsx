import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Container } from '@chakra-ui/react'

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
      </body>
    </html>
  );
}
