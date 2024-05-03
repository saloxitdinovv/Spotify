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



export default function PLayer() {
    const [play, setPlay] = useState(false)

    const { track, setTrack } = useContext(TrackContext)
    const { playlist_ctx } = useContext(PLaylistContext)

    useEffect(() => {
        let audio = document.querySelector('audio')
        audio.src = track?.src
        audio.play()
        setPlay(true)

    }, [track])

    function nextTrack() {
        const curr_track = playlist_ctx[track.index + 1]
        const next_track = {
            img: curr_track.track.album.images[0].url,
            name: curr_track.track.name,
            singers: artistsString(curr_track.track.artists),
            duration: toMinutes(curr_track.track.duration_ms),
            album: curr_track.track.album.name,
            date: curr_track.track.release_date,
            src: curr_track.track.preview_url,
            index: track.index + 1
        }
        setTrack(next_track)
    }

    function prevTrack() {
        const curr_track = playlist_ctx[track.index - 1]
        const prev_track = {
            img: curr_track.track.album.images[0].url,
            name: curr_track.track.name,
            singers: artistsString(curr_track.track.artists),
            duration: toMinutes(curr_track.track.duration_ms),
            album: curr_track.track.album.name,
            date: curr_track.track.release_date,
            src: curr_track.track.preview_url,
            index: track.index - 1
        }
        setTrack(prev_track)
    }

    return (
        <div className="player_box fixed bottom-0 left-0 h-[112px] bg-[#181818] w-full p-5 flex justify-between">
            <div className="song_box flex items-center gap-[15px] w-[20%]">
                <img src={track?.img ? (track.img) : ('/images/song_poster.png')} alt="" className="song_poster w-[70px]" />
                <div className="song_info">
                    <h1 className="song_name text-lg font-bold text-white">{track?.name ? (track.name) : ('Dreaming On')}</h1>
                    <h1 className="singer text-[#B3B3B3] font-bold text-base mt-[-5px]">{track?.singers ? (track.singers) : ('NEFFEX')}</h1>
                </div>
                <button className="liked">
                    <FaHeart color="#1DB954" size={20} />
                </button>
            </div>
            <div className="player flex flex-col justify-center gap-2 items-center">
                <audio className="main_player" src={track?.src} controls hidden></audio>
                <div className="flex items-center gap-2" >
                    <button
                        onClick={prevTrack}
                        className="text-[#c4c4c4]"
                    >
                        <MdSkipPrevious size={24} />
                    </button>
                    <button className="p-[8px] text-center bg-white rounded-full" >
                        {
                            true ? <IoPlay size={24} /> : <IoPauseSharp size={24} />
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
                    <span>0:57</span>
                    {/* <input type="range" className="custom-range w-[630px]" /> */}
                    <CustomRangeSliderPLayer />
                    <span>0:57</span>
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
                <button className="speaker">
                    <HiOutlineSpeakerWave color="#B3B3B3" size={24} />
                </button>
                <VolumeSlider />
                <button className="arrows">
                    <TbArrowsDiagonal size={20} color="#B3B3B3" />
                </button>
            </div>
        </div>
    )
}