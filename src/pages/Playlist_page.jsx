import { useEffect, useState } from "react"
import { FaHeart } from "react-icons/fa";
import { Audio } from 'react-loader-spinner'
import Track from "../components/Track";
import { artistsString, toMinutes } from "../../helpers/utils";
import { PLaylistContext } from "../../context/PlaylistCTX";

export default function PLaylist_page() {
    const [tracks, setTracks] = useState([])
    const [playlist, setPLaylist] = useState([])
    const [playlist_ctx, setPLaylist_ctx] = useState(PLaylistContext)



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
                setTracks(res.tracks.items)
                console.log(res.tracks.items);
                setPLaylist_ctx(res.tracks.items)
            })
    }, [])


    return (
        <>
            {/* <div className="playlist_head text-white uppercase pb-[30px]">
                {
                    // <img className="w-[300px] h-[300px] object-cover" src={playlist.images[0].url} alt="" />
                }

                <div className="text text-left">
                    <h1 className="type text-lg">{playlist.type}</h1>

                    <h1 className="playlist_name text-8xl">{playlist.name}</h1>

                    <h1 className="descriptions">{playlist.description}</h1>
                </div>
            </div> */}

            {
                playlist?.tracks ? (
                    <section className="flex gap-6 pt-6 pb-10">
                        <div className="playlist_img">
                            <img className="max-w-[290px] max-h-[290px] w-[250px] h-[250px] rounded object-cover shadow-[0px_0px_65px_4px_rgba(0,0,0,0.54)]" src={playlist?.images[0]?.url} alt="playlist-card" />
                        </div>
                        <div className="playlist_info flex flex-col justify-end gap-3">
                            <h3 className="text-xl uppercase font-bold text-white">{playlist.type}</h3>
                            <h1 className="text-7xl font-bold w-[80%] text-5xl text-white capitalize    ">{playlist.name}</h1>
                            <p className="text-[#cbc8c4]">{playlist.description}</p>
                            <div className="flex  text-[#cbc8c4]">
                                <span className="text-white cursor-pointer hover:underline">{playlist.owner.display_name}</span>
                                <h5>, {playlist.tracks.items.length} треков</h5>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="flex gap-6 pt-6 pb-10">
                        <div className="playlist_img max-w-[290px] max-h-[290px] w-[250px] h-[250px] rounded object-cover shadow-[0px_0px_65px_4px_rgba(0,0,0,0.54)] bg-[#c4c4c4]"></div>
                        <div className="playlist_info flex flex-col justify-end gap-3">
                            <h3 className="text-xl uppercase font-bold text-white">/</h3>
                            <h1 className="text-7xl font-bold w-[80%] text-5xl text-white capitalize    ">/</h1>
                            <p className="text-[#cbc8c4]">{playlist.description}</p>
                            <div className="flex  text-[#cbc8c4]">
                                <span className="text-white cursor-pointer hover:underline">/</span>
                                <h5> треков</h5>
                            </div>
                        </div>
                    </section>
                )
            }


            <ul className="flex flex-col gap-5">
                {tracks.map((item, idx) => (
                    // <Track />
                    // <li className="text-white flex items-center cursor-pointer w-full justify-between pr-10" key={item.track.id}>
                    //     <span className="number text-right pr-5 w-10">{index + 1}</span>
                    //     <div className="song_name_info flex gap-5 w-[400px]">
                    //         <img src={item.track.album.images.at(-1).url} className="w-[50px]" alt="" />
                    //         <div className="info">
                    //             <div className="song_name text-white text-base">
                    //                 {item.track.name}
                    //             </div>
                    //             <div className="artists text-[#B3B3B3] text-sm">
                    //                 {item.track.artists[0].name}
                    //             </div>
                    //         </div>
                    //     </div>
                    //     <div className="album_info text-sm text-[#B3B3B3] text-left w-[300px]">{item.track.album.name}</div>
                    //     <div className="data w-[200px]">
                    //         {formatDate(item.added_at)}
                    //     </div>
                    //     <div className="last_box flex items-center justify-end w-[190px] gap-8">
                    //         <button className="liked"><FaHeart color="#63CF6C" size={20} /></button>
                    //         <span className="duration">
                    //             {
                    //                 formatDuration(item.track.duration_ms)
                    //             }
                    //         </span>
                    //     </div>
                    // </li>
                    <Track
                        img={item.track.album.images[0].url}
                        name={item.track.name}
                        singers={artistsString(item.track.artists)}
                        duration={toMinutes(item.track.duration_ms)}
                        album={item.track.album.name}
                        date={item.track.release_date}
                        src={item.track.preview_url}
                        index={idx}
                        key={idx}
                    />
                ))}
            </ul>
        </>
    )

}