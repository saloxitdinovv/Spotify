import './App.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search';
import Library from './pages/Library';
import Layout from './layout/Layout';
import Login from './pages/Login';
import PLaylist_page from './pages/Playlist_page';
import Shows from './pages/Shows';
import Album from './pages/Album';
import Artists from './pages/Artists';
import { useState } from 'react';
import { TrackContext } from '../context/TrackCTX';
import { PLaylistContext } from './../context/PlaylistCTX';

function App() {
  const [track, setTrack] = useState(null)
  const [playlist_ctx, setPLaylist_ctx] = useState([])


  return (
    <PLaylistContext.Provider value={{ playlist_ctx, setPLaylist_ctx }}>
      <TrackContext.Provider value={{ track, setTrack }} >
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/library' element={<Library />} />
            <Route path='/playlist/:id' element={<PLaylist_page />} />
            <Route path='/shows/:id' element={<Shows />} />
            <Route path='/albums/:id' element={<Album />} />
            <Route path='/artists/:id' element={<Artists />} />
          </Route>
          <Route path='/login' element={<Login />} />
        </Routes>
      </TrackContext.Provider>
    </PLaylistContext.Provider >
  )
}

export default App
