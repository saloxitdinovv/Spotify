import { useContext } from "react";
import AudioSpinner from "./Audio";
import { TrackContext } from "../../context/TrackCTX";
import { FaHeart } from "react-icons/fa";


function Track({ src, img, name, singers, album, date, duration, index }) {
    const { track, setTrack } = useContext(TrackContext)

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    return (
        <div
            onClick={() => setTrack({ img, name, singers, album, date, duration, index, src })}
            className="track grid grid-cols-6 items-center px-5 py-2 rounded cursor-pointer hover:bg-[#2a2a2a]"
        >
            <div className="flex items-center gap-5 col-start-1 col-end-3">
                <div className="number w-[25px] flex items-center justify-center text-[#B3B3B3]">
                    {
                        index === track?.index ? <AudioSpinner /> :
                            <span className="text-lg">{index + 1}</span>
                    }
                </div>
                <img className="w-11 h-11" src={img} alt={name} />
                <div>
                    {
                        index === track?.index ? (
                            <h4 className="text-[#65D36E] cursor-pointer hover:underline text-base">
                                {name.length > 10 ? `${name.substring(0, 10)}...` : name}
                            </h4>
                        ) : (
                            <h4 className="text-white cursor-pointer hover:underline text-base">
                                {name.length > 10 ? `${name.substring(0, 10)}...` : name}
                            </h4>
                        )
                    }
                    <h4 className="text-sm hover:underline text-sm text-[#B3B3B3]">{singers}</h4>
                </div>
            </div>

            <h4 className="text-[#B3B3B3] text-sm">{album}</h4>
            <span></span>
            <h4>{formatDate(date)}</h4>
            <span className="flex items-center gap-5 pl-[70px]">
                <button className="liked"><FaHeart color="#63CF6C" size={20} /></button>
                <h4 className="flex justify-center text-[#ffff] text-base">{duration}</h4>
            </span>
        </div>
    );
}

export default Track;