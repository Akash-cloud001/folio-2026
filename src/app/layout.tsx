import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { SiteJsonLd } from '@/components/seo/SiteJsonLd';
import { SITE_URL, siteConfig } from '@/lib/site';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: siteConfig.title,
        template: `%s · ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
        'Akash Parmar',
        'full stack developer',
        'Next.js developer',
        'React developer',
        'developer portfolio',
        'case study',
        'Tradzu',
        'MyForexFirms',
        'Nestingo',
    ],
    authors: [{ name: siteConfig.name, url: SITE_URL }],
    creator: siteConfig.name,
    openGraph: {
        type: 'website',
        locale: siteConfig.locale,
        url: SITE_URL,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            {
                url: siteConfig.ogImagePath,
                width: 1200,
                height: 630,
                alt: siteConfig.ogImageAlt,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteConfig.title,
        description: siteConfig.description,
        creator: siteConfig.twitterHandle,
        images: [siteConfig.ogImagePath],
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full min-h-0 overflow-hidden`}
            >
                <GoogleAnalytics />
                <SiteJsonLd />
                {children}
            </body>
        </html>
    );
}
