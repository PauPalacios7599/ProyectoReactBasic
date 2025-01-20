import React from 'react'
import PropTypes from 'prop-types'
import '../styles/Favourites.css'

const Favorites = React.memo(({ favorites }) => {
  return (
    <section className='favorites'>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul className='favorites-list'>
          {favorites.map((country) => (
            <li key={country.name} className='favorite-item'>
              <img
                src={country.flag}
                alt={`${country.name} flag`}
                className='favorite-flag'
              />
              <span className='favorite-name'>{country.name}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </section>
  )
})

Favorites.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      flag: PropTypes.string.isRequired
    })
  ).isRequired
}

Favorites.displayName = 'Favorites'

export default Favorites
