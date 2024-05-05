import { useEffect, useState } from "react";
import PLaylist from "../components/Playlist";
import { Link } from "react-router-dom";
import PlaylistCard from './../components/PlaylistCard';

export default function Home() {
    const [albums, setAlbums] = useState([])
    const [profile, setProfile] = useState([])
    const [playlists, setPLaylists] = useState([])
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

        fetch(url + '/me/playlists', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setPLaylists(res.items)
            })


            
        // fetch(url + '/me/player/recently-played', {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         console.log(res);
        //     })
    }, [])


    return (
        <>
            <div className='title_playlist w-full pt-10'>
                <h1 className='title text-white font-bold text-4xl pb-9 select-none'>Good morning, {profile.display_name}</h1>
                <div className="playlists flex flex-wrap gap-7">
                    {
                        playlists.length > 0 ? (
                            playlists.map((item) => <PLaylist key={item.id} img_src={item.images[0].url} playlist_name={item.name} id={item.id} />)
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                <div className="w-[361px] h-[100px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                                <div className="w-[361px] h-[100px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                                <div className="w-[361px] h-[100px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="shows_container pt-12 pr-10">
                <div className="shows_header flex justify-between items-center pb-8 select-none">
                    <h1 className='text-white font-bold text-3xl'>Shows you might like</h1>
                    <button className="see_all text-white text-lg font-bold">SEE ALL</button>
                </div>
                <div className="shows flex gap-5 flex-wrap">
                    {albums.length > 0 ? (
                        albums.map((item) => (
                            <Link to={'/playlist/' + item.id} key={item.id}>
                                <PlaylistCard
                                    key={item.id}
                                    img_src={item?.images[0]?.url}
                                    title={item?.name}
                                    subtitle={item?.type}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="flex flex-wrap gap-5">
                            <div className="w-[200px] h-[250px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-[200px] h-[250px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-[200px] h-[250px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-[200px] h-[250px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-[200px] h-[250px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}