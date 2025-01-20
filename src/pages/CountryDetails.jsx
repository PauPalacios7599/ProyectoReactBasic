import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles/CountryDetails.css'

const CountryDetails = () => {
  const { name } = useParams()
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        )
        if (!response.ok) {
          throw new Error('Country not found')
        }
        const data = await response.json()
        setCountry(data[0])
        setError(null)
      } catch (err) {
        setError(err.message)
        setCountry(null)
      } finally {
        setLoading(false)
      }
    }
    fetchCountryDetails()
  }, [name])

  if (loading) return <p>Loading details...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <section className='country-details'>
      <h1>Details for {country.name.common}</h1>
      <img src={country.flags.svg} alt={`${country.name.common} flag`} />
      <article>
        <p>
          <strong>Capital:</strong> {country.capital?.[0] || 'N/A'}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Subregion:</strong> {country.subregion || 'N/A'}
        </p>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Languages:</strong>{' '}
          {Object.values(country.languages || {}).join(', ')}
        </p>
        <p>
          <strong>Currencies:</strong>{' '}
          {Object.values(country.currencies || {})
            .map((c) => c.name)
            .join(', ')}
        </p>
      </article>
    </section>
  )
}

export default CountryDetails
