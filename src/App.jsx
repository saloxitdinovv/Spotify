import './App.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search';
import Library from './pages/Library';
import Layout from './layout/Layout';
import Login from './pages/Login';
import PLaylist_page from './pages/Playlist_page';
import { createContext, useState } from 'react';

export const TrackContext = createContext(null)

function App() {
  const [track, setTrack] = useState(null)


  return (
    <TrackContext.Provider value={{ track, setTrack }} >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/library' element={<Library />} />
          <Route path='/playlist/:id' element={<PLaylist_page />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </TrackContext.Provider>
  )
}

export default App
