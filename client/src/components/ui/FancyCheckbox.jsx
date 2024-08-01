import React from "react";

const FancyCheckbox = ({ checked, onChange }) => {
  return (
    <label className="checkbox_container cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      <svg viewBox="0 0 84 84" height="1.2em" width="1.2em" className="overflow-visible">
        <path
          d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
          pathLength="575.0541381835938"
          className="path"
        ></path>
      </svg>
    </label>
  );
};

export default FancyCheckbox;
