'use client';

import Image from 'next/image';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';

export type CaseStudyGalleryImage = {
    title: string;
    description?: string;
    image: string;
};

type CaseStudyGalleryProps = {
    title: string;
    images: CaseStudyGalleryImage[];
    layout?: 'grid' | 'carousel';
};

function GallerySlideImage({ src, alt }: { src: string; alt: string }) {
    return (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50">
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="object-cover object-top"
            />
        </div>
    );
}

export function CaseStudyGallery({ title, images, layout }: CaseStudyGalleryProps) {
    const isGrid = layout === 'grid';

    return (
        <section className="mt-16 border-t border-white/10 pt-14">
            <p className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{title}</p>

            <div className="relative mt-8 w-full px-10 sm:px-12">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: images.length > 1,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-3 sm:-ml-4">
                        {images.map((img) => (
                            <CarouselItem
                                key={img.title}
                                className={
                                    isGrid
                                        ? 'basis-full pl-3 sm:basis-1/2 sm:pl-4'
                                        : 'basis-full pl-3 sm:basis-[88%] sm:pl-4 md:basis-[75%]'
                                }
                            >
                                <figure>
                                    <GallerySlideImage src={img.image} alt={img.title} />
                                    <figcaption className="mt-3">
                                        <p className="text-sm font-medium text-white">{img.title}</p>
                                        {img.description ? (
                                            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                                                {img.description}
                                            </p>
                                        ) : null}
                                    </figcaption>
                                </figure>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        variant="outline"
                        className="left-0 border-white/20 bg-zinc-950/90 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
                    />
                    <CarouselNext
                        variant="outline"
                        className="right-0 border-white/20 bg-zinc-950/90 text-white hover:bg-white/10 hover:text-white disabled:opacity-30"
                    />
                </Carousel>
            </div>
        </section>
    );
}
