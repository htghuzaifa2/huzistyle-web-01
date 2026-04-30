'use client';

import { useEffect } from 'react';

export default function Prefetch() {
    useEffect(() => {
        import('../prefetch.js');
    }, []);

    return null;
}
