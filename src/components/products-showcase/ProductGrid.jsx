"use client";

import CircleCard from "./CircleCard";
import RowCard from "./RowCard";
import Skeleton from "./Skeleton";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function ProductGrid({ products }) {
    const { visible, loading, sentinelRef } = useInfiniteScroll(products, 12);

    return (
        <>
            {/* Desktop Circle Grid */}
            <section className="ps-grid ps-desktop">
                {visible.map((p) => (
                    <CircleCard key={p.id} product={p} />
                ))}
            </section>

            {/* Mobile Row List */}
            <section className="ps-list ps-mobile">
                {visible.map((p) => (
                    <RowCard key={p.id} product={p} />
                ))}
            </section>

            {loading && <Skeleton />}

            <div ref={sentinelRef} className="ps-sentinel" />
        </>
    );
}
