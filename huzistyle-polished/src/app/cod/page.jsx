import Link from 'next/link';

export const metadata = {
    title: "Secure Payment Methods | Huzi Style",
    description: "Learn about Huzi Style's premium and secure payment options for international orders.",
};

export default function CODPage() {
    return (
        <div className="content-page container" style={{ padding: '80px 0', textAlign: 'center' }}>
            <div className="content-header">
                <h1 className="h2 page-title">Payment Methods Updated</h1>
                <p className="page-subtitle" style={{ maxWidth: '600px', margin: '0 auto 2rem' }}>
                    We have transitioned to strictly professional international payment methods to better serve our global community.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <Link href="/shipping" className="btn btn-primary">View Global Logistics</Link>
                    <Link href="/shop" className="btn btn-outline">Return to Shop</Link>
                </div>
            </div>
        </div>
    );
}
