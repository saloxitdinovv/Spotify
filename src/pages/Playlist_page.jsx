import { useEffect, useState } from "react"


export default function PLaylist_page() {
    const [tracks, setTracks] = useState([])
    const [playlist, setPLaylist] = useState([])

    useEffect(() => {
        const id = location.pathname.split('/').at(-1)
        const token = localStorage.getItem('token')

        fetch(`${import.meta.env.VITE_PUBLIC_URL}/playlists/${id}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setTracks(res.items)
            })

        fetch(`${import.meta.env.VITE_PUBLIC_URL}/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setPLaylist(res)
                console.log(res);
            })

    }, [])

    return (
        <>
            <div className="playlist_head">
            <img className="w-[300px] h-[300px] object-cover" src={playlist.images[0].url} alt="" />
            </div>

            <ul>
                {tracks.map(item => (
                    <li className="text-white flex justify-between w-[600px] items-center pb-5" key={item.track.id}>{item.track.name}
                        <audio src={item.track.preview_url} controls></audio>
                    </li>
                ))}
            </ul>
        </>
    )

}