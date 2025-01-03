import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import PropTypes from 'prop-types'

const Home = ({ toggleFavorite, favorites }) => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  // Fetch de todos los países
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data))
  }, [])

  // Filtrar países según la búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h1>Home</h1>
      <input
        type='text'
        placeholder='Search countries...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            <Link to={`/country/${country.name.common}`}>
              {country.name.common}
            </Link>
            <button
              onClick={() => toggleFavorite(country.name.common)}
              style={{
                marginLeft: '10px',
                backgroundColor: favorites.includes(country.name.common)
                  ? 'red'
                  : 'green',
                color: 'white'
              }}
            >
              {favorites.includes(country.name.common)
                ? 'Remove from Favorites'
                : 'Add to Favorites'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
