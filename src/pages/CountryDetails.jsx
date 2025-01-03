import React from 'react'
import { useParams } from 'react-router-dom'
import '../styles/CountryDetails.css'

const CountryDetails = () => {
  const { name } = useParams()

  return (
    <div>
      <h1>Details for {name}</h1>
      {/* Logic to fetch and display details for the country */}
    </div>
  )
}

export default CountryDetails
