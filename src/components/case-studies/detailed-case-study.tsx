import Image from 'next/image';
import Link from 'next/link';
import type { CaseStudyContent, CaseStudySection } from '@/components/case-studies/types';
import { CaseStudyGallery } from '@/components/case-studies/case-study-gallery';
import { CaseStudyJsonLd } from '@/components/seo/CaseStudyJsonLd';

type CaseStudyImageProps = {
    src: string;
    alt: string;
    priority?: boolean;
    className?: string;
    aspectClassName?: string;
};

function CaseStudyImage({
    src,
    alt,
    priority = false,
    className,
    aspectClassName = 'aspect-video',
}: CaseStudyImageProps) {
    return (
        <div
            className={`relative w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 ${aspectClassName}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
                className={className ?? 'object-cover object-top'}
            />
        </div>
    );
}

function SectionLabel({ children }: { children: string }) {
    return (
        <p className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{children}</p>
    );
}

function CtaControl({
    label,
    href,
    variant = 'default',
}: {
    label: string;
    href?: string;
    variant?: 'default' | 'outline';
}) {
    const base =
        'inline-flex h-10 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors';
    const className =
        variant === 'outline'
            ? `${base} border border-white/20 bg-transparent text-white hover:bg-white/10`
            : `${base} bg-white text-black hover:bg-zinc-200`;

    if (!href) {
        return <span className={`${className} cursor-not-allowed opacity-60`}>{label}</span>;
    }

    if (href.startsWith('http') || href.startsWith('mailto:')) {
        return (
            <a
                href={href}
                className={className}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
                {label}
            </a>
        );
    }

    if (href.startsWith('#')) {
        return (
            <a href={href} className={className}>
                {label}
            </a>
        );
    }

    return (
        <Link href={href} className={className}>
            {label}
        </Link>
    );
}

function renderSection(section: CaseStudySection, index: number) {
    switch (section.type) {
        case 'hero':
            return (
                <section key={index} className="mt-8">
                    {section.badge ? (
                        <p className="font-geist-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400/90">
                            {section.badge}
                        </p>
                    ) : null}
                    <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
                        {section.title}
                    </h1>
                    <p className="mt-3 text-lg text-zinc-400 sm:text-xl">{section.subtitle}</p>
                    <p className="mt-5 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
                        {section.description}
                    </p>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {section.metrics.map((m) => (
                            <div
                                key={m.label}
                                className="rounded-lg border border-white/10 bg-white/3 px-4 py-3"
                            >
                                <p className="font-geist-mono text-[10px] uppercase tracking-wider text-zinc-500">
                                    {m.label}
                                </p>
                                <p className="mt-1 text-xl font-semibold text-white">{m.value}</p>
                                {m.change ? (
                                    <p className="mt-0.5 font-geist-mono text-xs text-emerald-400/90">{m.change}</p>
                                ) : null}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {section.primaryCta ? (
                            <CtaControl
                                label={section.primaryCta}
                                href={section.primaryCtaHref}
                                variant="default"
                            />
                        ) : null}
                        {section.secondaryCta ? (
                            <CtaControl
                                label={section.secondaryCta}
                                href={section.secondaryCtaHref}
                                variant="outline"
                            />
                        ) : null}
                    </div>
                </section>
            );

        case 'overview':
            return (
                <section key={index} className="pt-14">
                    <SectionLabel>{section.title}</SectionLabel>
                    <div className="mt-6 space-y-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                        {section.content.map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                    {section.stats?.length ? (
                        <dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {section.stats.map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-lg border border-white/10 bg-white/2 px-4 py-3"
                                >
                                    <dt className="font-geist-mono text-[10px] uppercase tracking-wider text-zinc-500">
                                        {s.label}
                                    </dt>
                                    <dd className="mt-1 text-lg font-medium text-white">{s.value}</dd>
                                </div>
                            ))}
                        </dl>
                    ) : null}
                </section>
            );

        case 'challenge':
            return (
                <section key={index} className="pt-14">
                    <SectionLabel>{section.title}</SectionLabel>
                    <ul className="mt-8 flex flex-col gap-4">
                        {section.items.map((item) => (
                            <li
                                key={item.title}
                                className="rounded-lg border border-white/10 bg-white/2 p-5 sm:p-6"
                            >
                                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
                            </li>
                        ))}
                    </ul>
                </section>
            );

        case 'solution':
            return (
                <section key={index} className="pt-14">
                    <SectionLabel>{section.title}</SectionLabel>
                    <ul className="mt-8 flex flex-col gap-12">
                        {section.items.map((item) => (
                            <li key={item.title}>
                                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                                    {item.description}
                                </p>
                                {item.image ? (
                                    <div className="mt-5">
                                        <CaseStudyImage
                                            src={item.image}
                                            alt={item.title}
                                            aspectClassName="aspect-video"
                                        />
                                    </div>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </section>
            );

        case 'metrics':
            return (
                <section key={index} className="mt-16 border-t border-white/10 pt-14">
                    <SectionLabel>{section.title}</SectionLabel>
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                        {section.metrics.map((m) => (
                            <li
                                key={m.label}
                                className="rounded-lg border border-white/10 bg-white/2 p-5 sm:p-6"
                            >
                                <p className="font-geist-mono text-[10px] uppercase tracking-wider text-zinc-500">
                                    {m.label}
                                </p>
                                <p className="mt-2 text-2xl font-semibold text-white">{m.value}</p>
                                {m.description ? (
                                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">{m.description}</p>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </section>
            );

        case 'gallery':
            return (
                <CaseStudyGallery
                    key={index}
                    title={section.title}
                    images={section.images}
                    layout={section.layout}
                />
            );

        case 'cards':
            return (
                <section key={index} className="mt-16 border-t border-white/10 pt-14">
                    <SectionLabel>{section.title}</SectionLabel>
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                        {section.cards.map((card) => (
                            <li
                                key={card.title}
                                className="flex flex-col rounded-lg border border-white/10 bg-white/2 p-5 sm:p-6"
                            >
                                <h3 className="text-base font-semibold text-white">{card.title}</h3>
                                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-400">{card.description}</p>
                                {card.stats?.length ? (
                                    <ul className="mt-4 flex flex-wrap gap-2">
                                        {card.stats.map((s) => (
                                            <li
                                                key={s}
                                                className="rounded-md border border-white/10 bg-black/40 px-2.5 py-1 font-geist-mono text-[10px] uppercase tracking-wider text-zinc-400"
                                            >
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </section>
            );

        case 'quote':
            return (
                <section
                    key={index}
                    className="mt-16 border border-white/10 bg-linear-to-br from-white/6 to-transparent px-6 py-10 sm:px-10 sm:py-12"
                >
                    <blockquote className="text-lg font-medium leading-relaxed text-white sm:text-xl">
                        “{section.quote}”
                    </blockquote>
                    <footer className="mt-6 font-geist-mono text-sm text-zinc-400">
                        <cite className="not-italic text-zinc-300">{section.author}</cite>
                        {section.role ? <span className="text-zinc-500"> — {section.role}</span> : null}
                    </footer>
                </section>
            );

        case 'results':
            return (
                <section key={index} className="mt-16 border-t border-white/10 pt-14">
                    <SectionLabel>{section.title}</SectionLabel>
                    <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                        {section.items.map((item) => (
                            <li
                                key={item.label}
                                className="rounded-lg border border-emerald-500/20 bg-emerald-500/4 p-5 sm:p-6"
                            >
                                <p className="text-sm font-medium text-zinc-300">{item.label}</p>
                                <p className="mt-2 text-2xl font-semibold text-emerald-300/95">{item.value}</p>
                                {item.description ? (
                                    <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.description}</p>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </section>
            );

        case 'cta':
            return (
                <section
                    key={index}
                    className="mt-16 border border-white/10 bg-white/3 px-6 py-10 sm:px-10 sm:py-12"
                >
                    <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{section.title}</h2>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
                        {section.description}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <CtaControl label={section.primaryCta} href={section.primaryCtaHref} variant="default" />
                        {section.secondaryCta ? (
                            <CtaControl
                                label={section.secondaryCta}
                                href={section.secondaryCtaHref}
                                variant="outline"
                            />
                        ) : null}
                    </div>
                </section>
            );

        default: {
            const _exhaustive: never = section;
            return _exhaustive;
        }
    }
}

export function CaseStudyView({ study }: { study: CaseStudyContent }) {
    return (
        <article>
            <nav className="font-geist-mono text-xs text-zinc-500">
                <Link href="/case-studies" className="transition-colors hover:text-white">
                    Case studies
                </Link>
                <span className="mx-2 text-zinc-600">/</span>
                <span className="text-zinc-400">{study.title}</span>
            </nav>

            <div className="relative mt-6 aspect-[21/9] max-h-[min(70vh,500px)] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50">
                <Image
                    src={study.coverImage}
                    alt={`${study.title} cover`}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, min(896px, 100vw)"
                    className="object-cover object-top"
                />
            </div>

            <p className="mt-6 text-lg text-zinc-400">{study.tagline}</p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-white/10 py-4 font-geist-mono text-xs uppercase tracking-wider text-zinc-500">
                <div>
                    <dt className="text-zinc-600">Year</dt>
                    <dd className="mt-0.5 text-zinc-300">{study.year}</dd>
                </div>
                <div>
                    <dt className="text-zinc-600">Role</dt>
                    <dd className="mt-0.5 text-zinc-300">{study.role}</dd>
                </div>
                {study.client ? (
                    <div>
                        <dt className="text-zinc-600">Client</dt>
                        <dd className="mt-0.5 text-zinc-300">{study.client}</dd>
                    </div>
                ) : null}
                {study.duration ? (
                    <div>
                        <dt className="text-zinc-600">Duration</dt>
                        <dd className="mt-0.5 text-zinc-300">{study.duration}</dd>
                    </div>
                ) : null}
            </dl>

            {study.categories?.length ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                    {study.categories.map((c) => (
                        <li
                            key={c}
                            className="rounded-full border border-white/10 bg-white/4 px-3 py-1 font-geist-mono text-[10px] uppercase tracking-wider text-zinc-400"
                        >
                            {c}
                        </li>
                    ))}
                </ul>
            ) : null}

            {study.sections.map((section, index) => renderSection(section, index))}

            <CaseStudyJsonLd study={study} />
        </article>
    );
}
