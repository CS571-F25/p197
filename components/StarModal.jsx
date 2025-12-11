import React from 'react';

export default function StarModal({ 
    star, 
    isOpen, 
    onClose, 
    onImageClick, 
    isImageEnlarged,
    renderLocation,
    isBookmarked,
    onBookmark,
    onRemove
}) {
    if (!isOpen || !star) return null;

    const { id, name, title, image, type, location, luminosity, description } = star;
    const displayName = title || name || 'Untitled';

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
                                <img src={image} alt={`${displayName} star`} />
                            </div>
                        )}
                        
                        <div className="card-modal-details">
                            <h2>{displayName}</h2>
                            
                            {type && (
                                <div className="modal-detail-row">
                                    <strong>Type:</strong>
                                    <span>{type}</span>
                                </div>
                            )}
                            
                            {location && (
                                <div className="modal-detail-row">
                                    <strong>Constellation:</strong>
                                    <span>{renderLocation ? renderLocation(location, true) : location}</span>
                                </div>
                            )}
                            
                            {typeof luminosity !== 'undefined' && (
                                <div className="modal-detail-row">
                                    <strong>Luminosity:</strong>
                                    <span>{typeof luminosity === 'number' ? luminosity.toLocaleString() : luminosity} × Sun</span>
                                </div>
                            )}
                            
                            {description && (
                                <div className="modal-detail-description">
                                    <strong>Description:</strong>
                                    <p>{description}</p>
                                </div>
                            )}
                            
                            <div className="card-modal-actions">
                                {isBookmarked ? (
                                    <span className="star-bookmarked-icon" title="Bookmarked">★ Bookmarked</span>
                                ) : onBookmark ? (
                                    <button className="star-bookmark" onClick={() => onBookmark(star)}>Bookmark</button>
                                ) : null}
                                {onRemove ? (
                                    <button className="star-remove" onClick={() => onRemove(id)}>Remove</button>
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
                    <img src={image} alt={`${displayName} star`} onClick={(e) => e.stopPropagation()} />
                </div>
            )}
        </>
    );
}
