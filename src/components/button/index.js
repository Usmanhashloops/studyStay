import React from "react";

export default function Button(props) {
  return (
    <button
      type="button"
      style={props?.style}
      className={`${`inline-flex items-center justify-center px-6 py-2 text-sm font-bold leading-5 text-black transition-all duration-200 bg-slate-400 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-blue-500 ${
        props.className && props.className
      }`} ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      onClick={props?.onClick}
    >
      {props.startIcon && <props.startIcon className="w-6 h-6 ml-2" />}
      {props?.title}
      {props.endIcon && <props.endIcon className="w-6 h-6 ml-2" />}
    </button>
  );
}
Button.defaultProps = {
  title: "secondary",
};
