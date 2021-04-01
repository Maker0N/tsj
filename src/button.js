import React from "react";

const Button = (props) => {
  return (
    <button
      className={
        !props.flashButton ||
        ((props.stateValueFlatNumber === ""
        || typeof props.stateValueFlatNumber === 'undefined')
        || (props.stateValueFlatSquare === ""
        || typeof props.stateValueFlatSquare === 'undefined'))
          ? "m-2 btn btn-success"
          : "m-2 btn btn-warning"
      }
      onClick={(e) => props.createOnClick(e)}
    >
      {props.buttonTitle}
    </button>
  );
};

export default Button;
