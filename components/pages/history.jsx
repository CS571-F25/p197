import Footer from '../footer.jsx';

export default function History() {
    return (
        <div className="page-content history-page">
            <main>
                <h1>History of Constellations</h1>

                <section className="info-section">
                <h2>Origins and Creation</h2>
                <div className="info-content-full">
                    <div className="info-text">
                        <p>
                            The practice of grouping stars into constellations dates back thousands of years to ancient 
                            civilizations. Different cultures around the world created their own patterns in the night sky, 
                            often reflecting their mythology, religious beliefs, and cultural values.
                        </p>
                        <p>
                            The earliest known records of constellations come from ancient Mesopotamia, around 3000 BCE. 
                            The Babylonians identified many star patterns that would later influence Greek astronomy. 
                            Ancient Egyptian, Chinese, and Indian civilizations also developed their own constellation systems 
                            independently, each with unique stories and meanings.
                        </p>
                        <p>
                            The Greek astronomer Ptolemy documented 48 constellations in his work "Almagest" around 150 CE. 
                            These classical constellations formed the foundation of the modern system used today. Many of these 
                            patterns were associated with heroes, creatures, and objects from Greek mythology, such as Orion 
                            the Hunter, Ursa Major the Great Bear, and Perseus the Hero.
                        </p>
                        <p>
                            During the Age of Exploration (15th-18th centuries), European astronomers explored the southern 
                            skies previously invisible from Mediterranean latitudes. They created new constellations to fill 
                            the gaps, often naming them after scientific instruments and exotic animals rather than 
                            mythological figures.
                        </p>
                        <p>
                            In 1922, the International Astronomical Union (IAU) officially recognized 88 constellations, 
                            establishing precise boundaries for each one. This standardization ensures that every point in 
                            the sky belongs to exactly one constellation, making it easier for astronomers worldwide to 
                            communicate about celestial objects.
                        </p>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <h2>Constellation Families</h2>
                <div className="info-content-full">
                    <p className="intro-text">
                        The 88 modern constellations are organized into several families based on their origins, locations, 
                        and the astronomers who charted them. Understanding these families helps us appreciate the rich 
                        history and cultural context of the constellations we see today.
                    </p>
                    
                    <div className="constellation-families">
                        <div className="family-card">
                            <h3>Ursa Major Family</h3>
                            <p>
                                This family contains 10 constellations located in the northern celestial hemisphere. Most of 
                                these constellations were cataloged by Ptolemy and are among the most ancient and recognizable 
                                patterns in the night sky.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Ursa Major (Great Bear), Ursa Minor (Little Bear), Draco (Dragon), 
                                Canes Venatici (Hunting Dogs), Boötes (Herdsman), Coma Berenices (Berenice's Hair), 
                                Corona Borealis (Northern Crown), Camelopardalis (Giraffe), Lynx, and Leo Minor (Little Lion).
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>Zodiac Family</h3>
                            <p>
                                The 12 zodiac constellations lie along the ecliptic, the apparent path the Sun traces across 
                                the sky over the course of a year. These constellations have been recognized since ancient 
                                Babylonian times and hold significant cultural and astrological importance across many civilizations.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Aries (Ram), Taurus (Bull), Gemini (Twins), Cancer (Crab), 
                                Leo (Lion), Virgo (Virgin), Libra (Scales), Scorpius (Scorpion), Sagittarius (Archer), 
                                Capricornus (Sea Goat), Aquarius (Water Bearer), and Pisces (Fishes).
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>Perseus Family</h3>
                            <p>
                                This family consists of 9 constellations associated with the Greek myth of Perseus, who rescued 
                                Princess Andromeda from the sea monster Cetus. All these constellations were known to ancient 
                                Greek astronomers and appear in Ptolemy's catalog.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Perseus (Hero), Andromeda (Princess), Cassiopeia (Queen), 
                                Cepheus (King), Cetus (Sea Monster), Pegasus (Winged Horse), Auriga (Charioteer), 
                                Lacerta (Lizard), and Triangulum (Triangle).
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>Hercules Family</h3>
                            <p>
                                Named after the legendary Greek hero Hercules, this family contains 19 constellations, most of 
                                which were documented by Ptolemy. Many represent characters, creatures, and objects associated 
                                with the twelve labors of Hercules and other Greek myths.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Includes Hercules, Aquila (Eagle), Sagitta (Arrow), Lyra (Lyre), 
                                Cygnus (Swan), Ophiuchus (Serpent Bearer), Serpens (Serpent), Corona Australis (Southern Crown), 
                                and others including centaurs, birds, and mythological creatures.
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>Orion Family</h3>
                            <p>
                                This family of 5 constellations centers around Orion the Hunter, one of the most distinctive and 
                                recognizable patterns in the night sky. These constellations tell the story of Orion's hunting 
                                companions and prey.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Orion (Hunter), Canis Major (Great Dog), Canis Minor (Little Dog), 
                                Lepus (Hare), and Monoceros (Unicorn).
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>Heavenly Waters Family</h3>
                            <p>
                                This family consists of 9 constellations with aquatic or water-related themes. Most of these 
                                are ancient constellations documented by Ptolemy, representing fish, dolphins, rivers, and 
                                sea creatures from various mythologies.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Delphinus (Dolphin), Equuleus (Little Horse), Eridanus (River), 
                                Piscis Austrinus (Southern Fish), Carina (Keel), Puppis (Stern), Vela (Sails), Pyxis (Compass), 
                                and Columba (Dove).
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>Bayer Family</h3>
                            <p>
                                Created by German astronomer Johann Bayer in his 1603 star atlas "Uranometria," these 11 southern 
                                constellations were among the first to be charted by European explorers of the southern hemisphere. 
                                Many represent exotic animals and objects unfamiliar to ancient Mediterranean astronomers.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Hydrus (Water Snake), Dorado (Dolphinfish), Volans (Flying Fish), 
                                Apus (Bird of Paradise), Pavo (Peacock), Grus (Crane), Phoenix, Tucana (Toucan), Indus (Indian), 
                                Chamaeleon (Chameleon), and Musca (Fly).
                            </p>
                        </div>

                        <div className="family-card">
                            <h3>La Caille Family</h3>
                            <p>
                                French astronomer Nicolas Louis de Lacaille created 14 constellations during his 1751-1752 
                                expedition to the Cape of Good Hope. Unlike earlier astronomers who used mythological names, 
                                Lacaille chose names representing scientific instruments and tools of the Enlightenment era.
                            </p>
                            <p className="family-members">
                                <strong>Members:</strong> Norma (Square), Circinus (Compass), Telescopium (Telescope), 
                                Microscopium (Microscope), Sculptor (Sculptor's Workshop), Fornax (Furnace), Horologium (Clock), 
                                Octans (Octant), Mensa (Table Mountain), Reticulum (Reticle), Caelum (Chisel), Pictor (Painter's Easel), 
                                Antlia (Air Pump), and Pyxis (Compass Box).
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="info-section">
                <h2>Constellation Categories</h2>
                <div className="info-content-full">
                    <p className="intro-text">
                        Constellations are also classified based on their visibility and location in the sky. These 
                        categories help observers understand which constellations they can see from their location on Earth.
                    </p>
                    
                    <div className="category-grid">
                        <div className="category-card">
                            <h3>Northern Constellations</h3>
                            <p>
                                Northern constellations are located in the northern celestial hemisphere, which is the half of 
                                the sky north of the celestial equator. These constellations are best viewed from locations in 
                                the Northern Hemisphere, though some may be partially visible from equatorial and southern regions.
                            </p>
                            <p>
                                There are 36 modern northern constellations, including many of the most famous patterns like 
                                Ursa Major, Cassiopeia, and Perseus. Ancient Greek and Roman astronomers primarily documented 
                                these constellations since they were based in northern latitudes.
                            </p>
                            <p>
                                <strong>Examples:</strong> Andromeda, Cepheus, Draco, Hercules, Lyra, Pegasus
                            </p>
                        </div>

                        <div className="category-card">
                            <h3>Southern Constellations</h3>
                            <p>
                                Southern constellations occupy the southern celestial hemisphere, south of the celestial equator. 
                                These 52 constellations are best visible from the Southern Hemisphere, though observers near the 
                                equator can see portions of both northern and southern skies.
                            </p>
                            <p>
                                Many southern constellations were unknown to ancient Mediterranean civilizations and were only 
                                charted after European exploration of southern seas began in the 15th century. These include both 
                                ancient constellations like Centaurus and modern creations like Telescopium.
                            </p>
                            <p>
                                <strong>Examples:</strong> Crux (Southern Cross), Centaurus, Carina, Tucana, Phoenix, Grus
                            </p>
                        </div>

                        <div className="category-card">
                            <h3>Circumpolar Constellations</h3>
                            <p>
                                Circumpolar constellations are those that never set below the horizon from a given latitude. 
                                They appear to rotate around the celestial pole and are visible throughout the entire year, 
                                making them excellent reference points for navigation and stargazing.
                            </p>
                            <p>
                                Which constellations are circumpolar depends on the observer's latitude. The closer you are to 
                                either pole, the more constellations become circumpolar. From the North Pole, all northern 
                                constellations are circumpolar; from the equator, none are.
                            </p>
                            <p>
                                For observers at mid-northern latitudes (around 40-50°N), circumpolar constellations typically 
                                include Ursa Major, Ursa Minor, Draco, Cepheus, and Cassiopeia. In the southern hemisphere, 
                                Crux, Centaurus, and Carina are often circumpolar.
                            </p>
                            <p>
                                <strong>Northern Circumpolar (from mid-latitudes):</strong> Ursa Major, Ursa Minor, Draco, 
                                Cepheus, Cassiopeia, Camelopardalis
                            </p>
                            <p>
                                <strong>Southern Circumpolar (from mid-latitudes):</strong> Crux, Centaurus, Carina, Octans, 
                                Musca, Triangulum Australe
                            </p>
                        </div>

                        <div className="category-card">
                            <h3>Equatorial Constellations</h3>
                            <p>
                                Equatorial constellations straddle the celestial equator, the projection of Earth's equator onto 
                                the celestial sphere. These constellations are visible from most locations on Earth, making them 
                                truly universal patterns that observers worldwide can enjoy.
                            </p>
                            <p>
                                The ecliptic (the Sun's apparent path) crosses the celestial equator, so many zodiac constellations 
                                are equatorial. These constellations rise in the east and set in the west, following predictable 
                                paths across the sky regardless of the observer's location.
                            </p>
                            <p>
                                <strong>Examples:</strong> Orion, Aquarius, Aquila, Ophiuchus, Serpens, Virgo, Leo, Taurus
                            </p>
                        </div>

                        <div className="category-card">
                            <h3>Seasonal Visibility</h3>
                            <p>
                                Beyond fixed categories, constellations are often grouped by their optimal viewing season. While 
                                circumpolar constellations are always visible, most constellations are best seen during specific 
                                times of the year when they appear highest in the sky during evening hours.
                            </p>
                            <p>
                                <strong>Spring:</strong> Leo, Virgo, Boötes, Cancer, Hydra<br/>
                                <strong>Summer:</strong> Cygnus, Lyra, Aquila, Sagittarius, Scorpius<br/>
                                <strong>Autumn:</strong> Pegasus, Andromeda, Aquarius, Pisces, Capricornus<br/>
                                <strong>Winter:</strong> Orion, Taurus, Gemini, Canis Major, Auriga
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            </main>

            <Footer />
        </div>
    );
}
