import { useEffect, useRef } from "react";

export const useClickOutSide = (callback) => {
  const dropdownEl = useRef();

  useEffect(() => {
    const handleClickOutside = (ev) => {
      if (!dropdownEl.current?.contains(ev.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [callback]);
  return dropdownEl;
};
