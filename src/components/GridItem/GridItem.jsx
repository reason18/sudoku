import React, { useRef, useEffect } from "react";

export const GridItem = ({ data, isActive }) => {
  const element = useRef(null);

  useEffect(() => {
    if (isActive) {
      element.current.focus();
    }
  }, [isActive]);

  return (
    <label className={`grid-item ${data.className}`} key={data.id}>
      <input
        ref={element}
        name={data.id}
        type="number"
        value={data.value}
        readOnly
        autoComplete="off"
      />
    </label>
  );
};
