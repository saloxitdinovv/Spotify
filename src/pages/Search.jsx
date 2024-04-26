import PLaylist from "../components/Playlist";
import { CiSearch } from "react-icons/ci";


export default function Search() {

    return (
        <>
            <div className='title_playlist w-full pl-[341px] pt-10'>
                <div className="search w-[470px] bg-white h-12 rounded-3xl cursor-pointer flex items-center py-2 px-5 gap-3.5">
                    <CiSearch size={28} />
                    <input type="text" placeholder="Artists, songs, or podcasts" className="w-full h-full outline-none"/>
                </div>
            </div>
        </>
    )
}