import React, { useState } from 'react';

const Photos = ({
  id,
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
  onFavoriteClick,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
    onFavoriteClick({ id, urls: { regular }, alt_description, likes, user: { name, portfolio_url, profile_image: { medium } } });
  };

  return (
    <article className="photo">
      <img src={regular} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes}</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} className="user-img" alt="" />
        </a>
        <button className={`favorite-btn ${isFavorite ? 'active' : ''}`} onClick={handleFavoriteClick}>
          <span role="img" aria-label="Favorite">{isFavorite ? '❤️' : '♡'}</span>
        </button>
      </div>
    </article>
  );
};

export default Photos;
