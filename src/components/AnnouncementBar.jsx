'use client';

import React from 'react';

const AnnouncementBar = () => {
    return (
        <div className="announcement-bar">
            <div className="ticker-container">
                <div className="ticker-track">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="ticker-content">
                            <span className="ticker-item">WORLDWIDE SHIPPING</span>
                            <span className="ticker-separator">•</span>
                            <span className="ticker-item">PARIS</span>
                            <span className="ticker-separator">•</span>
                            <span className="ticker-item">LONDON</span>
                            <span className="ticker-separator">•</span>
                            <span className="ticker-item">DUBAI</span>
                            <span className="ticker-separator">•</span>
                            <span className="ticker-item">LAHORE</span>
                            <span className="ticker-separator">•</span>
                            <span className="ticker-item">NEW YORK</span>
                            <span className="ticker-separator">•</span>
                            <span className="ticker-item">TOKYO</span>
                            <span className="ticker-separator">•</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .announcement-bar {
                    background-color: #000;
                    color: #fff;
                    padding: 8px 0;
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    overflow: hidden;
                    white-space: nowrap;
                    position: relative;
                    z-index: 1001;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                
                .ticker-container {
                    overflow: hidden;
                    width: 100%;
                }

                .ticker-track {
                    display: flex;
                    width: max-content;
                    animation: tickerScroll 40s linear infinite;
                }

                .ticker-content {
                    display: inline-flex;
                    align-items: center;
                    gap: 1.5rem;
                    padding-right: 1.5rem;
                }
                
                .ticker-separator {
                    opacity: 0.3;
                }
                
                .ticker-item {
                    opacity: 0.8;
                    transition: opacity 0.3s ease;
                }
                
                .ticker-item:hover {
                    opacity: 1;
                }
                
                @keyframes tickerScroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }

                @media (max-width: 768px) {
                    .announcement-bar {
                        padding: 6px 0;
                        font-size: 9px;
                        letter-spacing: 1.5px;
                    }
                    .ticker-track {
                        animation-duration: 25s;
                    }
                }
            `}</style>
        </div>
    );
};

export default AnnouncementBar;
