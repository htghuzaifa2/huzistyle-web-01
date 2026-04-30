import { seoConfig } from '../../config/seoConfig';
import LookbookClient from './LookbookClient';

export const metadata = {
  title: "Lookbook - Huzi Style",
  description: "Explore the Huzi Style Lookbook. A curated showcase of our premium streetwear collections and artistic vision.",
  openGraph: {
    title: "Lookbook - Huzi Style",
    description: "Explore the Huzi Style Lookbook. A curated showcase of our premium streetwear collections.",
    url: "/lookbook",
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Huzi Style Lookbook',
      }
    ]
  },
};

export default function LookbookPage() {
  return <LookbookClient />;
}
