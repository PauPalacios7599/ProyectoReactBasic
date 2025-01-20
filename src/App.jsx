import React, { useReducer, useCallback, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import CountryDetails from './pages/CountryDetails'
import Favorites from './pages/Favourites'
import './styles/App.css'
import '../src/styles/nav.css'

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      if (state.some((country) => country.name === action.payload.name)) {
        return state
      }
      return [...state, action.payload]
    case 'REMOVE':
      return state.filter((country) => country.name !== action.payload.name)
    default:
      return state
  }
}

const App = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, [], () => {
    try {
      const storedFavorites = localStorage.getItem('favorites')
      return storedFavorites ? JSON.parse(storedFavorites) : []
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error)
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites))
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error)
    }
  }, [favorites])

  const toggleFavorite = useCallback(
    (country) => {
      const isFavorite = favorites.some((fav) => fav.name === country.name)
      dispatch({
        type: isFavorite ? 'REMOVE' : 'ADD',
        payload: country
      })
    },
    [favorites]
  )

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/favorites'>Favorites</Link>
          </li>
        </ul>
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
