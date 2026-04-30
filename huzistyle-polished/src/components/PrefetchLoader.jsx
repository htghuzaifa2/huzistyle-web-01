'use client';

import { useEffect } from 'react';

export default function PrefetchLoader() {
    useEffect(() => {
        // Dynamically import the prefetch script so it runs on the client
        import('../prefetch.js');
    }, []);

    return null; // Renders nothing
}
