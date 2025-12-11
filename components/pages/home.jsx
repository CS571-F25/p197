import { useState } from 'react';
import Footer from '../footer.jsx';

export default function Home (props) {
    const [isImageEnlarged, setIsImageEnlarged] = useState(false);
    const skyMapSrc = new URL('../../src/assets/images/sky-map2.jpg', import.meta.url).href;

    const handleImageClick = () => {
        setIsImageEnlarged(!isImageEnlarged);
    };

    return (
        <div className="page-content home-page">
            <div className="home-hero">
                <h1>Welcome!</h1>
                <p className="home-intro">
                    The night sky is home to some of the most fascinating and beautiful objects in the universe. Learn about the most prominent features by exploring their dedicated pages and bookmark them for later.
                </p>
            </div>

            <div className="home-skymap-container">
                <img 
                    src={skyMapSrc}
                    alt="Full Sky Map showing all constellations" 
                    className="home-skymap"
                    onClick={handleImageClick}
                    style={{ cursor: 'zoom-in' }}
                />
                <p className="home-skymap-caption">
                    Sky map showing the positions of constellations throughout the night sky
                </p>
            </div>

            <div className="home-guide-section">
                <h2>Don't know where to begin?</h2>
                <div className="home-guide-cards">
                    <div className="home-guide-card">
                        <h3>Stars</h3>
                        <p>Explore our collection of over 100 of the brightest and most notable stars visible from Earth. Learn about their types, luminosity, and the constellations they belong to.</p>
                    </div>
                    <div className="home-guide-card">
                        <h3>Constellations</h3>
                        <p>Discover all 88 officially recognized constellations from both hemispheres. Each constellation comes with its mythology, notable stars, and best viewing seasons.</p>
                    </div>
                    <div className="home-guide-card">
                        <h3>Bookmarks</h3>
                        <p>Save your favorite stars and constellations for easy access. Build your personal collection of celestial objects and organize your astronomical observations.</p>
                    </div>
                </div>
            </div>

            <div className="home-features">
             
            </div>

            {isImageEnlarged && (
                <div className="image-lightbox" onClick={handleImageClick}>
                    <button className="image-lightbox-close" onClick={handleImageClick} aria-label="Close enlarged image">
                        ×
                    </button>
                    <img src={skyMapSrc} alt="Full Sky Map showing all constellations" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            <Footer />
        </div>
    );
}