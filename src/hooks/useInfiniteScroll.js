"use client";

import { useEffect, useRef, useState } from "react";

export default function useInfiniteScroll(items, batch = 12) {
    const [count, setCount] = useState(batch);
    const [loading, setLoading] = useState(false);
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && count < items.length) {
                    setLoading(true);
                    setTimeout(() => {
                        setCount((c) => c + batch);
                        setLoading(false);
                    }, 400);
                }
            },
            { threshold: 0.7 }
        );

        if (sentinelRef.current) observer.observe(sentinelRef.current);

        return () => observer.disconnect();
    }, [count, items.length, batch]);

    return {
        visible: items.slice(0, count),
        loading,
        sentinelRef,
    };
}
