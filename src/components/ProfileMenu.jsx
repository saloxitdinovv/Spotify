import { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { LuExternalLink } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

function ProfileMenu() {
    const [isOpen, setIsOpen] = useState(false)

    const [token, setToken] = useState(
        localStorage.getItem('token')
    )

    const [profile, setProfile] = useState({});

    function logOut() {
        localStorage.removeItem('token')
        location.reload()
    }

    useEffect(() => {
        fetch(import.meta.env.VITE_PUBLIC_URL + '/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setProfile(res)
            })
    }, [token])

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center gap-2 bg-[#0A0A0A] rounded-3xl p-1 text-white select-none"
            >
                {profile.images && profile.images.length > 0 ? (
                    <img className="rounded-full object-cover w-[34px]" src={profile?.images[0].url} alt="" />
                ) : (
                    <FaUserCircle size={34} />
                )}

                <span>{profile.display_name}</span>
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
