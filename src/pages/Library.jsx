import { useContext, useEffect, useState } from "react"
import Track from "../components/Track";
import { artistsString, toMinutes } from "../../helpers/utils";
import { PLaylistContext } from "../../context/PlaylistCTX";
import { RxDotsHorizontal } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { IoArrowDownCircleOutline, IoPauseSharp, IoPlay } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";



export default function PLaylist_page() {
    const [tracks, setTracks] = useState([])
    const [playlist, setPLaylist] = useState([])
    const { playlist_ctx, setPLaylist_ctx } = useContext(PLaylistContext)
    const [play, setPlay] = useState(false)
    const [profile, setProfile] = useState([])

    const handleStartPlaying = () => {
        setPlay(!play);
    };

    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch(`${import.meta.env.VITE_PUBLIC_URL}/me/top/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setPLaylist(res)
                setTracks(res.items)
                setPLaylist_ctx(res.items)
            })
        fetch(`${import.meta.env.VITE_PUBLIC_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setProfile(res)
            })
    }, [])


    return (
        <>
            <div className="absolute top-0 left-0 right-0 h-[70%] w-full z-[-1] bg-gradient-to-b from-[#00000070] to-[#161616] opacity-100 pb-10"></div>

            <div className="backdrop backdrop-blur-[70px] absolute top-0 left-0 right-0 h-[70%] w-full z-[-1] bg-gradient-to-b from-[#604EC1] to-[#121212] pb-10"></div>

            <section className="flex gap-6 pt-6 pb-10">
                <div className="playlist_img max-w-[290px] max-h-[300px] w-[250px] h-[260px] rounded object-cover shadow-[0px_0px_65px_4px_rgba(0,0,0,0.54)]">
                    <img className="w-full h-full object-cover rounded-lg" src="/images/liked.png" alt="" />
                </div>
                <div className="playlist_info flex flex-col justify-end gap-3">
                    <div className="text-xl uppercase font-bold text-white">
                        PUBLIC PLAYLIST
                    </div>
                    <div className="text-7xl font-bold text-5xl text-white capitalize">
                        Liked Songs
                    </div>
                    <span>
                        <div className="text-[#cbc8c4] w-[355px] h-[25px]">
                            {profile.display_name}
                        </div>
                        <div className="text-[#cbc8c4] w-[355px] h-[25px]">
                            {tracks.length} треков
                        </div>
                    </span>
                </div>
            </section>

            <div className="tools flex gap-10">
                <button className="start_playing p-4 rounded-full bg-[#1fdf64] flex items-center justify-center hover:scale-[1.03]" onClick={handleStartPlaying}>
                    {
                        play ? <IoPauseSharp size={30} /> : <IoPlay size={30} />
                    }
                </button>

                <button className="like">
                    <CiHeart size={42} color="white" />
                </button>

                <button className="download">
                    <IoArrowDownCircleOutline size={32} color="white" />
                </button>

                <button className="">
                    <RxDotsHorizontal size={30} color="#cbc8c4" />
                </button>
            </div>

            <div className="tracks_grid w-[97%] mt-8 font-medium text-[#cbc8c4]">
                <div className="thead border-b-[1px] px-5 pb-2 mb-5 border-[#cbc8c44c] text-[#cbc8c4] grid grid-cols-6">
                    <h4 className="flex gap-5 col-start-1 col-end-3"><span>#</span> TITLE</h4>
                    <h4>ALBUM</h4>
                    <h4></h4>
                    <h4>DATE ADDED</h4>
                    <h4 className="flex justify-center">
                        <LuClock3 color="[#cbc8c4]" />
                    </h4>
                </div>

                {
                    !playlist?.items ? (
                        <div className="flex flex-col gap-5">
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="w-full h-[55px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                        </div>
                    ) : (
                        playlist.items.map((item, idx) => (
                            <Track
                                img={item.album.images[0].url}
                                name={item.name}
                                singers={artistsString(item.artists)}
                                duration={toMinutes(item.duration_ms)}
                                album={'liked'}
                                date={'2024-05-06'}
                                src={item.preview_url}
                                index={idx}
                                key={idx}
                            />
                        ))
                    )
                }
            </div>
        </>
    )

}