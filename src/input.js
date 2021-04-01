import React from "react";

const Input = (props) => {
  return (
    <input
      className={props.className}
      type={props.type}
      value={props.value}
      onChange={(e) => props.createOnChange(e)}
    />
  );
};

export default Input;
