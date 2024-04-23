import './App.css'
import PLaylist from './components/playlist'
import Layout from './layout/Layout'
import Artist from './components/Artist';

function App() {

  return (
    <Layout>
      <div className='title_playlist w-full pl-[341px] pt-10'>
        <h1 className='title text-white font-bold text-4xl pb-9 select-none'>Good morning</h1>
        <div className="playlists flex flex-wrap gap-7">
          <PLaylist
            img_src={'/images/playlist_image.png'}
            playlist_name={'Liked Songs'}
          />
          <PLaylist
            img_src={'/images/neffex_playlist.png'}
            playlist_name={'Neffex Playlist'}
          />
          <PLaylist
            img_src={'/images/kd.png'}
            playlist_name={'K/ DA'}
          />
          <PLaylist
            img_src={'/images/dance.png'}
            playlist_name={'Dance / Electronic Mix'}
          />
        </div>
      </div>

      <div className="shows_container pt-12 pl-[341px] pr-10">
        <div className="shows_header flex justify-between items-center pb-8 select-none">
          <h1 className='text-white font-bold text-3xl'>Shows you might like</h1>
          <button className="see_all text-white text-lg font-bold">SEE ALL</button>
        </div>
        <div className="shows flex gap-8 flex-wrap">
          <Artist
            img_src={"/images/artist_1.png"}
            artist_playlist={'Weekly Motivatio...'}
            artist_name={'Ben Ina Scott'}
          />
          <Artist
            img_src={"/images/artist_2.png"}
            artist_playlist={'MEDITATION SELF'}
            artist_name={'Ibn Hussain Aleen'}
          />
          <Artist
            img_src={"/images/artist_3.png"}
            artist_playlist={'Words beyond act...'}
            artist_name={'Samuel Scott'}
          />
          <Artist
            img_src={"/images/artist_4.png"}
            artist_playlist={'The Alexa Show'}
            artist_name={'Adriana Tom'}
          />
          <Artist
            img_src={"/images/artist_5.png"}
            artist_playlist={'The Stories of Ma...'}
            artist_name={'Lexus'}
          />
          <Artist
            img_src={"/images/artist_6.png"}
            artist_playlist={'Motivation Daily b...'}
            artist_name={'Georgina Martha'}
          />
        </div>
      </div>
    </Layout>
  )
}

export default App
