import React, { useEffect, useState } from 'react';
import ConstCard from '../constCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

import constellationsData from '../../src/assets/constellations.json';
const STORAGE_KEY = 'bookmarks';

export default function Constellations() {
  const [items, setItems] = useState([]);

  useEffect(() => {
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
        const ids = new Set((Array.isArray(existing) ? existing : []).map((b) => b.id || b.name));
        setItems(mapped.map((c) => ({ ...c, _bookmarked: ids.has(c.name) || ids.has(c.id) })));
      } catch (err) {
        setItems(mapped);
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
      const toSave = { ...item, type: 'constellation', id: item.id || item.name };
      const next = [toSave, ...(Array.isArray(existing) ? existing : [])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setItems((prev) => prev.map((c) => ((c.name === item.name || c.id === item.id) ? { ...c, _bookmarked: true } : c)));
      window.alert('Bookmarked');
    } catch (err) {
      console.error('Failed to bookmark constellation', err);
      window.alert('Failed to bookmark');
    }
  }

  return (
    <div className="page-content plan-page">
      <h1>Constellations</h1>
      <Container fluid>
        <Row xs={1} sm={2} md={4} lg={6} className="g-3">
            {items.map((c) => (
            <Col key={c.name}>
              <ConstCard item={c} onBookmark={addBookmark} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}
