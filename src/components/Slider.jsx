import { useState, useEffect } from "react";

export default function CustomRangeSliderPlayer() {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const sliderEl = document.getElementById("range2");
    const audio = document.querySelector("audio");

    const handleInputChange = (event) => {
      const tempSliderValue = Number(event.target.value);
      setSliderValue(tempSliderValue);
      updatePlayTime(tempSliderValue);
    };

    const handleAudioTimeUpdate = () => {
      setSliderValue(audio.currentTime);
    };

    sliderEl.addEventListener("input", handleInputChange);
    audio.addEventListener("timeupdate", handleAudioTimeUpdate);

    return () => {
      sliderEl.removeEventListener("input", handleInputChange);
      audio.removeEventListener("timeupdate", handleAudioTimeUpdate);
    };
  }, []);

  const progress = (sliderValue / 30) * 100;

  function updatePlayTime(currTime) {
    let audio = document.querySelector("audio");
    audio.currentTime = currTime;
  }

  return (
    <div className="range flex items-center">
      <input
        type="range"
        value={sliderValue}
        min={0}
        max={30}
        id="range2"
        className="range-input w-72 h-3 bg-black appearance-none cursor-pointer rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, #28a745 ${progress}%, #535353 ${progress}%)`
        }}
        onChange={(e) => {
          setSliderValue(e.target.value);
          updatePlayTime(e.target.value);
        }}
      />
    </div>
  );
}
