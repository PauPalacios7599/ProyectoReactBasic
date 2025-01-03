import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'
import Favorites from './pages/Favourites'
import './styles/App.css'
import '../src/styles/nav.css'

const App = () => {
  const [favorites, setFavorites] = useState([]) // Estado para favoritos

  // Función para añadir/quitar un país de favoritos
  const toggleFavorite = (country) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(country)
        ? prevFavorites.filter((fav) => fav !== country)
        : [...prevFavorites, country]
    )
  }

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link> | <Link to='/favorites'>Favorites</Link>
      </nav>
      <Routes>
        <Route
          path='/'
          element={
            <Home toggleFavorite={toggleFavorite} favorites={favorites} />
          }
        />
        <Route path='/country/:name' element={<CountryDetails />} />
        <Route
          path='/favorites'
          element={<Favorites favorites={favorites} />}
        />
      </Routes>
    </div>
  )
}

export default App
