'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    BACKGROUND_OPTIONS,
    isBackgroundId,
    type BackgroundId,
} from '@/lib/backgrounds';
import { cn } from '@/lib/utils';

type BackgroundSelectProps = {
    value: BackgroundId;
    onChange: (id: BackgroundId) => void;
    className?: string;
};

/** Window body — drag / focus handled by parent `Window`. */
export function BackgroundSelect({ value, onChange, className }: BackgroundSelectProps) {
    const active = BACKGROUND_OPTIONS.find((option) => option.id === value);

    return (
        <div className={cn('w-full p-2', className)}>
            <Select
                value={value}
                onValueChange={(next) => {
                    if (isBackgroundId(next)) onChange(next);
                }}
            >
                <SelectTrigger
                    aria-label="Desktop background"
                    className={cn(
                        'h-auto min-h-11 w-full items-start border-white/15 bg-white/5 px-2.5 py-2 font-mono text-white shadow-none',
                        'hover:bg-white/10 hover:text-white',
                        'focus-visible:border-white/30 focus-visible:ring-white/20',
                        '[&_svg]:mt-0.5 [&_svg]:text-zinc-400',
                        '*:data-[slot=select-value]:line-clamp-none *:data-[slot=select-value]:items-start'
                    )}
                >
                    <SelectValue placeholder="Select background">
                        <span className="flex min-w-0 flex-col items-start gap-0.5 text-left">
                            <span className="text-[11px] font-semibold uppercase tracking-wide">
                                {active?.label ?? 'Background'}
                            </span>
                            <span className="text-[10px] font-normal normal-case tracking-normal text-zinc-500">
                                {active?.hint}
                            </span>
                        </span>
                    </SelectValue>
                </SelectTrigger>
                <SelectContent
                    position="popper"
                    align="end"
                    className="z-[100] min-w-[12rem] border-white/15 bg-popover/95 text-popover-foreground backdrop-blur-xl"
                >
                    {BACKGROUND_OPTIONS.map((option) => (
                        <SelectItem
                            key={option.id}
                            value={option.id}
                            textValue={option.label}
                            className="font-mono focus:bg-white/10 focus:text-white"
                        >
                            <span className="flex flex-col gap-0.5 py-0.5">
                                <span className="text-[11px] uppercase tracking-wide">
                                    {option.label}
                                </span>
                                <span className="text-[10px] normal-case tracking-normal text-zinc-500">
                                    {option.hint}
                                </span>
                            </span>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
