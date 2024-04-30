import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa";

export default function PLaylist_page() {
    const [tracks, setTracks] = useState([])
    const [playlist, setPLaylist] = useState([])

    function formatDuration(duration_ms) {
        const minutes = Math.floor(duration_ms / 60000);
        const seconds = ((duration_ms % 60000) / 1000).toFixed(0);

        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    function formatDate(added_at) {
        const date = new Date(added_at);
        const formattedDate = `${date.toLocaleDateString()}`;

        return formattedDate;
    }

    useEffect(() => {
        const id = location.pathname.split('/').at(-1)
        const token = localStorage.getItem('token')

        fetch(`${import.meta.env.VITE_PUBLIC_URL}/playlists/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setPLaylist(res)
            })

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

    console.log(playlist);

    return (
        <>
            <div className="playlist_head text-white uppercase pb-[30px]">
                {
                    // <img className="w-[300px] h-[300px] object-cover" src={playlist.images[0].url} alt="" />
                }

                <div className="text text-left">
                    <h1 className="type text-lg">{playlist.type}</h1>

                    <h1 className="playlist_name text-8xl">{playlist.name}</h1>

                    <h1 className="descriptions">{playlist.description}</h1>
                </div>
            </div>

            <ul className="flex flex-col gap-5">
                {tracks.map((item, index) => (
                    <li className="text-white flex items-center cursor-pointer" key={item.track.id}>
                        <span className="number text-right pr-5 w-10">{index + 1}</span>
                        <div className="song_name_info flex gap-5 w-[400px]">
                            <img src={item.track.album.images.at(-1).url} className="w-[50px]" alt="" />
                            <div className="info">
                                <div className="song_name text-white text-base">
                                    {item.track.name}
                                </div>
                                <div className="artists text-[#B3B3B3] text-sm">
                                    {item.track.artists[0].name}
                                </div>
                            </div>
                        </div>
                        <div className="album_info text-sm text-[#B3B3B3] text-left w-[300px]">{item.track.album.name}</div>
                        <div className="data w-[200px]">
                            {formatDate(item.added_at)}
                        </div>
                        <div className="last_box flex items-center justify-end w-[190px] gap-8">
                            <button className="liked"><FaHeart color="#63CF6C" size={20} /></button>
                            <span className="duration">
                                {
                                    formatDuration(item.track.duration_ms)
                                }
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )

}