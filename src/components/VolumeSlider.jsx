// import { useState, useEffect } from "react";

// export default function VolumeSlider() {
// 	const [volumeValue, setVolumeValue] = useState(100);
// 	const [isHovered, setIsHovered] = useState(false);
// 	const audio = document.querySelector('audio');

// 	useEffect(() => {
// 		const handleInputChange = (event) => {
// 			const tempVolumeValue = Number(event.target.value);
// 			setVolumeValue(tempVolumeValue);
// 			audio.volume = tempVolumeValue / 100;
// 		};

// 		const sliderEl = document.getElementById("volumeRange");

// 		sliderEl.addEventListener("input", handleInputChange);

// 		return () => {
// 			sliderEl.removeEventListener("input", handleInputChange);
// 		};
// 	}, [audio]);

// 	const volumeProgress = (volumeValue / 100) * 100;

// 	return (
// 		<div className="range flex items-center">
// 			<input
// 				type="range"
// 				value={volumeValue}
// 				min={0}
// 				max={100}
// 				id="volumeRange"
// 				className="volume-range-input w-115 h-3 bg-black appearance-none cursor-pointer rounded-full outline-none"
// 				style={{
// 					height: '5px',
// 					background: `linear-gradient(to right, #28a745 ${volumeProgress}%, #707070 ${volumeProgress}%)`
// 				}}
// 				onChange={(event) => setVolumeValue(Number(event.target.value))}
// 			/>

// 		</div>
// 	);
// }



import { useState, useEffect } from "react";
import { HiOutlineSpeakerWave } from "react-icons/hi2";

export default function VolumeSlider() {
	const [volumeValue, setVolumeValue] = useState(100);
	const [isHovered, setIsHovered] = useState(false);
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
		if (audio.volume === 0) {
			audio.volume = volumeValue / 100;
			setVolumeValue(volumeValue || 100);
		} else {
			audio.volume = 0;
			setVolumeValue(0);
		}
	};

	return (
		<div className="range flex items-center gap-3">
			<button className="speaker" onClick={handleMute}>
				<HiOutlineSpeakerWave color="#B3B3B3" size={24} />
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
