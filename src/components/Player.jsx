import { CgLaptop } from "react-icons/cg";
import { FaHeart } from "react-icons/fa";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { PiQueueFill } from "react-icons/pi";
import { TbArrowsDiagonal, TbMicrophone2 } from "react-icons/tb";
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { IoPauseSharp, IoPlay } from 'react-icons/io5';
import CustomRangeSliderPLayer from "./Slider";
import VolumeSlider from './VolumeSlider';
import { useContext, useEffect, useState } from "react";
import { TrackContext } from "../../context/TrackCTX";
import { PLaylistContext } from "../../context/PlaylistCTX";
import { artistsString, toMinutes } from "../../helpers/utils";
import { useRef } from "react";



export default function PLayer() {
    const [play, setPlay] = useState(false)
    const [currTime, setCurrTime] = useState(0)
    const { track, setTrack } = useContext(TrackContext)
    const { playlist_ctx } = useContext(PLaylistContext)

    const [recent, setRecent] = useState([])

    const audio_ref = useRef(null)

    const [token, setToken] = useState(
        localStorage.getItem('token')
    )

    const url = import.meta.env.VITE_PUBLIC_URL

    useEffect(() => {
        if (track) {
            audio_ref.current.src = track?.src

            audio_ref.current.onloadedmetadata = () => {
                setCurrTime(audio_ref.current.duration)
            };

            audio_ref.current.play()
            setPlay(true)
        }


        fetch(url + '/me/player/recently-played', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setRecent(res.items.at(-1).track)
                // console.log(res.items);
            })
    }, [track])

    function prevTrack() {
        const prevIndex = (track.index - 1 + playlist_ctx.length) % playlist_ctx.length;
        setTrack(createTrackObject(prevIndex));
    }

    function nextTrack() {
        const nextIndex = (track.index + 1) % playlist_ctx.length;
        setTrack(createTrackObject(nextIndex));
    }

    function createTrackObject(index) {
        const trackObj = playlist_ctx[index]?.track;
        return {
            img: trackObj?.album?.images[0].url,
            name: trackObj?.name,
            singers: artistsString(trackObj?.artists),
            duration: toMinutes(trackObj?.duration_ms),
            album: trackObj?.album.name,
            date: trackObj?.release_date,
            src: trackObj?.preview_url,
            index: index
        };
    }


    const togglePlay = () => {
        if (play) {
            audio_ref.current.pause();
        } else {
            audio_ref.current.play();
        }
        setPlay(!play);
    };

    return (
        <>
            {
                track?.name ? (
                    <div className="player_box fixed bottom-0 left-0 h-[112px] bg-[#181818] w-full p-5 flex justify-between">
                        <div className="song_box flex items-center gap-[15px] w-[20%]">
                            <img src={track?.img ? (track.img) : ('/images/song_poster.png')} alt="" className="song_poster w-[70px]" />
                            <div className="song_info">
                                <h1 className="song_name text-lg font-bold text-white">
                                    {track?.name ? (
                                        track.name.length > 10 ? (
                                            track.name.substring(0, 10) + '...'
                                        ) : (
                                            track.name
                                        )
                                    ) : (
                                        'Dreaming On'
                                    )}
                                </h1>

                                <h1 className="singer text-[#B3B3B3] font-bold text-base mt-[-5px]">{track?.singers ? (track.singers) : ('NEFFEX')}</h1>
                            </div>
                            <button className="liked">
                                <FaHeart color="#1DB954" size={20} />
                            </button>
                        </div>
                        <div className="player flex flex-col justify-center gap-2 items-center">
                            <audio
                                controls
                                hidden
                                preload="metadata"
                                ref={audio_ref}
                                onTimeUpdate={(e) => {
                                    setCurrTime(e.target.currentTime);
                                }}
                                onEnded={(e) => {
                                    nextTrack()
                                }}
                            />
                            <div className="flex items-center gap-2" >
                                <button
                                    onClick={prevTrack}
                                    className="text-[#c4c4c4]"
                                >
                                    <MdSkipPrevious size={24} />
                                </button>
                                <button className="play p-[8px] text-center bg-white rounded-full" onClick={togglePlay}>
                                    {
                                        play ? <IoPauseSharp size={24} /> : <IoPlay size={24} />
                                    }
                                </button>
                                <button
                                    onClick={nextTrack}
                                    className="text-[#c4c4c4]"
                                >
                                    <MdSkipNext size={24} />
                                </button>
                            </div>
                            <div className=" flex items-center gap-2 text-[#c4c4c4] pl-8" >
                                <span>0:{String(Math.round(currTime)).padStart(2, '0')}</span>
                                {/* <input type="range" className="custom-range w-[630px]" /> */}
                                <CustomRangeSliderPLayer />
                                <span>00:30</span>
                            </div>
                        </div>
                        <div className="player_info flex items-center gap-3 w-[21%]">
                            <button className="microphone">
                                <TbMicrophone2 color="#B3B3B3" size={20} />
                            </button>
                            <button className="queue">
                                <PiQueueFill size={25} color="#B3B3B3" />
                            </button>
                            <button className="device">
                                <CgLaptop size={25} color="#1B9145" />
                            </button>
                            <VolumeSlider />
                            <button className="arrows">
                                <TbArrowsDiagonal size={20} color="#B3B3B3" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="player_box fixed bottom-0 left-0 h-[112px] bg-[#181818] w-full p-5 flex justify-between">
                        {
                            recent?.name ? (
                                <div className="player_box fixed bottom-0 left-0 h-[112px] bg-[#181818] w-full p-5 flex justify-between">
                                    <div className="song_box flex items-center gap-[15px] w-[20%]">
                                        <img src={recent?.album?.images ? (recent.album.images[0].url) : ('/images/song_poster.png')} alt="" className="song_poster w-[70px]" />
                                        <div className="song_info">
                                            <h1 className="song_name text-lg font-bold text-white">
                                                {recent?.name ? (
                                                    recent.name.length > 10 ? (
                                                        recent.name.substring(0, 10) + '...'
                                                    ) : (
                                                        recent.name
                                                    )
                                                ) : (
                                                    'Dreaming On'
                                                )}
                                            </h1>

                                            <h1 className="singer text-[#B3B3B3] font-bold text-base mt-[-5px]">{recent?.artists ? (recent.artists[0].name) : ('NEFFEX')}</h1>
                                        </div>
                                        <button className="liked">
                                            <FaHeart color="#1DB954" size={20} />
                                        </button>
                                    </div>
                                    <div className="player flex flex-col justify-center gap-2 items-center">
                                        <audio
                                            controls
                                            hidden
                                            preload="metadata"
                                            ref={audio_ref}
                                            onTimeUpdate={(e) => {
                                                setCurrTime(e.target.currentTime);
                                            }}
                                            onEnded={(e) => {
                                                nextTrack()
                                            }}
                                            src={recent.preview_url}
                                        />
                                        <div className="flex items-center gap-2" >
                                            <button
                                                onClick={prevTrack}
                                                className="text-[#c4c4c4]"
                                            >
                                                <MdSkipPrevious size={24} />
                                            </button>
                                            <button className="play p-[8px] text-center bg-white rounded-full" onClick={togglePlay}>
                                                {
                                                    play ? <IoPauseSharp size={24} /> : <IoPlay size={24} />
                                                }
                                            </button>
                                            <button
                                                onClick={nextTrack}
                                                className="text-[#c4c4c4]"
                                            >
                                                <MdSkipNext size={24} />
                                            </button>
                                        </div>
                                        <div className=" flex items-center gap-2 text-[#c4c4c4] pl-8" >
                                            <span>0:{String(Math.round(currTime)).padStart(2, '0')}</span>
                                            {/* <input type="range" className="custom-range w-[630px]" /> */}
                                            <CustomRangeSliderPLayer />
                                            <span>00:30</span>
                                        </div>
                                    </div>
                                    <div className="player_info flex items-center gap-3 w-[21%]">
                                        <button className="microphone">
                                            <TbMicrophone2 color="#B3B3B3" size={20} />
                                        </button>
                                        <button className="queue">
                                            <PiQueueFill size={25} color="#B3B3B3" />
                                        </button>
                                        <button className="device">
                                            <CgLaptop size={25} color="#1B9145" />
                                        </button>
                                        <VolumeSlider />
                                        <button className="arrows">
                                            <TbArrowsDiagonal size={20} color="#B3B3B3" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <h1>loadins</h1>
                            )
                        }
                    </div>
                )
            }
        </>
    )
}