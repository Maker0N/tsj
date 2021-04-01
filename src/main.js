import React from "react";
// import { Link } from 'react-router-dom'
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "./redux/tsjReducer";
import Front from './front'
import List from "./list";
import Button from "./button";
import Input from "./input";
import store from "./redux/store";

function Main() {
  const dispatch = useDispatch();
  const { authLogin } = useSelector((s) => s.tsjReducer);
  console.log(store.getState());
  let [state, setState] = useState("");
  let [stateResult, setStateResult] = useState([]);
  let [stateValueFlatNumber, setStateValueFlatNumber] = useState("");
  let [stateValueFlatSquare, setStateValueFlatSquare] = useState("");

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://192.168.1.76:5000/list")
        .then((res) => res.data)
        .then((res) => setStateResult(res))
        .catch((err) => {
          console.log(err);
        });
    }, 300);
  }, [state]);

  let flashButtonSend;
  let flashButtonChange;
  stateResult.map((it) => it.id).includes(stateValueFlatNumber)
    ? (flashButtonChange = true)
    : (flashButtonSend = true);

  const inputTitle = {
    classNameNumber: "inputFlat",
    classNameSquare: "inputSquare",
    type: "text",
    valueNumber: stateValueFlatNumber,
    valueSquare: stateValueFlatSquare,
  };

  const buttonTitle = {
    send: "Отправить",
    change: "Изменить",
    reset: "Очистить",
    exit: "Выйти",
  };

  const createOnChangeNumber = (e) => {
    setStateValueFlatNumber(e.target.value);
  };

  const createOnChangeSquare = (e) => {
    setStateValueFlatSquare(e.target.value);
  };

  const createOnClick = (e) => {
    e.preventDefault();
    const dataServer = {
      flatNumber: stateValueFlatNumber,
      flatSquare: stateValueFlatSquare,
    };
    setState(stateValueFlatNumber);
    if (
      isNaN(+stateValueFlatNumber) ||
      isNaN(+stateValueFlatSquare) ||
      stateValueFlatNumber === "" ||
      stateValueFlatSquare === ""
    ) {
      alert("Необходимо ввести номер квартиры и её площадь! (цифрами)");
    } else {
      axios
        .post(`http://192.168.1.76:5000/array`, dataServer)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      clearInput();
      setState(stateValueFlatSquare);
    }
  };

  const createOnClickChange = (e) => {
    e.preventDefault();
    const dataServer = {
      flatNumber: stateValueFlatNumber,
      flatSquare: stateValueFlatSquare,
    };
    axios
      .put(`http://192.168.1.76:5000/array`, dataServer)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    clearInput();
    setState(stateValueFlatSquare);
  };

  const clearInput = () => {
    setStateValueFlatNumber("");
    setStateValueFlatSquare("");
  };

  console.log(stateValueFlatNumber, stateValueFlatSquare);

  if (store.getState().tsjReducer.authLogin === "") {
    return <Front />;
  } else {
    return (
      <div className="app">
        <div className="d-flex justify-content-between">
          <div>ТСЖ и ТСЖ</div>
          <div>
            Вы вошли как: {authLogin}
            <button
              className="btn btn-danger p-0 ms-1"
              onClick={(e) => {
                e.preventDefault();
                dispatch(logOut());
              }}
            >
              Выйти
            </button>
          </div>
        </div>
        <div>
          <div>Номер квартиры</div>
          <Input
            createOnChange={createOnChangeNumber}
            className={inputTitle.classNameNumber}
            type={inputTitle.type}
            value={inputTitle.valueNumber}
          />
          <div>Площадь квартиры</div>
          <Input
            createOnChange={createOnChangeSquare}
            className={inputTitle.classNameSquare}
            type={inputTitle.type}
            value={inputTitle.valueSquare}
          />
          <Button
            createOnClick={createOnClick}
            buttonTitle={buttonTitle.send}
            flashButton={flashButtonSend}
            stateValueFlatNumber={stateValueFlatNumber}
            stateValueFlatSquare={stateValueFlatSquare}
          />
          <Button
            createOnClick={createOnClickChange}
            buttonTitle={buttonTitle.change}
            flashButton={flashButtonChange}
            stateValueFlatNumber={stateValueFlatNumber}
            stateValueFlatSquare={stateValueFlatSquare}
          />
          <Button createOnClick={clearInput} buttonTitle={buttonTitle.reset} />
          <div>
            <List
              state={state}
              flatNumber={stateValueFlatNumber}
              stateResult={stateResult}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
