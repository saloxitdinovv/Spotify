import { useEffect, useState } from "react"


export default function PLaylist_page() {
    const [tracks, setTracks] = useState([])

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

    }, [])
    console.log(tracks);


    return (
        <>
            <h1>playlist</h1>

            <ul>
                {tracks.map(item => (
                    <li key={item.track.id}>{item.track.name}</li>
                ))}
            </ul>
        </>
    )

}