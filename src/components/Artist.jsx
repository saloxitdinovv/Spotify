import { FaRegUserCircle } from "react-icons/fa";


function Artist({ img_src, nickName, type }) {
    return (
        <div className="singer w-[225px] p-3 rounded select-none cursor-pointer hover:bg-[#2a2a2a] transition duration-300 ease-in-out flex items-center flex-col justify-center gap-2">
            {
                img_src ? (
                    <img className="w-[185px] h-[185px] object-cover rounded-full mb-1" src={img_src} alt={nickName} />
                ) : (
                    <FaRegUserCircle size={185} />
                )
            }
            <span className="justify-self-start	self-start">
                <h4 className="text-base font-medium text-white">{nickName}</h4>
                <span className="text-[#969696] font-medium text-sm">{type}</span>
            </span>
        </div>
    );
}

export default Artist;