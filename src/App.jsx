//import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import { Navigation } from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import SearchResults from './pages/SearchResults.jsx';
//import Formulario from './pages/Formulario.jsx';
function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/form" element={<Formulario />} /> */}
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </>
  )
}

export default App
