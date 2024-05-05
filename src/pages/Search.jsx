import { CiSearch } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import BestResult from "../components/BestResult";
import MiniTrack from "../components/MiniTrack";
import Artist from "../components/Artist";
import PlaylistCard from "../components/PlaylistCard";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { artistsString, toMinutes } from "../../helpers/utils";



function Search() {
    const url = import.meta.env.VITE_PUBLIC_URL

    const token = localStorage.getItem('token')

    const [results, setResults] = useState(null)


    return (
        <>
            <div className="search_input text-white bg-[#2a2a2a] rounded-full flex items-center justify-between w-[30%] px-2.5 absolute top-4 left-[480px]">
                <div className="right flex items-center gap-2">
                    <CiSearch color="white" size={21} />
                    <input
                        onKeyUp={(e) => {
                            let text = e.target.value
                            if (text.trim().length > 0) {
                                fetch(`${url}/search?q=${text}&type=album%2Cplaylist%2Ctrack%2Cartist%2Cshow&limit=5`, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                    .then(res => res.json())
                                    .then(res => {
                                        setResults(res)
                                    })
                            }
                        }}
                        className="h-full w-[100%] bg-[#2a2a2a] outline-none py-4" placeholder="Artists, songs, or podcasts" type="text" name="query" id="queryInput" />
                </div>
                <button><RxCross2 size={21} /></button>
            </div>

            {
                results ? (
                    <div className="h-screen">
                        <main className="h-fit mr-10 mt-6 text-white flex gap-5 justify-between">
                            <div className="w-[40%]">
                                <h2 className="text-3xl font-bold mb-5">Лучший результат</h2>
                                <BestResult
                                    img={results.tracks.items[0].album.images[0]?.url}
                                    name={results.tracks.items[0].name}
                                    singers={artistsString(results.tracks.items[0].artists)}
                                    duration={toMinutes(results.tracks.items[0].duration_ms)}
                                    album={results.tracks.items[0].album.name}
                                    date={results.tracks.items[0].album.release_date}
                                    src={results.tracks.items[0].preview_url}
                                    index={0}
                                    key={results.tracks.items[0].id}
                                />
                            </div>

                            <div className="result_tracks w-[60%]">
                                <h2 className="text-3xl font-bold mb-5">Треки</h2>
                                <div className="results flex flex-col">
                                    {
                                        results.tracks.items.slice(1, results.tracks.items.length + 1).map((item, idx) => (

                                            <MiniTrack
                                                img={item.album.images[0]?.url}
                                                name={item.name}
                                                singers={artistsString(item.artists)}
                                                duration={toMinutes(item.duration_ms)}
                                                album={item.album.name}
                                                date={item.album.release_date}
                                                src={item.preview_url}
                                                index={idx}
                                                key={idx}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </main>

                        <div className="songers mt-8 text-white">
                            <h2 className="text-3xl font-bold mb-5">Исполнители</h2>

                            <div className="singers grid grid-cols-5">
                                {
                                    results.artists.items.map((item, idx) => (
                                        <Link to={'/artists/' + item.id} key={item.id}>
                                            <Artist
                                                key={idx}
                                                nickName={item?.name}
                                                img_src={item?.images[0]?.url}
                                                type={item?.type}
                                            />
                                        </Link>

                                    ))
                                }
                            </div>
                        </div>

                        <div className="albums mt-8 text-white">
                            <h2 className="text-3xl font-bold mb-5">Albums</h2>

                            <div className="albums_grid grid grid-cols-5">
                                {
                                    results.albums.items.map((item, idx) => (
                                        <Link to={'/albums/' + item.id} key={item.id}>
                                            <PlaylistCard
                                                key={idx}
                                                img_src={item?.images[0]?.url}
                                                title={item?.name}
                                                subtitle={item?.type}
                                            />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="playlists mt-8 text-white">
                            <h2 className="text-3xl font-bold mb-5">Playlists</h2>

                            <div className="playlists_grid grid grid-cols-5">
                                {
                                    results.playlists.items.map((item, idx) => (
                                        <Link to={'/playlist/' + item.id} key={item.id}>
                                            <PlaylistCard
                                                key={item.id}
                                                img_src={item.images[0].url}
                                                title={item.name}
                                                subtitle={item.type}
                                            />
                                        </Link>

                                    ))
                                }
                            </div>
                        </div>

                        <div className="podcasts mt-8 text-white mb-[150px]">
                            <h2 className="text-3xl font-bold mb-5">Shows</h2>

                            <div className="podcasts_grid grid grid-cols-5">
                                {
                                    results.shows.items.map((item, idx) => (
                                        <Link to={'/audiobooks/' + item.id} key={item.id}>
                                            <PlaylistCard
                                                key={item.id}
                                                img_src={item.images[0].url}
                                                title={item.name}
                                                subtitle={item.type}
                                            />
                                        </Link>

                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="genres pt-10">
                            <h1 className="text-white text-3xl font-bold pb-5">Your top genres</h1>
                            <div className="top_genres flex items-center justify-start gap-8 flex-wrap">
                                <div className="genre cursor-pointer w-[350px]">
                                    <img src="/images/pop.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[350px]">
                                    <img src="/images/hip_hop.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[350px]">
                                    <img src="/images/indie.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="browse pt-10"></div>
                            <h1 className="text-white text-3xl font-bold pb-5">Browse all</h1>
                            <div className="top_genres flex items-center justify-start gap-3 flex-wrap">
                                <div className="genre cursor-pointer w-[180px]">
                                    <img src="/images/podcasts.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[180px]">
                                    <img src="/images/special.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[180px]">
                                    <img src="/images/charts.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[180px]">
                                    <img src="/images/releases.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[180px]">
                                    <img src="/images/discover.png" alt="" />
                                </div>
                                <div className="genre cursor-pointer w-[180px]">
                                    <img src="/images/concerts.png" alt="" />
                                </div>
                            </div>
                    </div>
                )
            }
        </>
    );
}

export default Search;