import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';

export default function NotFound() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>404</h1>
            <h2 className="h2" style={{ marginBottom: '1rem' }}>Page Not Found</h2>
            <p className="text-muted" style={{ marginBottom: '2rem', maxWidth: '400px' }}>
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link href="/" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={20} />
                Back to Home
            </Link>
        </div>
    );
}
