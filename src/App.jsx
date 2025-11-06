import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'

function App() {
  return <HashRouter>
    <Routes>
      <Route path = "/" element={<h1>Home</h1>} />
      <Route path = "/plan" element={<h1>star map</h1>} />
    </Routes>
  </HashRouter>

}

export default App
