import React, { useEffect, useState } from 'react';
import StarCard from '../starCard.jsx';
import ConstCard from '../constCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

const STORAGE_KEY = 'bookmarks';

function makeSampleItems() {
  return [
    { id: `s-${Date.now()}-2`, title: 'Another Star', description: 'Second sample item' },
  ];
}

export default function BookMarksPage() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
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
        <h1>Bookmarks</h1>
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
          const stars = filtered.filter((it) => !constellations.includes(it));

          return (
            <div>
              {stars.length > 0 && (
                <div>
                  <h2>Stars</h2>
                  <Container fluid>
                    <Row xs={1} sm={2} md={4} lg={6} className="g-3">
                      {stars.map((it) => (
                        <Col key={it.id || it.name}>
                          <StarCard item={it} onRemove={remove} />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </div>
              )}

              {constellations.length > 0 && (
                <div style={{ marginTop: '1.25rem' }}>
                  <h2>Constellations</h2>
                  <Container fluid>
                    <Row xs={1} sm={2} md={4} lg={6} className="g-3">
                      {constellations.map((it) => (
                        <Col key={it.id || it.name}>
                          <ConstCard item={it} onRemove={remove} />
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
