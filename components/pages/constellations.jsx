import React, { useEffect, useState, useMemo } from 'react';
import ConstCard from '../constCard.jsx';
import Footer from '../footer.jsx';
import { Container, Row, Col } from 'react-bootstrap';

import constellationsData from '../../src/assets/constellations.json';
import starsData from '../../src/assets/stars.json';
const STORAGE_KEY = 'bookmarks';

const CONSTELLATION_SORT_OPTIONS = [
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
  { value: 'season', label: 'Season' },
  { value: 'hemisphere', label: 'Hemisphere' },
  { value: 'stars', label: 'Number of Stars' },
];

export default function Constellations() {
  const [items, setItems] = useState([]);
  const [stars, setStars] = useState([]);
  const [sortBy, setSortBy] = useState('alphabetical');
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Load stars data with resolved image paths
    try {
      const mappedStars = Array.isArray(starsData)
        ? starsData.map((it) => ({
            ...it,
            image: it.image
              ? new URL(`../../src/assets/images/stars/${it.image}`, import.meta.url).href
              : undefined,
          }))
        : [];
      setStars(mappedStars);
    } catch (e) {
      console.error('Failed to load stars data', e);
      setStars([]);
    }

    try {
      const mapped = Array.isArray(constellationsData)
        ? constellationsData.map((it) => ({
            ...it,
            image: it.image ? new URL(`../../src/assets/images/${it.image}`, import.meta.url).href : undefined,
          }))
        : [];
      // mark already-bookmarked constellations
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const existing = raw ? JSON.parse(raw) : [];
        // Get names/ids of bookmarked constellations only
        const bookmarkedConsts = (Array.isArray(existing) ? existing : []).filter((b) => b.type === 'constellation');
        const ids = new Set(bookmarkedConsts.map((b) => b.id || b.name));
        setItems(mapped.map((c) => ({ ...c, _bookmarked: ids.has(c.name) || ids.has(c.id) })));
      } catch (err) {
        setItems(mapped.map((c) => ({ ...c, _bookmarked: false })));
      }
    } catch (e) {
      // fallback to network
      fetch('/src/assets/constellations.json')
        .then((r) => r.json())
        .then((data) =>
          setItems(
            Array.isArray(data)
              ? data.map((it) => ({
                  ...it,
                  image: it.image ? new URL(`../../src/assets/images/${it.image}`, import.meta.url).href : undefined,
                }))
              : []
          )
        )
        .catch((err) => {
          console.error('Failed to load constellations.json', err);
          setItems([]);
        });
    }
  }, []);

  function addBookmark(item) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const existing = raw ? JSON.parse(raw) : [];
      const exists = Array.isArray(existing) && existing.some((it) => (it.id || it.name) === (item.id || item.name));
      if (exists) {
        window.alert('Already bookmarked');
        return;
      }
      // Don't save internal _bookmarked flag to localStorage
      const { _bookmarked, ...cleanItem } = item;
      const toSave = { ...cleanItem, type: 'constellation', id: item.id || item.name };
      const next = [toSave, ...(Array.isArray(existing) ? existing : [])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      // Only match by name since constellations don't have id field
      setItems((prev) => prev.map((c) => (c.name === item.name ? { ...c, _bookmarked: true } : c)));
      window.alert('Bookmarked');
    } catch (err) {
      console.error('Failed to bookmark constellation', err);
      window.alert('Failed to bookmark');
    }
  }

  const sortedItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    let filtered = items;
    if (q) {
      filtered = items.filter((c) => {
        const searchable = [c.name, c.nickname, c.hemisphere, c.season, c.origin, ...(c.stars || [])].filter(Boolean).join(' ').toLowerCase();
        return searchable.includes(q);
      });
    }
    const copy = [...filtered];
    const seasonOrder = { 'spring': 1, 'summer': 2, 'autumn': 3, 'fall': 3, 'winter': 4 };
    switch (sortBy) {
      case 'alphabetical':
        return copy.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      case 'season':
        return copy.sort((a, b) => (seasonOrder[(a.season || '').toLowerCase()] || 99) - (seasonOrder[(b.season || '').toLowerCase()] || 99));
      case 'hemisphere':
        return copy.sort((a, b) => (a.hemisphere || '').localeCompare(b.hemisphere || ''));
      case 'stars':
        return copy.sort((a, b) => (Array.isArray(b.stars) ? b.stars.length : 0) - (Array.isArray(a.stars) ? a.stars.length : 0));
      default:
        return copy;
    }
  }, [items, sortBy, query]);

  const inputStyle = { padding: '0.45rem 0.6rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' };

  return (
    <div className="page-content plan-page">
      <h1 style={{
        background: 'linear-gradient(135deg, #646cff, #8b92ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>Constellations</h1>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <input
          aria-label="Search constellations"
          placeholder="Search constellations..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={inputStyle}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label htmlFor="const-sort">Sort by:</label>
          <select
            id="const-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={inputStyle}
          >
            {CONSTELLATION_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <Container fluid>
        <Row xs={1} sm={2} md={4} lg={6} className="g-3">
          {sortedItems.map((c) => (
            <Col key={c.name}>
              <ConstCard item={c} onBookmark={addBookmark} allStars={stars} />
            </Col>
          ))}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
