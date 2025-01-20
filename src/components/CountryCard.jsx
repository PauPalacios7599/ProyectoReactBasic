import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/CountryCard.css'

const CountryCard = ({ country, toggleFavorite, isFavorite }) => {
  return (
    <li className='country-card'>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        className='country-flag'
      />
      <div className='country-info'>
        <h3>{country.name}</h3>
        <button
          className={`favorite-btn ${isFavorite ? 'favorite' : ''}`}
          onClick={() => toggleFavorite(country)} // Aquí pasamos el objeto completo.
        >
          {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        </button>
        <Link to={`/country/${country.name}`} className='details-link'>
          See details
        </Link>
      </div>
    </li>
  )
}

CountryCard.propTypes = {
  country: PropTypes.shape({
    name: PropTypes.string.isRequired,
    flag: PropTypes.string.isRequired
  }).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired
}

export default CountryCard
