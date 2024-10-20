import './App.css'
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Room } from './pages/Room';

function App() {
  return (
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/room/:id' Component={Room}/>
      </Routes>
  )
}

export default App
