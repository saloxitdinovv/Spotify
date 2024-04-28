import { Link } from "react-router-dom"


function PLaylist({img_src, playlist_name, id}) {


    return (
        <Link to={'/playlist/' + id}>
            <div className="playlist rounded w-[361px] h-[100px] bg-[#303030] flex items-center gap-5 cursor-pointer select-none hover:bg-[#424242]  transition">
                <img className="w-[100px] h-[100px]" src={img_src} alt="" />
                <h2 className='playlist_name text-xl text-white font-bold'>{playlist_name}</h2>
            </div>
        </Link>
    )
}

export default PLaylist