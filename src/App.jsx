import './App.css'
import Home from './pages/Home';
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search';
import Library from './pages/Library';
import Layout from './layout/Layout';
import Login from './pages/Login';
import PLaylist_page from './pages/Playlist_page';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/library' element={<Library />} />
        <Route path='/playlist/:id' element={<PLaylist_page />} />
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
