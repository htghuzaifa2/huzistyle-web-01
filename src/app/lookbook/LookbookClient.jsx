'use client';

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination, EffectCreative, Parallax } from 'swiper/modules';
import { products } from '../../data/products';
import { shuffleArray } from '../../utils/shuffle';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const LookbookClient = () => {
  const [slides, setSlides] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const shuffle = shuffleArray;
    const productSlides = products
      .filter(p => p.image)
      .map(p => ({ ...p, type: 'product' }));
    const randomizedProducts = shuffle(productSlides);
    setSlides(randomizedProducts);
  }, []);

  if (!isClient) return <div style={{ background: 'black', height: '100vh' }} />;

  return (
    <div className="lookbook-container">
      <Swiper
        direction={'vertical'}
        slidesPerView={1}
        spaceBetween={0}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          thresholdDelta: 50,
          thresholdTime: 400,
        }}
        loop={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        effect={'creative'}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, "-20%", -1],
          },
          next: {
            translate: [0, "100%", 0],
          },
        }}
        speed={800}
        modules={[Mousewheel, Pagination, EffectCreative, Parallax]}
        className="mySwiper"
      >
        {slides.map((item, index) => (
          <SwiperSlide key={`${item.id}-${index}`}>
            <div className="slide-content">
              <div
                className="slide-image-blur"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div
                className="slide-image-contain"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="slide-overlay">
                <div className="slide-text-content fade-in-up">
                  <h2 className="slide-super-label">{item.category}</h2>
                  <h1 className="slide-title-display">{item.name}</h1>
                  <p className="slide-price-display">$ {item.price.toLocaleString()}</p>
                  <div className="slide-actions">
                    <Link href={`/product/${item.slug}`} className="btn btn-premium-small">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .lookbook-container {
          height: 100vh;
          width: 100%;
          background: #000;
          position: relative;
          overflow: hidden;
        }

        .mySwiper {
          width: 100%;
          height: 100%;
        }

        .slide-content {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .slide-image-blur {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          filter: blur(60px) brightness(0.3);
          transform: scale(1.2);
          z-index: 1;
        }

        .slide-image-contain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          z-index: 2;
        }

        .slide-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.6) 30%, transparent);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 4rem;
          text-align: center;
          z-index: 3;
          pointer-events: none;
        }
        
        .slide-actions {
            pointer-events: auto;
        }

        .slide-text-content {
          color: white;
          max-width: 600px;
          padding: 2rem;
          text-shadow: 0 4px 10px rgba(0,0,0,0.8);
        }

        .slide-super-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 0.5rem;
          opacity: 0.8;
          font-weight: 500;
        }

        .slide-title-display {
          font-size: 1.75rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          letter-spacing: 0.5px;
          text-transform: capitalize;
        }

        .slide-price-display {
          font-size: 1rem;
          margin-bottom: 1.5rem;
          font-weight: 300;
          opacity: 0.9;
        }

        .btn-premium-small {
          display: inline-block;
          padding: 0.75rem 2rem;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: white;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.4);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
          border-radius: 2px;
          cursor: pointer;
          text-decoration: none;
        }

        .btn-premium-small:hover {
          background: white;
          color: black;
          border-color: white;
          transform: translateY(-2px);
        }

        .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: white !important;
          opacity: 0.4;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.5);
        }

        @media (max-width: 768px) {
          .slide-title-display {
            font-size: 1.5rem;
          }
          .slide-overlay {
            padding-bottom: 6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LookbookClient;
