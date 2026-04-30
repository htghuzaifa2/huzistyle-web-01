import { seoConfig } from '../../config/seoConfig';

export const metadata = {
    title: seoConfig.sizeGuide.title,
    description: seoConfig.sizeGuide.description,
    keywords: seoConfig.sizeGuide.keywords,
    openGraph: {
        title: seoConfig.sizeGuide.title,
        description: seoConfig.sizeGuide.description,
        url: seoConfig.sizeGuide.canonicalUrl,
        images: [
            {
                url: seoConfig.sizeGuide.ogImage,
            },
        ],
        type: 'website',
    },
    alternates: {
        canonical: seoConfig.sizeGuide.canonicalUrl,
    },
};

export default function SizeGuidePage() {
    return (
        <div className="content-page container">
            <div className="content-header">
                <h1 className="page-title">Size Guide</h1>
                <p className="page-subtitle">Find your perfect fit. All sizes available + FREE custom sizing!</p>
            </div>

            {/* Key Message */}
            <div className="content-section" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))', color: 'white', border: 'none' }}>
                <h2 style={{ color: 'white' }}>✨ FREE Custom Sizing ✨</h2>
                <p style={{ fontSize: '1.2rem', color: 'white' }}>Need a custom size? No problem! We offer FREE custom sizing on all products. Just provide your measurements when ordering via WhatsApp.</p>
            </div>

            {/* Standard Sizes */}
            <div className="content-section">
                <h2>📏 Standard Size Charts</h2>

                <h3 className="mt-8">Men's Sizes</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Size</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Chest (inches)</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Waist (inches)</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Length (inches)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>S</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>36-38</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>30-32</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>27-28</td>
                            </tr>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>M</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>38-40</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>32-34</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>28-29</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>L</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>40-42</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>34-36</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>29-30</td>
                            </tr>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>XL</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>42-44</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>36-38</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>30-31</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>XXL</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>44-46</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>38-40</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>31-32</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-8">Women's Sizes</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Size</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Bust (inches)</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Waist (inches)</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Hips (inches)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>S</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>32-34</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>26-28</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>36-38</td>
                            </tr>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>M</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>34-36</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>28-30</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>38-40</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>L</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>36-38</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>30-32</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>40-42</td>
                            </tr>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>XL</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>38-40</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>32-34</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>42-44</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>XXL</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>40-42</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>34-36</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>44-46</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3 className="mt-8">Kids' Sizes</h3>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Size</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Age</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Height (inches)</th>
                                <th style={{ padding: '12px', border: '1px solid var(--color-border)' }}>Chest (inches)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>4-5Y</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>4-5 years</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>41-45</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>23-24</td>
                            </tr>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>6-7Y</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>6-7 years</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>45-49</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>24-26</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>8-9Y</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>8-9 years</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>49-53</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>26-28</td>
                            </tr>
                            <tr style={{ background: 'var(--color-bg-secondary)' }}>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>10-11Y</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>10-11 years</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>53-57</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>28-30</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>12-13Y</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>12-13 years</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>57-61</td>
                                <td style={{ padding: '12px', border: '1px solid var(--color-border)', textAlign: 'center' }}>30-32</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* How to Measure */}
            <div className="content-section">
                <h2>📐 How to Measure Yourself</h2>
                <div className="steps-grid">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Chest/Bust</h3>
                        <p>Measure around the fullest part of your chest/bust, keeping the tape parallel to the ground</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Waist</h3>
                        <p>Measure around your natural waistline, at the narrowest point</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Hips</h3>
                        <p>Measure around the fullest part of your hips</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">4</div>
                        <h3>Length</h3>
                        <p>Measure from shoulder to desired hem length</p>
                    </div>
                </div>
            </div>

            {/* Custom Sizing Process */}
            <div className="content-section">
                <h2>🎯 How Custom Sizing Works</h2>
                <p><strong>Getting a custom size is easy and completely FREE!</strong></p>
                <ol className="numbered-list">
                    <li>Choose your product and select "Custom Size" option</li>
                    <li>During WhatsApp checkout, provide your measurements (Chest, Waist, Length, etc.)</li>
                    <li>We'll confirm your measurements with you</li>
                    <li>Your garment will be tailored to your exact specifications</li>
                    <li>Delivered to your door in 7-10 business days</li>
                </ol>
                <p className="mt-4"><strong>No extra charges. No hassle. Perfect fit guaranteed.</strong></p>
            </div>

            {/* FAQ */}
            <div className="content-section">
                <h2>❓ Sizing FAQs</h2>
                <div className="content-grid-layout">
                    <div className="content-card">
                        <h3>Do custom sizes cost extra?</h3>
                        <p>No! Custom sizing is completely FREE on all Huzi Style products.</p>
                    </div>
                    <div className="content-card">
                        <h3>How long does custom sizing take?</h3>
                        <p>Custom sized orders take 7-10 business days (slightly longer than standard sizes).</p>
                    </div>
                    <div className="content-card">
                        <h3>What if I'm between sizes?</h3>
                        <p>We recommend going for the larger size or opting for custom sizing for a perfect fit.</p>
                    </div>
                    <div className="content-card">
                        <h3>Can I return custom sized items?</h3>
                        <p>Custom sized items can be exchanged if measurements were incorrectly provided by us.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
