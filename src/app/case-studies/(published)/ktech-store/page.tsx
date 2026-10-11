import type { Metadata } from 'next';
import type { CaseStudyContent } from '@/components/case-studies/types';
import { CaseStudyView } from '@/components/case-studies/detailed-case-study';
import { buildCaseStudyMetadata } from '@/lib/seo';
import { contactMailto } from '@/lib/site';

const COVER = '/projects/ktech/cover.jpg';

export const metadata: Metadata = buildCaseStudyMetadata({
    slug: 'ktech-store',
    title: 'KTech Store — Solo Ecommerce Case Study',
    description:
        'Solo design and development of KTech Store, a Next.js ecommerce site for premium electronics in India. Catalog, Razorpay checkout, and admin shipped in four weekends.',
    keywords: [
        'ecommerce case study',
        'Next.js ecommerce',
        'Razorpay',
        'MongoDB',
        'KTech Store',
        'solo developer',
        'India electronics store',
        'Akash Parmar',
    ],
    coverImage: COVER,
    coverImageAlt: 'KTech Store — premium electronics, ready to ship',
});

const study: CaseStudyContent = {
    slug: 'ktech-store',
    title: 'KTech Store',
    tagline:
        'A premium electronics store for India — designed and built solo, from plan to production, in four weekends.',
    year: '2026',
    role: 'Design · Solo Developer',
    client: 'KTech Store',
    duration: '4 weekends',
    categories: ['Ecommerce', 'Next.js', 'Razorpay', 'MongoDB'],
    coverImage: COVER,
    sections: [
        {
            type: 'hero',
            badge: 'SOLO · ECOMMERCE',
            title: 'KTech Store — Premium Electronics, Ready to Ship',
            subtitle: 'Design, storefront, checkout, and admin — one developer, four weekends',
            description:
                'KTech Store is an ecommerce site for premium electronics and accessories in India. I designed the product and built it end to end: public catalog, cart and Razorpay checkout, customer accounts, and the admin tools that run the store.',
            metrics: [
                { label: 'Role', value: 'Solo' },
                { label: 'Timeline', value: '4 weekends' },
                { label: 'Market', value: 'India' },
                { label: 'Payments', value: 'Razorpay' },
            ],
            primaryCta: 'Visit KTech Store',
            primaryCtaHref: 'https://ktechstore.in',
            secondaryCta: 'All case studies',
            secondaryCtaHref: '/case-studies',
        },
        {
            type: 'overview',
            title: 'What Shipped',
            content: [
                'The brief was a store people can browse, trust, and pay on — keyboards, audio, cameras, and desk gear — without a marketplace template. I owned the interface, the catalog model, and the checkout path.',
                'Four weekends covered planning through a production build: storefront, guest and signed-in carts, order flow, and an admin panel for products, orders, and featured merchandising. The live site is ktechstore.in.',
            ],
            stats: [
                { label: 'Scope', value: 'Design + build' },
                { label: 'Stack', value: 'Next.js 16' },
                { label: 'Data', value: 'MongoDB' },
                { label: 'Checkout', value: 'Razorpay' },
            ],
        },
        {
            type: 'challenge',
            title: 'Constraints',
            items: [
                {
                    title: 'One person, both sides',
                    description:
                        'Design and engineering had to stay in the same loop so the storefront, checkout, and admin did not drift apart.',
                },
                {
                    title: 'Payments have to be exact',
                    description:
                        'India checkout means rupees in paise, server-side totals, and a webhook that does not double-charge or double-decrement stock.',
                },
                {
                    title: 'A store is more than a catalog',
                    description:
                        'Guests need a cart before they sign in. Staff need orders, products, and support without a separate product.',
                },
            ],
        },
        {
            type: 'solution',
            title: 'How It Was Built',
            items: [
                {
                    title: 'Storefront on Next.js',
                    description:
                        'App Router pages for catalog, product detail, cart, checkout, and account. Tailwind and a small component set kept the UI consistent without a design handoff.',
                },
                {
                    title: 'Checkout that recomputes the bill',
                    description:
                        'Razorpay amounts are calculated on the server. The webhook verifies the signature and decrements stock once, so a retry does not create a second order.',
                },
                {
                    title: 'Admin for the people running the shop',
                    description:
                        'Products, categories, orders, featured placements, and support live behind role checks. Cloudinary holds images. Background jobs cover bulk import and payment reconciliation.',
                },
            ],
        },
        {
            type: 'gallery',
            title: 'Storefront',
            layout: 'grid',
            images: [
                {
                    title: 'Homepage',
                    description: 'Search, categories, and a direct path into the catalog.',
                    image: '/projects/ktech/hero.png',
                },
                {
                    title: 'Shop by category',
                    description: 'Headphones, keyboards, mice, monitors, and more — plus a brand spotlight.',
                    image: '/projects/ktech/cateogory.png',
                },
                {
                    title: 'Product listing',
                    description: 'Filters, price range, stock, and rupee pricing on the grid.',
                    image: '/projects/ktech/products.png',
                },
                {
                    title: 'Product detail',
                    description: 'Gallery, offer price, add to cart, and warranty on the product page.',
                    image: '/projects/ktech/product-detail.png',
                },
            ],
        },
        {
            type: 'results',
            title: 'Outcome',
            items: [
                {
                    label: 'Delivery',
                    value: '4 weekends',
                    description: 'Planned and built solo, from interface to production checkout.',
                },
                {
                    label: 'Store',
                    value: 'Live',
                    description: 'Public catalog and checkout at ktechstore.in.',
                },
                {
                    label: 'Ownership',
                    value: 'End to end',
                    description: 'Design, frontend, API, data model, and admin in one codebase.',
                },
                {
                    label: 'Market',
                    value: 'India',
                    description: 'Razorpay, rupee pricing, and shipping built for local buyers.',
                },
            ],
        },
        {
            type: 'cta',
            title: 'Need a store designed and built by one person?',
            description:
                'I design and ship ecommerce — catalog, checkout, and the admin behind it — without splitting the work across a team.',
            primaryCta: 'Let’s work together',
            primaryCtaHref: contactMailto,
            secondaryCta: 'Visit KTech Store',
            secondaryCtaHref: 'https://ktechstore.in',
        },
    ],
};

export default function KtechStoreCaseStudyPage() {
    return <CaseStudyView study={study} />;
}
