import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slide/userSlide";

const cx = classNames.bind(styles);

const Login = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleFocusEmail = () => {
    setIsFocused(true);
  };
  const handleBlurEmail = () => {
    setIsFocused(false);
  };
  const handleChangeEmail = (event) => {
    // Kiểm tra tính hợp lệ của input và cập nhật isValid
    const inputValue = event.target.value;
    const isValidInput =
      inputValue.length > 0; /* Điều kiện kiểm tra tính hợp lệ */
    setIsValid(isValidInput);
    setEmail(event.target.value);
  };
  const handleFocusPassword = () => {
    setIsFocusedPass(true);
  };
  const handleBlurPassword = () => {
    setIsFocusedPass(false);
  };
  const handleChangePassword = (event) => {
    const inputValuePass = event.target.value;
    const isValidInputPass = inputValuePass.length > 1;
    setIsValidPass(isValidInputPass);
    setPassword(event.target.value);
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));
  console.log("mutation", mutation);

  const { isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      if (location?.state) {
        alert("Đăng nhập thành công");
        navigate(location.state);
      } else {
        alert("Đăng nhập thành công");
        navigate("/");
      }
      localStorage.setItem(
        "access_token",
        JSON.stringify(mutation.data?.access_token)
      );
      if (mutation.data?.access_token) {
        const decoded = jwt_decode(mutation.data?.access_token);
        console.log("decoded", decoded);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, mutation.data?.access_token);
        }
      }
    } else if (isSuccess && mutation.data.status === "ERR") {
      alert(mutation.data.message);
      console.log(mutation.data.status);
    }
  }, [isSuccess]);

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
    console.log("res", res);
  };

  const handleLogin = () => {
    mutation.mutate({ email, password });
    if (!email || !password) {
      console.log("Vui lòng nhập đầy đủ thông tin");
    } else {
      console.log("email", email);
      console.log("password", password);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={cx("container")}>
      <div className={cx("inner")}>
        <div className={cx("form-box-login")}>
          <h2>Login</h2>
          <div>
            <div className={cx("input-box")}>
              <span className={cx("icon")}>
                <AiOutlineMail color="white" />
              </span>
              <input
                type="email"
                value={email}
                onFocus={handleFocusEmail}
                onBlur={handleBlurEmail}
                onChange={handleChangeEmail}
              />
              <label style={{ top: isFocused || isValid ? "0" : "24px" }}>
                Email
              </label>
            </div>
            <div className={cx("input-box")}>
              <span className={cx("icon")}>
                <AiOutlineLock color="white" />
              </span>
              <input
                type="password"
                value={password}
                onFocus={handleFocusPassword}
                onBlur={handleBlurPassword}
                onChange={handleChangePassword}
              />
              <label
                style={{ top: isFocusedPass || isValidPass ? "0" : "24px" }}
              >
                Password
              </label>
            </div>

            <div className={cx("remember-forgot")}>
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <span className={cx("a")}>Forgot password?</span>
            </div>
            <button onClick={handleLogin}>Login</button>
            <div className={cx("login-register")}>
              <p>
                Don't have an account?{" "}
                <span className={cx("a")} onClick={handleRegister}>
                  {" "}
                  Register
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
