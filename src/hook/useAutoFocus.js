import { useRef } from "react";
export const useAutoFocus = (refMap) => {
  const inputRef = useRef({});

  const changeFocus = (condition, name) => {
    if (condition) {
      const nextRef = refMap[name];
      if (nextRef !== null) {
        inputRef.current[nextRef].focus();
      }
    }
  };
  return [inputRef, changeFocus];
};
