import React, { useEffect, useState, useMemo } from 'react';
import StarCard from '../starCard.jsx';
import ConstCard from '../constCard.jsx';
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

const CONSTELLATION_SORT_OPTIONS = [
  { value: 'alphabetical', label: 'Alphabetical (A-Z)' },
  { value: 'season', label: 'Season' },
  { value: 'hemisphere', label: 'Hemisphere' },
  { value: 'stars', label: 'Number of Stars' },
];

function makeSampleItems() {
  return [
    { id: `s-${Date.now()}-2`, title: 'Another Star', description: 'Second sample item' },
  ];
}

export default function BookMarksPage() {
  const [items, setItems] = useState([]);
  const [allStars, setAllStars] = useState([]);
  const [allConstellations, setAllConstellations] = useState([]);
  const [query, setQuery] = useState('');
  const [starSortBy, setStarSortBy] = useState('alphabetical');
  const [constSortBy, setConstSortBy] = useState('alphabetical');

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
      setAllStars(mappedStars);
    } catch (e) {
      console.error('Failed to load stars data', e);
      setAllStars([]);
    }

    // Load constellations data with resolved image paths
    try {
      const mappedConstellations = Array.isArray(constellationsData)
        ? constellationsData.map((it) => ({
            ...it,
            image: it.image
              ? new URL(`../../src/assets/images/${it.image}`, import.meta.url).href
              : undefined,
          }))
        : [];
      setAllConstellations(mappedConstellations);
    } catch (e) {
      console.error('Failed to load constellations data', e);
      setAllConstellations([]);
    }

    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      setItems(Array.isArray(parsed) ? parsed : []);
    } catch (e) {
      console.error('Failed to read bookmarks', e);
      setItems([]);
    }
    // listen for storage changes (other tabs/windows) and update
    const onStorage = (ev) => {
      if (ev.key !== STORAGE_KEY) return;
      try {
        const parsed = ev.newValue ? JSON.parse(ev.newValue) : [];
        setItems(Array.isArray(parsed) ? parsed : []);
      } catch (err) {
        console.error('Failed to parse storage event for bookmarks', err);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  function persist(next) {
    setItems(next);
    try {
      if (next.length === 0) localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      console.error('Failed to save bookmarks', e);
    }
  }

  function remove(id) {
    // confirm removal
    if (!window.confirm('Remove this bookmark?')) return;
    const next = items.filter((it) => it.id !== id);
    persist(next);
  }

  function addSample() {
    const sample = makeSampleItems();
    const next = [...sample, ...items];
    persist(next);
  }

  function clearAll() {
    if (!window.confirm('Clear all bookmarks?')) return;
    persist([]);
  }

  return (
    <div className="page-content plan-page bookmarks-page">
      <div className="bookmark-actions">
        <h1 style={{
          background: 'linear-gradient(135deg, #646cff, #8b92ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>Bookmarks</h1>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            aria-label="Search bookmarks"
            placeholder="Search bookmarks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ padding: '0.45rem 0.6rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' }}
          />
          <div className="bookmark-controls">
            <button onClick={addSample}>Add sample bookmarks</button>
            <button onClick={clearAll}>Clear all</button>
          </div>
        </div>
      </div>
      {items.length === 0 ? (
        <p>Your saved items will appear here.</p>
      ) : (
        (() => {
          const q = query.trim().toLowerCase();
          const filtered = items.filter((it) => {
            if (!q) return true;
            const values = [];
            if (it.title) values.push(it.title);
            if (it.name) values.push(it.name);
            if (it.description) values.push(it.description);
            if (it.location) values.push(it.location);
            if (it.origin) values.push(it.origin);
            if (Array.isArray(it.stars)) values.push(it.stars.join(' '));
            return values.join(' ').toLowerCase().includes(q);
          });

          const constellations = filtered.filter((it) => it.type === 'constellation' || (Array.isArray(it.stars) && it.stars.length > 0));
          const starsFiltered = filtered.filter((it) => !constellations.includes(it));

          // Sort stars
          const seasonOrder = { 'spring': 1, 'summer': 2, 'autumn': 3, 'fall': 3, 'winter': 4 };
          const sortedStars = [...starsFiltered].sort((a, b) => {
            switch (starSortBy) {
              case 'constellation': return (a.location || '').localeCompare(b.location || '');
              case 'luminosity': return (b.luminosity || 0) - (a.luminosity || 0);
              case 'type': return (a.type || '').localeCompare(b.type || '');
              default: return (a.name || '').localeCompare(b.name || '');
            }
          });

          // Sort constellations
          const sortedConsts = [...constellations].sort((a, b) => {
            switch (constSortBy) {
              case 'season': return (seasonOrder[(a.season || '').toLowerCase()] || 99) - (seasonOrder[(b.season || '').toLowerCase()] || 99);
              case 'hemisphere': return (a.hemisphere || '').localeCompare(b.hemisphere || '');
              case 'stars': return (Array.isArray(b.stars) ? b.stars.length : 0) - (Array.isArray(a.stars) ? a.stars.length : 0);
              default: return (a.name || '').localeCompare(b.name || '');
            }
          });

          return (
            <div>
              {sortedStars.length > 0 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ margin: 0 }}>Stars</h2>
                    <label htmlFor="bookmark-star-sort" style={{ marginLeft: '1rem' }}>Sort by:</label>
                    <select
                      id="bookmark-star-sort"
                      value={starSortBy}
                      onChange={(e) => setStarSortBy(e.target.value)}
                      style={{ padding: '0.45rem 0.6rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' }}
                    >
                      {STAR_SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <Container fluid>
                    <Row xs={1} sm={2} md={4} lg={6} className="g-3">
                      {sortedStars.map((it) => (
                        <Col key={it.id || it.name}>
                          <StarCard item={it} onRemove={remove} allConstellations={allConstellations} />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
              )}

              {sortedConsts.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h2 style={{ margin: 0 }}>Constellations</h2>
                    <label htmlFor="bookmark-const-sort" style={{ marginLeft: '1rem' }}>Sort by:</label>
                    <select
                      id="bookmark-const-sort"
                      value={constSortBy}
                      onChange={(e) => setConstSortBy(e.target.value)}
                      style={{ padding: '0.45rem 0.6rem', borderRadius: 6, border: '1px solid rgba(255,255,255,0.06)', background: 'transparent', color: 'inherit' }}
                    >
                      {CONSTELLATION_SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <Container fluid>
                    <Row xs={1} sm={2} md={4} lg={6} className="g-3">
                      {sortedConsts.map((it) => (
                        <Col key={it.id || it.name}>
                          <ConstCard item={it} onRemove={remove} showBookmarked={true} allStars={allStars} />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
              )}
            </div>
          );
        })()
      )}
    </div>
  );
}
