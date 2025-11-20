import React, { useEffect, useState } from 'react';
import StarCard from '../starCard.jsx';
import { Container, Row, Col } from 'react-bootstrap';

import starsData from '../../src/assets/stars.json';

const STORAGE_KEY = 'bookmarks';

export default function Stars (props) {
    const [stars, setStars] = useState([]);
    const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

    useEffect(() => {
        // resolve images to local URLs and set stars
        try {
            const mapped = Array.isArray(starsData)
                ? starsData.map((it) => ({
                        ...it,
                        image: it.image
                            ? new URL(`../../src/assets/images/${it.image}`, import.meta.url).href
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
                                            ? new URL(`../../src/assets/images/${it.image}`, import.meta.url).href
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

    return (
            <div className="page-content plan-page">
                <h1>Stars</h1>
            <Container fluid>
                <Row xs={1} sm={2} md={4} lg={6} className="g-3">
                    {stars.map((s) => (
                        <Col key={s.id}>
                            <StarCard item={s} onBookmark={addBookmark} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}
