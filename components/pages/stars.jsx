import React, { useEffect, useState, useMemo } from 'react';
import StarCard from '../starCard.jsx';
import Footer from '../footer.jsx';
import { Container, Row, Col } from 'react-bootstrap';

import starsData from '../../src/assets/stars.json';
import constellationsData from '../../src/assets/constellations.json';

const STORAGE_KEY = 'bookmarks';

const STAR_SORT_OPTIONS = [
    { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
    { value: 'constellation', label: 'Constellation' },
    { value: 'luminosity', label: 'Luminosity (Brightest)' },
    { value: 'type', label: 'Type of Star' },
];

export default function Stars (props) {
    const [stars, setStars] = useState([]);
    const [constellations, setConstellations] = useState([]);
    const [bookmarkedIds, setBookmarkedIds] = useState(new Set());
    const [sortBy, setSortBy] = useState('alphabetical');
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Load constellations data with resolved image paths
        try {
            const mappedConsts = Array.isArray(constellationsData)
                ? constellationsData.map((it) => ({
                        ...it,
                        image: it.image
                            ? new URL(`../../src/assets/images/${it.image}`, import.meta.url).href
                            : undefined,
                    }))
                : [];
            setConstellations(mappedConsts);
        } catch (e) {
            console.error('Failed to load constellations data', e);
            setConstellations([]);
        }

        // resolve images to local URLs and set stars
        try {
            const mapped = Array.isArray(starsData)
                ? starsData.map((it) => ({
                        ...it,
                        image: it.image
                            ? new URL(`../../src/assets/images/stars/${it.image}`, import.meta.url).href
                            : undefined,
                    }))
                : [];
            // read existing bookmarks to mark items
            try {
                const raw = localStorage.getItem(STORAGE_KEY);
                const existing = raw ? JSON.parse(raw) : [];
                const ids = new Set((Array.isArray(existing) ? existing : []).map((b) => b.id));
                setBookmarkedIds(ids);
                setStars(mapped.map((s) => ({ ...s, _bookmarked: ids.has(s.id) })));
            } catch (err) {
                setStars(mapped);
            }
            return;
        } catch (e) {
            // fallback to runtime fetch if bundling resolution fails
            fetch('/src/assets/stars.json')
                .then((r) => r.json())
                .then((data) =>
                        setStars(
                            Array.isArray(data)
                                ? data.map((it) => ({
                                        ...it,
                                        image: it.image
                                            ? new URL(`../../src/assets/images/stars/${it.image}`, import.meta.url).href
                                            : undefined,
                                    }))
                                : []
                        )
                    )
                .catch((err) => {
                    console.error('Failed to load stars.json', err);
                    setStars([]);
                });
        }
    }, []);

    function addBookmark(item) {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            const existing = raw ? JSON.parse(raw) : [];
            const exists = Array.isArray(existing) && existing.some((it) => it.id === item.id);
            if (exists) {
                window.alert('Already bookmarked');
                return;
            }
            const toSave = { ...item, type: item.type || 'star', id: item.id };
            const next = [toSave, ...(Array.isArray(existing) ? existing : [])];
            localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
            // update bookmarked state so Stars page shows the indicator
            setBookmarkedIds((prev) => {
                const nextSet = new Set(prev);
                nextSet.add(item.id);
                return nextSet;
            });
            setStars((prev) => prev.map((s) => (s.id === item.id ? { ...s, _bookmarked: true } : s)));
            window.alert('Bookmarked');
        } catch (e) {
            console.error('Failed to bookmark', e);
            window.alert('Failed to bookmark');
        }
    }

    const sortedStars = useMemo(() => {
        const q = query.trim().toLowerCase();
        let filtered = stars;
        if (q) {
            filtered = stars.filter((s) => {
                const searchable = [s.name, s.location, s.description, s.type].filter(Boolean).join(' ').toLowerCase();
                return searchable.includes(q);
            });
        }
        const copy = [...filtered];
        switch (sortBy) {
            case 'alphabetical':
                return copy.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            case 'constellation':
                return copy.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
            case 'luminosity':
                return copy.sort((a, b) => (b.luminosity || 0) - (a.luminosity || 0));
            case 'type':
                return copy.sort((a, b) => (a.type || '').localeCompare(b.type || ''));
            default:
                return copy;
        }
    }, [stars, sortBy, query]);

    const inputStyle = { padding: '0.45rem 0.6rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' };

    return (
        <div className="page-content plan-page">
            <main>
                <h1 style={{
                    background: 'linear-gradient(135deg, #646cff, #8b92ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                }}>Stars</h1>
                <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                    aria-label="Search stars"
                    placeholder="Search stars..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={inputStyle}
                />
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <label htmlFor="star-sort">Sort by:</label>
                    <select
                        id="star-sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={inputStyle}
                    >
                        {STAR_SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <Container fluid>
                <Row xs={1} sm={2} md={4} lg={6} className="g-3">
                    {sortedStars.map((s) => (
                        <Col key={s.id}>
                            <StarCard item={s} onBookmark={addBookmark} allConstellations={constellations} />
                        </Col>
                    ))}
                </Row>
            </Container>
            </main>
            <Footer />
        </div>
    );
}
