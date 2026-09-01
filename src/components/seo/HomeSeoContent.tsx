import Link from 'next/link';
import { AI_CASE_STUDIES, AI_FAQS, AI_PROFILE } from '@/lib/ai-seo';
import { CASE_STUDY_SLUGS, siteConfig, SITE_URL } from '@/lib/site';

/** Crawlable HTML for the client-only desktop home — hidden visually, available to bots and AI crawlers. */
export function HomeSeoContent() {
    return (
        <section
            className="sr-only"
            aria-label="About Akash Parmar"
        >
            <h1>
                {siteConfig.name} — {siteConfig.jobTitle}
            </h1>
            <p>{siteConfig.description}</p>
            <p>{AI_PROFILE.summary}</p>

            <nav aria-label="Primary">
                <ul>
                    <li>
                        <Link href="/case-studies">Case studies</Link>
                    </li>
                    <li>
                        <a href={siteConfig.social.github}>GitHub</a>
                    </li>
                    <li>
                        <a href={siteConfig.social.linkedin}>LinkedIn</a>
                    </li>
                    <li>
                        <a href={`mailto:${siteConfig.email}`}>Email</a>
                    </li>
                    <li>
                        <a href="/llms.txt">LLM context (llms.txt)</a>
                    </li>
                </ul>
            </nav>

            <h2>Case studies</h2>
            <ul>
                {AI_CASE_STUDIES.map((study) => (
                    <li key={study.slug}>
                        <Link href={`/case-studies/${study.slug}`}>
                            {study.title} — {study.role}
                        </Link>
                        <p>{study.summary}</p>
                    </li>
                ))}
            </ul>

            <h2>Skills</h2>
            <p>{AI_PROFILE.skills.join(', ')}</p>

            <h2>Frequently asked questions</h2>
            <dl>
                {AI_FAQS.map((faq) => (
                    <div key={faq.question}>
                        <dt>{faq.question}</dt>
                        <dd>{faq.answer}</dd>
                    </div>
                ))}
            </dl>

            <h2>All case study routes</h2>
            <ul>
                {CASE_STUDY_SLUGS.map((slug) => (
                    <li key={slug}>
                        <Link href={`/case-studies/${slug}`}>{slug.replace(/-/g, ' ')}</Link>
                    </li>
                ))}
            </ul>

            <p>
                Portfolio site: <a href={SITE_URL}>{SITE_URL}</a>
            </p>
        </section>
    );
}
