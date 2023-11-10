import React, { useEffect, useState } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserService";
import { useMutationHook } from "../../hooks/useMutationHook";

const cx = classNames.bind(styles);

const Register = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [isValidPass, setIsValidPass] = useState(false);

  const [isFocusedConfirmPass, setIsFocusedConfirmPass] = useState(false);
  const [isValidConfirmPass, setIsValidConfirmPass] = useState(false);

  const [isFocusedName, setIsFocusedName] = useState(false);
  const [isValidName, setIsValidName] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleFocusName = () => {
    setIsFocusedName(true);
  };
  const handleBlurName = () => {
    setIsFocusedName(false);
  };
  const handleChangeName = (event) => {
    const inputValueName = event.target.value;
    const isValidName = inputValueName.length > 0;
    setIsValidName(isValidName);
    setName(event.target.value);
  };

  const handleFocusEmail = () => {
    setIsFocused(true);
  };
  const handleBlurEmail = () => {
    setIsFocused(false);
  };
  const handleChangeEmail = (event) => {
    const inputValue = event.target.value;
    const isValidInput = inputValue.length > 0;
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
    const isValidInputPass = inputValuePass.length > 0;
    setIsValidPass(isValidInputPass);
    setPassword(event.target.value);
  };

  const handleFocusConfirmPassword = () => {
    setIsFocusedConfirmPass(true);
  };
  const handleBlurConfirmPassword = () => {
    setIsFocusedConfirmPass(false);
  };
  const handleChangeConfirmPassword = (event) => {
    const inputValuePass = event.target.value;
    const isValidInputPass = inputValuePass.length > 0;
    setIsValidConfirmPass(isValidInputPass);
    setConfirmPassword(event.target.value);
  };

  const mutation = useMutationHook((data) => UserService.registerUser(data));

  const { isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      alert("Đăng ký thành công");
      console.log(mutation.data.status);
      navigate("/login");
    } else if (isSuccess && mutation.data.status === "ERR") {
      alert(mutation.data.message);
      console.log(mutation.data.status);
    }
  }, [isSuccess, isError]);

  const handleRegister = () => {
    mutation.mutate({ name, email, password, confirmPassword });
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <div className={cx("form-box-register")}>
          <h2>Register</h2>
          <div>
            {/* name */}
            <div className={cx("input-box")}>
              <span className={cx("icon")}>
                <AiOutlineUser color="white" />
              </span>
              <input
                type="text"
                value={name}
                onFocus={handleFocusName}
                onBlur={handleBlurName}
                onChange={handleChangeName}
              />
              <label
                style={{ top: isFocusedName || isValidName ? "0" : "24px" }}
              >
                Username
              </label>
            </div>
            {/* email */}
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
            {/* password */}
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
            {/* confirm password */}
            <div className={cx("input-box")}>
              <span className={cx("icon")}>
                <AiOutlineLock color="white" />
              </span>
              <input
                type="password"
                value={confirmPassword}
                onFocus={handleFocusConfirmPassword}
                onBlur={handleBlurConfirmPassword}
                onChange={handleChangeConfirmPassword}
              />
              <label
                style={{
                  top:
                    isFocusedConfirmPass || isValidConfirmPass ? "0" : "24px",
                }}
              >
                Password
              </label>
            </div>
            <button onClick={handleRegister}>Register</button>
            <div className={cx("register-login")}>
              <p>
                Have an account? <span onClick={handleLogin}>Login</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
