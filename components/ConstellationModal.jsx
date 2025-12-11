import React from 'react';

export default function ConstellationModal({ 
    constellation, 
    isOpen, 
    onClose, 
    onImageClick, 
    isImageEnlarged, 
    renderStarList,
    isBookmarked,
    onBookmark,
    onSelect,
    onRemove
}) {
    if (!isOpen || !constellation) return null;

    const { name, image, nickname, hemisphere, season, stars, origin } = constellation;

    return (
        <>
            <div className="card-modal-overlay" onClick={onClose}>
                <div className="card-modal-content" onClick={(e) => e.stopPropagation()}>
                    <button className="card-modal-close" onClick={onClose} aria-label="Close">
                        ×
                    </button>
                    
                    <div className="card-modal-inner">
                        {image && (
                            <div className="card-modal-image" onClick={onImageClick} style={{ cursor: 'zoom-in' }}>
                                <img src={image} alt={`${name} constellation`} />
                            </div>
                        )}
                        
                        <div className="card-modal-details">
                            <h2>{name || 'Unnamed Constellation'}</h2>
                            {nickname && <p className="modal-nickname"><em>"{nickname}"</em></p>}
                            
                            {hemisphere && (
                                <div className="modal-detail-row">
                                    <strong>Hemisphere:</strong>
                                    <span>{hemisphere}</span>
                                </div>
                            )}
                            
                            {season && (
                                <div className="modal-detail-row">
                                    <strong>Best Viewing Season:</strong>
                                    <span>{season}</span>
                                </div>
                            )}
                            
                            {Array.isArray(stars) && stars.length > 0 && (
                                <>
                                    <div className="modal-detail-row">
                                        <strong>Number of Notable Stars:</strong>
                                        <span>{stars.length}</span>
                                    </div>
                                    <div className="modal-detail-description">
                                        <strong>Notable Stars:</strong>
                                        <p>{renderStarList ? renderStarList(stars, true) : stars.join(', ')}</p>
                                    </div>
                                </>
                            )}
                            
                            {origin && (
                                <div className="modal-detail-description">
                                    <strong>Origin & Mythology:</strong>
                                    <p>{origin}</p>
                                </div>
                            )}
                            
                            <div className="card-modal-actions">
                                {isBookmarked ? (
                                    <span className="star-bookmarked-icon" title="Bookmarked">★ Bookmarked</span>
                                ) : onBookmark ? (
                                    <button className="star-bookmark" onClick={() => onBookmark(constellation)}>Bookmark</button>
                                ) : null}

                                {onSelect ? (
                                    <button className="star-bookmark" onClick={() => onSelect(constellation)}>Select</button>
                                ) : null}

                                {onRemove ? (
                                    <button className="star-remove" onClick={() => onRemove(name || constellation.id)}>Remove</button>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {isImageEnlarged && image && (
                <div className="image-lightbox" onClick={onImageClick}>
                    <button className="image-lightbox-close" onClick={onImageClick} aria-label="Close enlarged image">
                        ×
                    </button>
                    <img src={image} alt={`${name} constellation`} onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </>
    );
}
