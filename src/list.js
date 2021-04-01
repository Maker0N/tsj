import React from "react";

const List = (props) => {

  console.log(props.stateResult);

  return (
    <div>
      <div>
        {typeof props.stateResult === "undefined"
          ? null
          : props.stateResult.map((it) => (
              <div key={it.id} style={it.flatNumber === props.flatNumber ? {color: 'red'} : {color: 'white'}}>
                Квартира № {it.flatNumber}, площадь {it.flatSquare}
              </div>
            ))}
      </div>
    </div>
  );
};

export default List;
