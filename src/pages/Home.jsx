import React, { useState, useEffect } from 'react'
import CountryCard from '../components/CountryCard'
import '../styles/Home.css'

const Home = ({ toggleFavorite, favorites }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        // Extrae solo los datos necesarios
        const formattedCountries = data.map((country) => ({
          name: country.name.common,
          flag: country.flags.svg
        }))
        setCountries(formattedCountries)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching countries:', error)
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  // Filtrar países según la búsqueda
  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      <div className='search-container'>
        <input
          type='text'
          placeholder='Search for a country...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='search-input'
        />
      </div>

      {isLoading ? (
        <p>Loading countries...</p>
      ) : (
        <ul className='country-list'>
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.name}
                country={country}
                toggleFavorite={toggleFavorite}
                isFavorite={favorites.some((fav) => fav.name === country.name)} // Verificación corregida
              />
            ))
          ) : (
            <p>No countries found</p>
          )}
        </ul>
      )}
    </div>
  )
}

export default Home
