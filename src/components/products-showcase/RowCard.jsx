"use client";

import Image from "next/image";
import Link from "next/link";

export default function RowCard({ product }) {
    // products.js maps to: image (string) and name (string)
    const imageUrl = product.image || "/placeholder.jpg";

    return (
        <Link href={`/product/${product.slug}`} className="ps-row-card">
            <div className="ps-row-img">
                <Image
                    src={imageUrl}
                    alt={product.name || "Product image"}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                />
            </div>

            <div className="ps-row-info">
                <h4>{product.name}</h4>
                <p>Rs {product.price?.toLocaleString()}</p>
            </div>
        </Link>
    );
}
