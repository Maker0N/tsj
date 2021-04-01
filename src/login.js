import axios from "axios";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authLogin } from './redux/tsjReducer'

const Login = () => {
  const [loginState, setLoginState] = useState({
    login: "",
    password: "",
  });
  // const [authLogin, setAuthLogin] = useState('')
  const [loginBoolean, setLoginBoolean] = useState();

  const dispatch = useDispatch()

  const funcAlert = (z) => {
    setLoginBoolean(z.authBoolean);
    dispatch(authLogin(z.login))
    return (
      (z.authBoolean === false || typeof z.authBoolean === "undefined") &&
      alert("Логин и пароль указаны неверно!")
    );
  };

  const clearValue = () => {
    setLoginState({...loginState, login: '', password: ''})
  }

  return (
    <div>
      <div className="mb-3 d-flex justify-content-center">
        <form>
          <div className="mb-3">
            <label
              className="d-flex justify-content-center mb-2"
              htmlFor="exampleInputEmail1"
            >
              Login
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="login"
              value={loginState.login}
              onChange={(e) =>
                setLoginState({ ...loginState, login: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label
              className="d-flex justify-content-center mb-2"
              htmlFor="exampleInputPassword1"
            >
              Password
            </label>
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={loginState.password}
              onChange={(e) =>
                setLoginState({ ...loginState, password: e.target.value })
              }
            />
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={(e) => {
                axios
                  .put("http://192.168.1.76:5000/login", loginState)
                  .then((res) => funcAlert(res.data))
                  .catch((err) => console.log(err));
                  clearValue()
              }}
            >
              {loginBoolean && <Redirect to="/main" />}
              SignIn
            </button>
            <button
              type="button"
              className="btn btn-primary m-2"
              onClick={(e) => {
                axios
                  .post("http://192.168.1.76:5000/signup", loginState)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
                  clearValue()
              }}
            >
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login
