import React from 'react'
import '../styles/Favourites.css'
import PropTypes from 'prop-types'

const Favorites = ({ favorites }) => {
  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((country) => (
            <li key={country}>{country}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  )
}

export default Favorites
