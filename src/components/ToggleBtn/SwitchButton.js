import React from "react";
// SwitchButton Component
const SwitchButton = ({ checked, onClick }) => {
  return (
    <button
      type="button"
      className={`relative inline-flex flex-shrink-0 h-6 transition-all duration-200 ease-in-out bg-white border border-gray-400 rounded-full cursor-pointer w-11 ${
        checked ? "bg-indigo-600" : "bg-white"
      }`}
      role="switch"
      aria-checked={checked}
      onClick={onClick}
    >
      <span className="sr-only">Enable</span>
      <SwitchHandle checked={checked} />
    </button>
  );
};
// SwitchHandle Component
const SwitchHandle = ({ checked }) => {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-3.5 h-3.5 mt-1 ml-1 transition duration-200 ease-in-out transform ${
        checked ? "translate-x-5 bg-sky-950" : "translate-x-0 bg-gray-400"
      } rounded-full pointer-events-none ring-0`}
    ></span>
  );
};
export default SwitchButton;
