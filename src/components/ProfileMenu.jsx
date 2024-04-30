import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";


function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    function logOut() {
        localStorage.removeItem('token')
        location.reload()
    }


    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center gap-2 bg-[#0A0A0A] rounded-3xl p-0.5 text-white select-none"
            >
                <img className="rounded-full object-cover" src="/images/user.png" alt="" />
                <span>User</span>
                <button>
                    <IoMdArrowDropdown size={24} />
                </button>
            </div>
            {
                isOpen ? (
                    <div className="w-60 p-5 bg-[#282828] absolute right-10 top-20 rounded-md">
                        <ul className="text-white text-xl font-medium flex flex-col gap-4">
                            <li className="flex justify-between items-center cursor-pointer">
                                <span>Account</span>
                                <LuExternalLink size={25} />
                            </li>
                            <li className="cursor-pointer">Profile</li>
                            <li 
                                onClick={() => logOut()}
                                className="cursor-pointer"
                            >Log out</li>
                        </ul>
                    </div>
                ) : null
            }
        </>

    )
}

export default ProfileMenu;