import React from 'react';

export default function StarCard({ item = {}, onRemove, onBookmark }) {
	const { id, title, name, description, url } = item;

	const isBookmarked = !!item._bookmarked;

	return (
		<article className="star-card">
			{item.image ? (
				<div className="star-card-media">
					<img className="star-card-img" src={item.image} alt={(title || name) ?? 'star image'} />
				</div>
			) : null}
			<div className="star-card-body">
				<h3 className="star-card-title">{(title || name) ?? 'Untitled'}</h3>
				{item.location ? <p className="star-card-location">Location: {item.location}</p> : null}
				{description ? <p className="star-card-desc">{description}</p> : null}
				{typeof item.luminosity !== 'undefined' ? (
					<p className="star-card-lum">Luminosity: <strong>{typeof item.luminosity === 'number' ? item.luminosity.toLocaleString() : item.luminosity}</strong></p>
				) : null}
				{url ? (
					<p className="star-card-link">
						<a href={url} target="_blank" rel="noreferrer">Open</a>
					</p>
				) : null}
			</div>
			<div className="star-card-actions">
				{isBookmarked ? (
					<span className="star-bookmarked-icon" title="Bookmarked">★</span>
				) : onBookmark ? (
					<button className="star-bookmark" onClick={() => onBookmark && onBookmark(item)}>Bookmark</button>
				) : null}
				{onRemove ? (
					<button className="star-remove" onClick={() => onRemove && onRemove(id)}>Remove</button>
				) : null}
			</div>
		</article>
	);
}
