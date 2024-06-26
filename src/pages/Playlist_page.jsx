import { useContext, useEffect, useRef, useState } from "react"
import Track from "../components/Track";
import { artistsString, getAverageRGB, toMinutes } from "../../helpers/utils";
import { PLaylistContext } from "../../context/PlaylistCTX";
import { RxDotsHorizontal } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { IoArrowDownCircleOutline, IoPauseSharp, IoPlay } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";



export default function PLaylist_page() {
    const [playlist, setPLaylist] = useState([])
    const [bgColor, setBgColor] = useState([])
    const { setPLaylist_ctx } = useContext(PLaylistContext)
    const [play, setPlay] = useState(false)
    const img_ref = useRef(null)
    
    const handleStartPlaying = () => {
        setPlay(!play);
    };

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
                setPLaylist_ctx(res.tracks.items)
            })


    }, [])

    useEffect(() => {
        if(img_ref.current && bgColor) {
            setBgColor(getAverageRGB(img_ref.current));
        }
    })


    return (
        <>
            <div 
                className="absolute top-0 left-0 right-0 h-[70%] w-full z-[-1] bg-gradient-to-b from-[#00000070] to-[#161616] opacity-100 pb-10"
                style={{
                    backgroundColor: bgColor
                }}
            ></div>

            {/* {
                playlist?.tracks ? (
                    <div className="backdrop backdrop-blur-[70px] absolute top-0 left-0 right-0 h-[70%] w-full z-[-5] bg-no-repeat bg-cover pb-10" style={{ backgroundImage: `url(${playlist.images[0].url})` }}></div>
                ) : (
                    <div className="backdrop backdrop-blur-[70px] absolute top-0 left-0 right-0 h-[70%] w-full z-[-1] bg-gradient-to-b from-[#1fdf6570] to-[#161616] pb-10"></div>
                )
            } */}


            {
                playlist?.tracks ? (
                    <section className="flex gap-6 pt-6 pb-10">
                        <div className="playlist_img">
                            <img ref={img_ref} className="max-w-[290px] max-h-[290px] w-[250px] h-[250px] rounded object-cover shadow-[0px_0px_65px_4px_rgba(0,0,0,0.54)]" src={playlist?.images[0]?.url} alt="playlist-card" />
                        </div>
                        <div className="playlist_info flex flex-col justify-end gap-3">
                            <h3 className="text-xl uppercase font-bold text-white">{playlist.type}</h3>
                            <h1 className="font-bold w-[90%] text-5xl text-white capitalize">{playlist.name}</h1>
                            <p className="text-[#cbc8c4]">{playlist.description}</p>
                            <div className="flex  text-[#cbc8c4]">
                                <span className="text-white cursor-pointer hover:underline">{playlist.owner.display_name}</span>
                                <h5>, {playlist.tracks.items.length} треков</h5>
                            </div>
                        </div>
                    </section>
                ) : (
                    <section className="flex gap-6 pt-6 pb-10">
                        <div className="playlist_img max-w-[290px] max-h-[300px] w-[250px] h-[260px] rounded object-cover shadow-[0px_0px_65px_4px_rgba(0,0,0,0.54)] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                        <div className="playlist_info flex flex-col justify-end gap-3">
                            <div className="text-xl uppercase font-bold text-white w-[130px] h-5 bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className=" font-bold  text-5xl text-white capitalize bg-[#c4c4c4] opacity-20 rounded-lg w-[500px] h-[150px]"></div>
                            <div className="text-[#cbc8c4] w-[355px] h-[25px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                            <div className="text-[#cbc8c4] w-[355px] h-[25px] bg-[#c4c4c4] opacity-20 rounded-lg"></div>
                        </div>
                    </section>
                )
            }

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
                    !playlist?.tracks ? (
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
                        playlist.tracks.items.map((item, idx) => (
                            <Track
                                img={item.track.album.images[0].url}
                                name={item.track.name}
                                singers={artistsString(item.track.artists)}
                                duration={toMinutes(item.track.duration_ms)}
                                album={item.track.album.name}
                                date={item.added_at}
                                src={item.track.preview_url}
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