import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'


function App() : React.JSX.Element {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
   </Router>
  )
}

export default App
