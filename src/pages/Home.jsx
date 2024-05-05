import { useEffect, useState } from "react";
import Artist from "../components/Artist";
import PLaylist from "../components/Playlist";
import Layout from "../layout/Layout";

export default function Home() {
    const [artists, setArtists] = useState([])
    const [albums, setAlbums] = useState([])
    const [profile, setProfile] = useState([])
    const [token, setToken] = useState(
        localStorage.getItem('token')
    )

    const url = import.meta.env.VITE_PUBLIC_URL

    useEffect(() => {
        fetch(url + '/browse/featured-playlists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setAlbums(res.playlists.items)
            })

            fetch(url + '/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(res => {
                    setProfile(res)
                })

                fetch(url + '/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(res => {
                        setArtists(res.artists)
                    })
        }, [])


    return (
        <>
            <div className='title_playlist w-full pt-10'>
                <h1 className='title text-white font-bold text-4xl pb-9 select-none'>Good morning, {profile.display_name}</h1>
                <div className="playlists flex flex-wrap gap-7">
                    {
                        albums.map((item) => <PLaylist key={item.id} img_src={item.images[0].url} playlist_name={item.name} id={item.id}/>)
                    }
                </div>
            </div>

            <div className="shows_container pt-12 pr-10">
                <div className="shows_header flex justify-between items-center pb-8 select-none">
                    <h1 className='text-white font-bold text-3xl'>Shows you might like</h1>
                    <button className="see_all text-white text-lg font-bold">SEE ALL</button>
                </div>
                <div className="shows flex gap-8 flex-wrap">
                    {artists.length > 0 ? (
                        artists.map((item) => (
                            <Artist
                                key={item.id}
                                img_src={item.images[0].url}
                                nickName={item.name}
                                type={item.type}
                            />
                        ))
                    ) : (
                        <p>loading...</p>
                    )}
                </div>
            </div>
        </>
    )
}