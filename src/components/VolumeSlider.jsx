import { useState, useEffect } from "react";

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

  return (
    <div className="range flex items-center">
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
      <style jsx>{`
        .volume-range-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          transition: .2s ease-in-out;
        }

        .volume-range-input::-moz-range-thumb {
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          transition: .2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
