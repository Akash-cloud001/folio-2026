'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
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

function GalleryLightbox({
    images,
    index,
    onClose,
    onIndex,
}: {
    images: CaseStudyGalleryImage[];
    index: number;
    onClose: () => void;
    onIndex: (index: number) => void;
}) {
    const titleId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);
    const image = images[index];
    const count = images.length;
    const hasMany = count > 1;

    useEffect(() => {
        closeRef.current?.focus();
    }, []);

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onClose();
                return;
            }
            if (!hasMany) return;
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                onIndex((index + 1) % count);
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                onIndex((index - 1 + count) % count);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [count, hasMany, index, onClose, onIndex]);

    if (!image) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black px-16 py-16 sm:px-20"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={onClose}
        >
            <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-zinc-950 text-white hover:bg-white/10"
                aria-label="Close"
            >
                <X className="size-4" />
            </button>

            {hasMany ? (
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onIndex((index - 1 + count) % count);
                    }}
                    className="absolute top-1/2 left-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-950 text-white hover:bg-white/10 sm:left-6"
                    aria-label="Previous image"
                >
                    <ChevronLeft className="size-5" />
                </button>
            ) : null}

            <figure className="flex w-full max-w-5xl flex-col" onClick={(event) => event.stopPropagation()}>
                <div className="relative h-[min(68dvh,820px)] w-full">
                    <Image
                        src={image.image}
                        alt={image.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-contain"
                        priority
                    />
                </div>
                <figcaption className="mt-4 text-center">
                    <p id={titleId} className="text-sm font-medium text-white">
                        {image.title}
                    </p>
                    {hasMany ? (
                        <p className="mt-2 font-geist-mono text-[10px] uppercase tracking-wider text-zinc-500">
                            {index + 1} / {count}
                        </p>
                    ) : null}
                </figcaption>
            </figure>

            {hasMany ? (
                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation();
                        onIndex((index + 1) % count);
                    }}
                    className="absolute top-1/2 right-4 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-zinc-950 text-white hover:bg-white/10 sm:right-6"
                    aria-label="Next image"
                >
                    <ChevronRight className="size-5" />
                </button>
            ) : null}
        </div>,
        document.body,
    );
}

export function CaseStudyGallery({ title, images, layout }: CaseStudyGalleryProps) {
    const isGrid = layout === 'grid';
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const pointerStart = useRef({ x: 0, y: 0 });
    const returnFocus = useRef<HTMLButtonElement | null>(null);

    function close() {
        setActiveIndex(null);
        returnFocus.current?.focus();
    }

    function openFromClick(event: React.MouseEvent<HTMLButtonElement>, index: number) {
        const dx = event.clientX - pointerStart.current.x;
        const dy = event.clientY - pointerStart.current.y;
        if (dx * dx + dy * dy > 36) return;
        returnFocus.current = event.currentTarget;
        setActiveIndex(index);
    }

    return (
        <section className="mt-16 border-t border-white/10 pt-14">
            <p className="font-geist-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{title}</p>

            <div className="relative mt-8 w-full">
                <Carousel
                    opts={{
                        align: 'start',
                        loop: images.length > 1,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-3 sm:-ml-4">
                        {images.map((img, index) => (
                            <CarouselItem
                                key={img.title}
                                className={
                                    isGrid
                                        ? 'basis-full pl-3 sm:basis-1/2 sm:pl-4'
                                        : 'basis-full pl-3 sm:basis-[88%] sm:pl-4 md:basis-[75%]'
                                }
                            >
                                <figure>
                                    <button
                                        type="button"
                                        className="block w-full cursor-zoom-in text-left"
                                        aria-label={`View ${img.title}`}
                                        onPointerDown={(event) => {
                                            pointerStart.current = { x: event.clientX, y: event.clientY };
                                        }}
                                        onClick={(event) => openFromClick(event, index)}
                                    >
                                        <GallerySlideImage src={img.image} alt="" />
                                    </button>
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

            {activeIndex !== null ? (
                <GalleryLightbox
                    images={images}
                    index={activeIndex}
                    onClose={close}
                    onIndex={setActiveIndex}
                />
            ) : null}
        </section>
    );
}
