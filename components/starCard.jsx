import React, { useState } from 'react';
import StarModal from './StarModal';
import ConstellationModal from './ConstellationModal';

export default function StarCard({ item = {}, onRemove, onBookmark, allConstellations = [] }) {
	const { id, title, name, description, url } = item;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isImageEnlarged, setIsImageEnlarged] = useState(false);
	const [selectedConstellation, setSelectedConstellation] = useState(null);
	const [isConstellationModalOpen, setIsConstellationModalOpen] = useState(false);

	const isBookmarked = !!item._bookmarked;

	// Create a map of constellation names to constellation data for quick lookup
	const constellationDataMap = React.useMemo(() => {
		const map = new Map();
		allConstellations.forEach(constellation => {
			if (constellation.name) {
				map.set(constellation.name.toLowerCase(), constellation);
			}
		});
		return map;
	}, [allConstellations]);

	const handleCardClick = (e) => {
		// Don't open modal if clicking on buttons, links, or constellation links
		if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.constellation-link')) return;
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

	const handleConstellationClick = (e, constellationName) => {
		e.stopPropagation();
		const constData = constellationDataMap.get(constellationName.toLowerCase());
		if (constData) {
			setSelectedConstellation(constData);
			setIsConstellationModalOpen(true);
		}
	};

	const handleCloseConstellationModal = () => {
		setIsConstellationModalOpen(false);
		setSelectedConstellation(null);
	};

	const handleConstellationImageClick = (e) => {
		e.stopPropagation();
		// Could implement image enlargement for constellation if needed
	};

	const renderLocation = (location, isInModal = false) => {
		if (!location) return null;
		
		const constData = constellationDataMap.get(location.toLowerCase());
		const hasCard = !!constData;
		
		if (hasCard) {
			return (
				<span
					className="constellation-link"
					onClick={(e) => handleConstellationClick(e, location)}
					style={{ 
						textDecoration: 'underline',
						cursor: 'pointer',
						color: isInModal ? '#646cff' : 'inherit'
					}}
					title={`Click to view ${location} constellation`}
				>
					{location}
				</span>
			);
		} else {
			return location;
		}
	};

	return (
		<>
			<article className="star-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
				{item.image ? (
					<div className="star-card-media">
						<img className="star-card-img" src={item.image} alt={(title || name) ?? 'star image'} />
					</div>
				) : null}
				<div className="star-card-body">
					<h3 className="star-card-title">{(title || name) ?? 'Untitled'}</h3>
					{item.location ? <p className="star-card-location">Location: {renderLocation(item.location)}</p> : null}
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

			<StarModal 
				star={item}
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onImageClick={handleImageClick}
				isImageEnlarged={isImageEnlarged}
				renderLocation={renderLocation}
				isBookmarked={isBookmarked}
				onBookmark={onBookmark}
				onRemove={onRemove}
			/>

			<ConstellationModal 
				constellation={selectedConstellation}
				isOpen={isConstellationModalOpen}
				onClose={handleCloseConstellationModal}
				onImageClick={handleConstellationImageClick}
				isImageEnlarged={false}
			/>
		</>
	);
}
