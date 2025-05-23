import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Header from '@/components/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'discuss',
    description: 'a minimalistic forum',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="container mx-auto max-w-6xl">
                    <Providers>
                        <Header />
                        <div className="p-6">{children}</div>
                    </Providers>
                </main>
            </body>
        </html>
    );
}
