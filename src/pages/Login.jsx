


export default function Login(params) {
    const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT
    const client_id = import.meta.env.VITE_CLIENT_ID
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
    const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE

    let url = `${AUTH_ENDPOINT}?client_id=${client_id}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=user-top-read`

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <a href={url} className="cursor-pointer py-2 px-4 bg-white rounded">
                <button>Login</button>
            </a>
        </div>
    )
}