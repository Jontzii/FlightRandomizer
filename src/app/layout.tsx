import '@/app/globals.css';
import { Providers } from '@/app/providers';
import { Container } from '@chakra-ui/react';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FlightRandomizer',
  description: 'Get details of a random flight from selected airport with selected airline',
  keywords: [
    'Joonas Hiltunen',
    'Aviation',
    'Flight simulation',
    'Random flight',
    'FlightRandomizer',
    'Next.js',
    'React',
    'TypeScript',
  ],
  authors: [{ name: 'Joonas Hiltunen', url: 'https://joonashiltunen.fi' }],
  creator: 'Joonas Hiltunen <joonas@jontzi.com>',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
