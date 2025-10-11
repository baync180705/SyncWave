import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Home } from './pages/home/Home'
import { Room } from './pages/room/Room'

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
      </Routes>
    </Router>
  );
};

export default App
