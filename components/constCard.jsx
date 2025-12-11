import React, { useState } from 'react';
import StarModal from './StarModal';
import ConstellationModal from './ConstellationModal';

export default function ConstCard({ item = {}, onRemove, onSelect, onBookmark, showBookmarked = false, allStars = [] }) {
  const { name, nickname, hemisphere, season, stars = [], origin, image } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImageEnlarged, setIsImageEnlarged] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [isStarModalOpen, setIsStarModalOpen] = useState(false);
  const isBookmarked = !!item._bookmarked || showBookmarked;
  const [bookmarkedStarIds, setBookmarkedStarIds] = React.useState(new Set());

  // Load bookmarked stars from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('bookmarks');
      const existing = raw ? JSON.parse(raw) : [];
      const starIds = new Set(existing.filter(b => b.type === 'star' || b.luminosity !== undefined).map(b => b.id));
      setBookmarkedStarIds(starIds);
    } catch (err) {
      console.error('Failed to load bookmarks', err);
    }
  }, [isStarModalOpen]);

  // Create a map of star names to star data for quick lookup
  const starDataMap = React.useMemo(() => {
    const map = new Map();
    allStars.forEach(star => {
      if (star.name) {
        map.set(star.name.toLowerCase(), star);
      }
    });
    return map;
  }, [allStars]);

  const handleCardClick = (e) => {
    // Don't open modal if clicking on buttons or links
    if (e.target.closest('button') || e.target.closest('.star-link')) return;
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsImageEnlarged(false);
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    setIsImageEnlarged(!isImageEnlarged);
  };

  const handleStarClick = (e, starName) => {
    e.stopPropagation();
    const starData = starDataMap.get(starName.toLowerCase());
    if (starData) {
      setSelectedStar(starData);
      setIsStarModalOpen(true);
    }
  };

  const handleCloseStarModal = () => {
    setIsStarModalOpen(false);
    setSelectedStar(null);
  };

  const handleStarImageClick = (e) => {
    e.stopPropagation();
    // Toggle star image enlargement (reuse the same state)
  };

  const handleBookmarkStar = (star) => {
    try {
      const raw = localStorage.getItem('bookmarks');
      const existing = raw ? JSON.parse(raw) : [];
      const exists = Array.isArray(existing) && existing.some((it) => it.id === star.id);
      if (exists) {
        window.alert('Already bookmarked');
        return;
      }
      const toSave = { ...star, type: 'star' };
      const next = [toSave, ...(Array.isArray(existing) ? existing : [])];
      localStorage.setItem('bookmarks', JSON.stringify(next));
      setBookmarkedStarIds(prev => {
        const newSet = new Set(prev);
        newSet.add(star.id);
        return newSet;
      });
      window.alert('Bookmarked');
    } catch (e) {
      console.error('Failed to bookmark', e);
      window.alert('Failed to bookmark');
    }
  };

  const handleRemoveStar = (id) => {
    if (!window.confirm('Remove this bookmark?')) return;
    try {
      const raw = localStorage.getItem('bookmarks');
      const existing = raw ? JSON.parse(raw) : [];
      const next = existing.filter((it) => it.id !== id);
      localStorage.setItem('bookmarks', JSON.stringify(next));
      setBookmarkedStarIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    } catch (e) {
      console.error('Failed to remove bookmark', e);
    }
  };

  const renderStarList = (starsList, isInModal = false) => {
    if (!Array.isArray(starsList) || starsList.length === 0) return null;
    
    return starsList.map((starName, index) => {
      const starData = starDataMap.get(starName.toLowerCase());
      const hasCard = !!starData;
      
      if (hasCard) {
        return (
          <React.Fragment key={index}>
            {index > 0 && ', '}
            <span
              className="star-link"
              onClick={(e) => handleStarClick(e, starName)}
              style={{ 
                textDecoration: 'underline',
                cursor: 'pointer',
                color: isInModal ? '#646cff' : 'inherit'
              }}
              title={`Click to view ${starName}`}
            >
              {starName}
            </span>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={index}>
            {index > 0 && ', '}
            {starName}
          </React.Fragment>
        );
      }
    });
  };

  return (
    <>
      <article className="star-card const-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
        {image ? (
          <div className="star-card-media">
            <img className="star-card-img" src={image} alt={name ?? 'constellation image'} />
          </div>
        ) : null}

        <div className="star-card-body">
          <h3 className="star-card-title">{name ?? 'Unnamed Constellation'}</h3>
          {nickname ? <p className="star-card-nickname"><em>"{nickname}"</em></p> : null}
          {hemisphere ? <p className="star-card-hemisphere">Hemisphere: {hemisphere}</p> : null}
          {season ? <p className="star-card-location">Season: {season}</p> : null}
          {Array.isArray(stars) && stars.length ? (
            <p className="star-card-desc">Stars: {renderStarList(stars)}</p>
          ) : null}
          {origin ? <p className="star-card-lum">{origin}</p> : null}
        </div>

        <div className="star-card-actions">
          {isBookmarked ? (
            <span className="star-bookmarked-icon" title="Bookmarked">★</span>
          ) : onBookmark ? (
            <button className="star-bookmark" onClick={() => onBookmark && onBookmark(item)}>Bookmark</button>
          ) : null}

          {onSelect ? (
            <button className="star-bookmark" onClick={() => onSelect && onSelect(item)}>Select</button>
          ) : null}

          {onRemove ? (
            <button className="star-remove" onClick={() => onRemove && onRemove(name || item.id)}>Remove</button>
          ) : null}
        </div>
      </article>

      <ConstellationModal 
        constellation={item}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onImageClick={handleImageClick}
        isImageEnlarged={isImageEnlarged}
        renderStarList={renderStarList}
        isBookmarked={isBookmarked}
        onBookmark={onBookmark}
        onSelect={onSelect}
        onRemove={onRemove}
      />

      <StarModal 
        star={selectedStar}
        isOpen={isStarModalOpen}
        onClose={handleCloseStarModal}
        onImageClick={handleStarImageClick}
        isImageEnlarged={false}
        isBookmarked={selectedStar && bookmarkedStarIds.has(selectedStar.id)}
        onBookmark={handleBookmarkStar}
        onRemove={handleRemoveStar}
      />
    </>
  );
}
