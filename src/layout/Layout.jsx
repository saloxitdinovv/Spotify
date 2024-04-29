import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ProfileMenu from "../components/ProfileMenu";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { TbMicrophone2 } from "react-icons/tb";
import { PiQueueFill } from "react-icons/pi";
import { CgLaptop } from "react-icons/cg";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { TbArrowsDiagonal } from "react-icons/tb";


function Layout() {

    const [token, setToken] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem('token')
        let hash = location.hash

        if (!token && hash) {
            token = hash.split('=')[1].split('&')[0]

            location.href = ''
            localStorage.setItem('token', token)
        }

        setToken(token)
    }, [])

    if (!token) {
        navigate('/login')
    }

    return (
        <>
            <header className="w-full flex justify-between items-center pl-[341px] pr-10 py-5">
                <div className="flex items-center gap-5">
                    <button className="bg-[#131313] rounded-full p-2">
                        <IoIosArrowBack size={24} color="white" />
                    </button>
                    <button className="bg-[#131313] rounded-full p-2">
                        <IoIosArrowForward size={24} color="white" />
                    </button>
                </div>
                <ProfileMenu />
            </header>


            <aside className="w-[300px] bg-black px-2.5 py-8 fixed top-0 left-0 bottom-0 flex flex-col items-start gap-7">
                <img src="/icons/Spotify_big_logo.svg" alt="logo" className="pl-6" />
                <nav>
                    <ul>
                        <Link to={'/'}>
                            <li className="cursor-pointer text-white flex items-center justify-start gap-6 py-3 px-6 w-[280px] rounded-md  hover:bg-[#282828] rounded-md transition">
                                <GoHomeFill size={24} />
                                <span className="text-lg font-bold">Home</span>
                            </li>
                        </Link>
                        <Link to={'/search'}>
                            <li className="cursor-pointer text-white flex items-center justify-start gap-6 py-3 px-6 hover:bg-[#282828] rounded-md transition">
                                <FiSearch size={24} />
                                <span className="text-lg font-bold">Search</span>
                            </li>
                        </Link>
                        <Link to={'/library'}>
                            <li className="cursor-pointer text-white flex items-center justify-start gap-6 py-3 px-6 hover:bg-[#282828] rounded-md transition">
                                <BiLibrary size={24} />
                                <span className="text-lg font-bold">Your Library</span>
                            </li>
                        </Link>
                    </ul>
                </nav>
            </aside>
            <main className="pl-[345px]">
                <Outlet />
            </main>
            <div className="player_box fixed bottom-0 left-0 h-[112px] bg-[#181818] w-full p-5 flex justify-between">
                <div className="song_box flex items-center gap-[15px]">
                    <img src="/images/song_poster.png" alt="" className="song_poster" />
                    <div className="song_info">
                        <h1 className="song_name text-lg font-bold text-white">Dreaming On</h1>
                        <h1 className="singer text-[#B3B3B3] font-bold text-base mt-[-5px]">NEFFEX</h1>
                    </div>
                    <button className="liked">
                        <FaHeart color="#1DB954" size={20} />
                    </button>
                </div>
                <div className="player">
                    <audio src="" controls></audio>
                </div>
                <div className="player_info flex items-center gap-3">
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
                    <div className="volume w-[116px] h-1 rounded bg-[#C4C4C4]"></div>
                    <button className="arrows">
                        <TbArrowsDiagonal size={20} color="#B3B3B3" />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Layout