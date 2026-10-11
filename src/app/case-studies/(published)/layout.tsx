export default function PublishedCaseStudiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="hide-scrollbar h-full min-h-0 w-full overflow-y-auto">
            <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">{children}</div>
        </main>
    );
}
