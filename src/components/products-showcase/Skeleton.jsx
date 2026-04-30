"use client";

export default function Skeleton() {
    return (
        <div className="ps-skeleton-container">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="ps-skeleton-item">
                    <div className="ps-skeleton-circle" />
                    <div className="ps-skeleton-text" />
                    <div className="ps-skeleton-text short" />
                </div>
            ))}
        </div>
    );
}
