'use client';

import ClickSpark from '@/components/ClickSpark';
import { DesktopHome } from '@/components/home/DesktopHome';
import { PortfolioLoader } from '@/components/loader';

export function HomeClient() {
    return (
        <PortfolioLoader>
            <ClickSpark
                sparkColor="#ffffff"
                sparkSize={10}
                sparkRadius={20}
                sparkCount={8}
                duration={400}
            >
                <DesktopHome />
            </ClickSpark>
        </PortfolioLoader>
    );
}
