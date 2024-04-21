import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import ProfileMenu from "../components/ProfileMenu";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BiLibrary } from "react-icons/bi";






function Layout({ children }) {

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
                        <li className="text-white flex items-center justify-start gap-6 py-3 px-6 w-[280px] rounded-md cursor-pointer">
                            <GoHomeFill size={24} />
                            <span className="text-lg font-bold">Home</span>
                        </li>
                        <li className="text-white flex items-center justify-start gap-6 py-3 px-6">
                            <FiSearch size={24} />
                            <span className="text-lg font-bold">Search</span>
                        </li>
                        <li className="text-white flex items-center justify-start gap-6 py-3 px-6">
                            <BiLibrary size={24} />
                            <span className="text-lg font-bold">Your Library</span>
                        </li>
                    </ul>
                </nav>
            </aside>
            {children}
            <div></div>
        </>
    )
}

export default Layout