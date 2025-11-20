import React from 'react';

export default function ConstCard({ item = {}, onRemove, onSelect, onBookmark }) {
  const { name, season, stars = [], origin, image } = item;
  const isBookmarked = !!item._bookmarked || item.type === 'constellation' || false;

  return (
    <article className="star-card const-card">
      {image ? (
        <div className="star-card-media">
          <img className="star-card-img" src={image} alt={name ?? 'constellation image'} />
        </div>
      ) : null}

      <div className="star-card-body">
        <h3 className="star-card-title">{name ?? 'Unnamed Constellation'}</h3>
        {season ? <p className="star-card-location">Season: {season}</p> : null}
        {Array.isArray(stars) && stars.length ? (
          <p className="star-card-desc">Stars: {stars.join(', ')}</p>
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
  );
}
