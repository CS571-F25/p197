import { useState } from 'react';
import Footer from '../footer.jsx';

export default function GeneralInfo() {
    const [enlargedImage, setEnlargedImage] = useState(null);

    const handleImageClick = (imageSrc) => {
        setEnlargedImage(imageSrc);
    };

    const handleCloseImage = () => {
        setEnlargedImage(null);
    };

    return (
        <div className="page-content general-info-page">
            <h1>Introduction to Stars</h1>

            <section className="info-section">
                <h2>What is a Constellation?</h2>
                <div className="info-content">
                    <div className="info-text">
                        <p>
                            A constellation is a group of stars that forms an imaginary outline or pattern in the night sky. 
                            These patterns have been recognized and named by different cultures throughout history, often 
                            representing mythological figures, animals, or objects.
                        </p>
                        <p>
                            The International Astronomical Union (IAU) officially recognizes 88 constellations, which cover 
                            the entire celestial sphere. These constellations serve as a way to organize and navigate the 
                            night sky, making it easier to locate specific stars and celestial objects.
                        </p>
                        <p>
                            Constellations are not physical groupings of stars. The stars in a constellation may be at vastly 
                            different distances from Earth and have no actual connection to each other. They simply appear to 
                            form patterns from our perspective on Earth.
                        </p>
                    </div>
                    <div className="info-image-placeholder">
                        <img 
                            src={new URL('../../src/assets/images/ursa-major.jpg', import.meta.url).href} 
                            alt="Constellation pattern example" 
                            onClick={() => handleImageClick(new URL('../../src/assets/images/ursa-major.jpg', import.meta.url).href)}
                            style={{ cursor: 'zoom-in' }}
                        />
                        <p className="image-caption">Ursa Major in the night sky</p>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <h2>What is a Star?</h2>
                <div className="info-content">
                    <div className="info-text">
                        <p>
                            A star is a massive, luminous sphere of plasma held together by its own gravity. Stars are the 
                            fundamental building blocks of galaxies and the source of most chemical elements in the universe. 
                            They generate energy through nuclear fusion in their cores, converting hydrogen into helium and 
                            releasing tremendous amounts of light and heat.
                        </p>
                        <p>
                            Stars come in various sizes, colors, and temperatures. The color of a star indicates its surface 
                            temperature: blue stars are the hottest, while red stars are the coolest. Our own Sun is a 
                            medium-sized yellow star classified as a G-type main-sequence star.
                        </p>
                        <p>
                            Stars have life cycles that span millions to billions of years. They are born in nebulae, 
                            spend most of their lives on the main sequence, and eventually die in various ways depending 
                            on their mass - some become white dwarfs, while the most massive stars explode as supernovae.
                        </p>
                    </div>
                    <div className="info-image-placeholder">
                        <img 
                            src={new URL('../../src/assets/images/star-types.jpg', import.meta.url).href} 
                            alt="Star types comparison" 
                            onClick={() => handleImageClick(new URL('../../src/assets/images/star-types.jpg', import.meta.url).href)}
                            style={{ cursor: 'zoom-in' }}
                        />
                        <p className="image-caption">Different types of stars compared by size and color</p>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <h2>Understanding Stellar Luminosity</h2>
                <div className="info-content">
                    <div className="info-text">
                        <p>
                            Luminosity is the total amount of energy a star radiates per unit of time. It is one of the 
                            most important properties of a star and is measured in terms of solar luminosities (the Sun's 
                            luminosity = 1 L☉).
                        </p>
                        <p>
                            A star's luminosity depends primarily on two factors: its size and its surface temperature. 
                            Larger stars and hotter stars are generally more luminous. For example, a blue supergiant 
                            can be hundreds of thousands of times more luminous than our Sun, while a red dwarf might 
                            be only a fraction of the Sun's luminosity.
                        </p>
                        <p>
                            It's important to distinguish between luminosity and apparent brightness. Luminosity is the 
                            intrinsic brightness of a star, while apparent brightness is how bright it appears from Earth, 
                            which depends on both luminosity and distance. A very luminous star far away might appear 
                            dimmer than a less luminous star that is closer to us.
                        </p>
                    </div>
                    <div className="info-image-placeholder">
                        <img 
                            src={new URL('../../src/assets/images/russell.jpg', import.meta.url).href} 
                            alt="Stellar luminosity diagram" 
                            onClick={() => handleImageClick(new URL('../../src/assets/images/russell.jpg', import.meta.url).href)}
                            style={{ cursor: 'zoom-in' }}
                        />
                        <p className="image-caption">Hertzsprung-Russell diagram showing stellar luminosity</p>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <h2>Star Types and Classifications</h2>
                <div className="info-content-full">
                    <p className="intro-text">
                        Stars are classified by their spectral type, luminosity class, and other characteristics. 
                        Here are the main types of stars you'll encounter:
                    </p>
                    
                    <div className="star-types-grid">
                        <div className="star-type-card">
                            <h3>Blue Supergiant</h3>
                            <p>
                                Extremely massive and luminous stars with surface temperatures exceeding 30,000 K. 
                                They are among the brightest stars in the universe and have short lifespans of only 
                                a few million years. Examples include Rigel and Deneb.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Red Supergiant</h3>
                            <p>
                                Massive evolved stars in the late stages of their lives, with cooler surface temperatures 
                                (3,000-4,000 K) but enormous sizes. They can be hundreds of times larger than the Sun. 
                                Examples include Betelgeuse and Antares.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Blue Giant</h3>
                            <p>
                                Large, hot stars with surface temperatures between 10,000-30,000 K. They are less massive 
                                than supergiants but still very luminous. These stars burn through their fuel quickly 
                                and have relatively short lifespans.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Red Giant</h3>
                            <p>
                                Evolved stars that have exhausted hydrogen in their cores and expanded significantly. 
                                Despite their large size, they have relatively cool surfaces (3,000-5,000 K), giving 
                                them their red color. Our Sun will become a red giant in about 5 billion years.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Orange Giant</h3>
                            <p>
                                Intermediate-sized evolved stars with surface temperatures between red giants and yellow 
                                giants (4,000-5,200 K). They represent a transitional stage in stellar evolution. 
                                Arcturus is a famous example of an orange giant.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Yellow Giant</h3>
                            <p>
                                Stars in a phase of stellar evolution with surface temperatures similar to or slightly 
                                cooler than the Sun (5,200-6,000 K), but much larger in size. They have exhausted 
                                hydrogen in their cores and are expanding.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>White Dwarf</h3>
                            <p>
                                The final evolutionary state of stars like our Sun. These are extremely dense, Earth-sized 
                                remnants composed primarily of electron-degenerate matter. They no longer undergo fusion 
                                but slowly cool over billions of years. Sirius B is a well-known white dwarf.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Main Sequence Star</h3>
                            <p>
                                Stars in the most stable phase of their lives, fusing hydrogen into helium in their cores. 
                                This category includes stars of many different masses, temperatures, and colors. Our Sun 
                                is a main sequence star and will remain so for another 5 billion years.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Subgiant</h3>
                            <p>
                                Stars that have exhausted the hydrogen in their cores and are beginning to evolve off 
                                the main sequence. They are larger and brighter than main sequence stars of the same 
                                temperature but have not yet become true giants.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Binary Star</h3>
                            <p>
                                A system of two stars orbiting around their common center of mass. Binary stars are 
                                extremely common in the universe - it's estimated that over half of all stars exist 
                                in binary or multiple star systems. They can exchange mass and influence each other's evolution.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Variable Star</h3>
                            <p>
                                Stars whose brightness as seen from Earth fluctuates over time. This can be due to 
                                intrinsic changes in the star itself (like pulsations) or extrinsic factors (like 
                                eclipsing binaries). Variable stars are important for measuring cosmic distances.
                            </p>
                        </div>

                        <div className="star-type-card">
                            <h3>Hypergiant</h3>
                            <p>
                                The most massive and luminous stars known, with masses exceeding 100 times that of the Sun. 
                                They are extremely rare and unstable, often ejecting material into space. These stars have 
                                very short lifespans of only a few million years before exploding as supernovae.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            {enlargedImage && (
                <div className="image-lightbox" onClick={handleCloseImage}>
                    <button className="image-lightbox-close" onClick={handleCloseImage} aria-label="Close enlarged image">
                        ×
                    </button>
                    <img src={enlargedImage} alt="Enlarged view" onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </div>
    );
}
