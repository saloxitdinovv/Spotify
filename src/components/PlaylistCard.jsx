
export default function PlaylistCard({ img_src, title, subtitle }) {

    return (
        <div className="rounded px-3.5 pt-3 pb-3 cursor-pointer transition ease-in-out bg-[#202020] duration-300 hover:bg-[#303030] flex flex-col items-center w-[200px] h-[290px]">
            <img className="w-full h-full max-w-[180px] max-h-[180px] object-cover mb-3 rounded-lg " src={img_src} alt={title} />
            <span className="self-start">
                <h4 className="text-base max-w-[180px] text-white">{title}</h4>
                <span className="text-base font-thin text-[#B3B3B3]">{subtitle}</span>
            </span>
        </div>
    )
}