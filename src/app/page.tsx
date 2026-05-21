'use client';

import { DesktopHome } from '@/components/home/DesktopHome';
import { PortfolioLoader } from '@/components/loader';

export default function Home() {
    return (
        <PortfolioLoader>
            <DesktopHome />
        </PortfolioLoader>
    );
}
