import React, { useState } from 'react';
import { FaHeart, FaShare } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const Photos = ({
  id,
  urls: { regular },
  alt_description,
  likes,
  user: { name, portfolio_url, profile_image: { medium } },
  onFavoriteClick,
  isFavorite,
}) => {
  const [isPhotoFavorite, setIsPhotoFavorite] = useState(isFavorite);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleFavoriteClick = () => {
    setIsPhotoFavorite(!isPhotoFavorite);
    onFavoriteClick({
      id,
      urls: { regular },
      alt_description,
      likes,
      user: { name, portfolio_url, profile_image: { medium } },
    });
  };

  const handleShare = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      `Check out this awesome photo: ${regular}`
    )}`;
    window.open(shareUrl, '_blank');
  };

  const openLightbox = () => {
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <article className="photo">
      <img src={regular} alt={alt_description} onClick={openLightbox} />
      <div className="photo-info">
        <div className="photo-header">
          <h4>{name}</h4>
          <button className={`favorite-btn ${isPhotoFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
            <span role="img" aria-label="Favorite">
              {isPhotoFavorite ? '❤️' : '♡'}
            </span>
          </button>
        </div>
        <div className="photo-actions">
          <p>
            <FaHeart className="heart-icon" /> {likes}
          </p>
          <button className="share-btn" onClick={handleShare}>
            <FaShare className="share-icon" />
          </button>
        </div>
        <a href={portfolio_url}>
          <img src={medium} className="user-img" alt="" />
        </a>
      </div>

      {isLightboxOpen && (
        <Lightbox
          mainSrc={regular}
          onCloseRequest={closeLightbox}
          imageCaption={
            <div className="photo-info">
              <div className="photo-header">
                <h4>{name}</h4>
                <button className={`favorite-btn ${isPhotoFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
                  <span role="img" aria-label="Favorite">
                    {isPhotoFavorite ? '❤️' : '♡'}
                  </span>
                </button>
              </div>
              <div className="photo-actions">
                <p>
                  <FaHeart className="heart-icon" /> {likes}
                </p>
                <button className="share-btn" onClick={handleShare}>
                  <FaShare className="share-icon" />
                </button>
              </div>
              <a href={portfolio_url}>
                <img src={medium} className="user-img" alt="" />
              </a>
            </div>
          }
        />
      )}
    </article>
  );
};

export default Photos;
