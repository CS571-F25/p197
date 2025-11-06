import { useState } from 'react'
import './App.css'
import { HashRouter, Route, Routes } from 'react-router'
import Home from '../components/home.jsx'
import Plan from '../components/plan.jsx'

function App() {
  return <HashRouter>
    <Routes>
      <Route path = "/" element={<Home/>}></Route>
      <Route path = "/plan" element={<Plan/>}></Route>
    </Routes>
  </HashRouter>

}

export default App
