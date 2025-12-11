import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import Home from '../components/pages/home.jsx'
import Stars from '../components/pages/stars.jsx'
import BookMarksPage from '../components/pages/bookMarksPage.jsx'
import Constellations from '../components/pages/constellations.jsx'
import GeneralInfo from '../components/pages/generalInfo.jsx'
import History from '../components/pages/history.jsx'
import NavBar from '../components/navBar.jsx'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stars" element={<Stars />} />
          <Route path="/constellations" element={<Constellations />} />
          <Route path="/general-info" element={<GeneralInfo />} />
          <Route path="/history" element={<History />} />
          <Route path="/bookmarks" element={<BookMarksPage />} />
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
