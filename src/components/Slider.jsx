import { useState, useEffect } from "react";

export default function CustomRangeSliderPLayer() {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const sliderEl = document.getElementById("range2");

    const handleInputChange = (event) => {
      const tempSliderValue = Number(event.target.value);
      setSliderValue(tempSliderValue);
    };

    sliderEl.addEventListener("input", handleInputChange);

    return () => {
      sliderEl.removeEventListener("input", handleInputChange);
    };
  }, []);

  const progress = (sliderValue / 50) * 100;

  return (
    <div className="range flex items-center">
      <input
        type="range"
        defaultValue={sliderValue}
        min={0}
        max={50}
        id="range2"
        className="range-input w-72 h-3 bg-black appearance-none cursor-pointer rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, #28a745 ${progress}%, #535353 ${progress}%)`
        }}
      />
    </div>
  );
}
