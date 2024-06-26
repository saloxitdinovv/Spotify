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
import Player from './../components/Player';


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


        if (!token) {
            navigate('/login')
        }
    }, [])



    return (
        <>
            <header className="w-full flex justify-between items-center pl-[341px] pr-10 py-5">
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#131313] rounded-full p-2"
                    >
                        <IoIosArrowBack size={24} color="white" />
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-[#131313] rounded-full p-2"
                    >
                        <IoIosArrowForward size={24} color="white" />
                    </button>
                </div>
                <ProfileMenu />
            </header>


            <aside className="w-[300px] bg-black px-2.5 py-8 fixed top-0 left-0 bottom-0 flex flex-col items-start gap-7">
                <img src="/images/donify_logo.png" alt="logo" className="pl-6 w-[200px]" />
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
            <Player />
        </>
    )
}

export default Layout