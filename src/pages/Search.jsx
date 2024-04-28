import PLaylist from "../components/Playlist";
import { CiSearch } from "react-icons/ci";


export default function Search() {

    return (
        <div>
            <div className='title_playlist w-full pt-10'>
                <div className="search w-[470px] bg-white h-12 rounded-3xl cursor-pointer flex items-center py-2 px-5 gap-3.5">
                    <CiSearch size={28} />
                    <input type="text" placeholder="Artists, songs, or podcasts" className="w-full h-full outline-none"/>
                </div>
            </div>
            <div className="genres pt-10">
                <h1 className="text-white text-3xl font-bold pb-5">Your top genres</h1>
                <div className="top_genres flex items-center justify-start gap-8 flex-wrap">
                    <div className="genre cursor-pointer">
                        <img src="/images/pop.png" alt="" />
                    </div>
                    <div className="genre cursor-pointer">
                        <img src="/images/hip_hop.png" alt="" />
                    </div>
                    <div className="genre cursor-pointer">
                        <img src="/images/indie.png" alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}