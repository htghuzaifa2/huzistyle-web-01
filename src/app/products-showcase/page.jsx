"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import "../../styles/products-showcase.css";
import { products } from "../../data/products";

import { shuffleArray } from "../../utils/shuffle";

export default function ProductShowcasePage() {
  const [ready, setReady] = useState(false);
  const [current, setCurrent] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [displayProducts, setDisplayProducts] = useState([]);
  const swiperRef = useRef(null);

  // Persistence & Randomization on Mount
  useEffect(() => {
    document.body.classList.add("ps-active");

    // Randomize products on mount
    const shuffled = shuffleArray(products);

    // Create loop buffer if needed (min 12 items for safe loop with 4 visible)
    const finalProducts = shuffled.length < 12
      ? [...shuffled, ...shuffled, ...shuffled]
      : shuffled;

    setDisplayProducts(finalProducts);

    // Restore state from local storage
    const savedIndex = localStorage.getItem("huzi_showcase_index");
    if (savedIndex) {
      // Ensure index is within new bounds
      const idx = parseInt(savedIndex, 10);
      setCurrent(idx % finalProducts.length);
    }

    const timer = setTimeout(() => setReady(true), 100);

    return () => {
      document.body.classList.remove("ps-active");
      clearTimeout(timer);
    };
  }, []);

  // Persistence: Save index on change
  useEffect(() => {
    localStorage.setItem("huzi_showcase_index", current);
  }, [current]);

  // Sync Swiper with restored state once ready
  useEffect(() => {
    if (ready && swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideToLoop(current, 0);
    }
  }, [ready]);

  // Robust Autoplay Management
  useEffect(() => {
    if (!ready || !swiperRef.current?.swiper) return;

    const swiper = swiperRef.current.swiper;

    if (autoMode) {
      swiper.params.autoplay.delay = 3000;
      swiper.params.autoplay.disableOnInteraction = false;
      swiper.autoplay.start();
    } else {
      swiper.autoplay.stop();
    }
  }, [ready, autoMode]);

  const toggleMode = () => {
    setAutoMode(prev => !prev);
  };

  const currentProduct = displayProducts[current % displayProducts.length] || {};

  // Skeleton
  if (!ready || displayProducts.length === 0) {
    return (
      <div className="ps-container">
        <div className="ps-skeleton">
          <div className="ps-skeleton-glow" />
          <div className="ps-skeleton-bar ps-skeleton-title" />
          <div className="ps-skeleton-bar ps-skeleton-subtitle" />
          <div className="ps-skeleton-cards">
            <div className="ps-skeleton-card side" />
            <div className="ps-skeleton-card main" />
            <div className="ps-skeleton-card side" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ps-container">
      {/* Header */}
      <Link href="/" className="ps-back">← Back</Link>
      <div className="ps-logo">Huzi Style</div>

      {/* Auto/Manual Toggle */}
      <button className="ps-mode-toggle" onClick={toggleMode} title={autoMode ? "Pause Autoplay" : "Start Autoplay"}>
        <span className={`ps-mode-icon ${autoMode ? 'auto' : 'manual'}`}>
          {autoMode ? '⏵' : '||'}
        </span>
        <span className="ps-mode-text">
          {autoMode ? 'Mode: Auto' : 'Mode: Manual'}
        </span>
      </button>

      <div className="ps-title">
        <h1>PRODUCTS <span>SHOWCASE</span></h1>
      </div>

      <div className="ps-swiper-wrapper">
        <Swiper
          ref={swiperRef}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          loop={true}
          speed={1200}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              coverflowEffect: {
                depth: 50,
                modifier: 1,
              }
            },
            768: {
              slidesPerView: 3,
              coverflowEffect: {
                depth: 80,
                modifier: 1.5,
              }
            },
            1024: {
              slidesPerView: 4,
              coverflowEffect: {
                depth: 100,
                modifier: 2,
              }
            }
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation={true}
          onSlideChange={(s) => setCurrent(s.realIndex)}
          className="ps-swiper"
        >
          {displayProducts.map((p, index) => (
            <SwiperSlide key={`${p.id}-${index}`}>
              <Link href={`/product/${p.slug}`} className="ps-card">
                <div className="ps-card-img">
                  <img src={p.image} alt={p.name || "Product"} />
                </div>
                <div className="ps-card-overlay">
                  <span className="ps-card-btn">View Details</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="ps-info">
        <div className="ps-info-id">#{String(currentProduct.id).padStart(3, "0")}</div>
        <h2 className="ps-info-name">{currentProduct.name}</h2>
        <div className="ps-info-price">PKR {currentProduct.price?.toLocaleString()}</div>
      </div>

      <div className="ps-footer">
        <span className="ps-hint">{autoMode ? 'Auto scrolling...' : 'Drag or scroll'}</span>
        <span>{String((current % products.length) + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
