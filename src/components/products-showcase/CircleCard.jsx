"use client";

import Image from "next/image";
import Link from "next/link";

export default function CircleCard({ product }) {
    // products.js maps to: image (string) and name (string)
    const imageUrl = product.image || "/placeholder.jpg";

    return (
        <div className="ps-circle-card">
            <Link href={`/product/${product.slug}`}>
                <div className="ps-circle-img">
                    <Image
                        src={imageUrl}
                        alt={product.name || "Product image"}
                        fill
                        sizes="250px"
                        style={{ objectFit: "cover" }}
                    />
                </div>

                <h3>{product.name}</h3>
                <p>Rs {product.price?.toLocaleString()}</p>
            </Link>
        </div>
    );
}
