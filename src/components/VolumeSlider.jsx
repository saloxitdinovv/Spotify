import { useState, useEffect } from "react";
import { GoMute, GoUnmute } from "react-icons/go";


export default function VolumeSlider() {
	const [volumeValue, setVolumeValue] = useState(100);
	const audio = document.querySelector('audio');

	useEffect(() => {
		const handleInputChange = (event) => {
			const tempVolumeValue = Number(event.target.value);
			setVolumeValue(tempVolumeValue);
			audio.volume = tempVolumeValue / 100;
		};

		const sliderEl = document.getElementById("volumeRange");

		sliderEl.addEventListener("input", handleInputChange);

		return () => {
			sliderEl.removeEventListener("input", handleInputChange);
		};
	}, [audio]);

	const volumeProgress = (volumeValue / 100) * 100;

	const handleMute = () => {
		if (audio.volume == 0) {
			audio.volume = 1;
			setVolumeValue(100);
		} else {
			audio.volume = 0;
			setVolumeValue(0);
		}
	};

	return (
		<div className="range flex items-center gap-3">
			<button className="speaker" onClick={handleMute}>
				{
					volumeValue === 0 ? (<GoMute color="#B3B3B3" size={24} />) : (<GoUnmute color="#B3B3B3" size={24} />)
				}
			</button>
			<input
				type="range"
				value={volumeValue}
				min={0}
				max={100}
				id="volumeRange"
				className="volume-range-input w-115 h-3 bg-black appearance-none cursor-pointer rounded-full outline-none"
				style={{
					height: '5px',
					background: `linear-gradient(to right, #28a745 ${volumeProgress}%, #707070 ${volumeProgress}%)`
				}}
				onChange={(event) => setVolumeValue(Number(event.target.value))}
			/>
		</div>
	);
}
