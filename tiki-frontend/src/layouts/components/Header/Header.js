import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import Search from "../Search";
import * as UserService from "../../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { useSelector, useDispatch } from "react-redux";
import lapTech_logo_3 from "../../../assets/images/lapTech_logo_3.png";

import { Tooltip } from "react-tippy";
import { resetUser } from "../../../redux/slide/userSlide";
import { resetState } from "../../../redux/slide/cartSlide";
import logo from "../../../assets/images/lapTech_logo_3.png";

const cx = classNames.bind(styles);

const Header = () => {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleProfile = () => {
    navigate("/profile");
    setVisible(false);
  };
  const handleCart = () => {
    navigate("/cart");
    setVisible(false);
  };

  const handleAdmin = () => {
    navigate("/system/admin");
    setVisible(false);
  };

  const handleLogout = async () => {
    await UserService.logoutUser();
    dispatch(resetUser());
    dispatch(resetState());
    setVisible(false);
    navigate("/");
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link className={cx("logo")} to={config.routes.home}>
          <img
            src= {logo}
            alt="laptopweb-logo"
            width="72"
            height="72"
          />
        </Link>
        <Search />
        <div className={cx("actions")}>
          <div
            className={cx("user")}
            onClick={() => {
              setVisible(true);
            }}
          >
            <Tooltip
              trigger="click"
              interactive
              open={visible}
              position="bottom"
              onRequestClose={() => {
                setVisible(false);
              }}
              html={
                <div className={cx("account-tooltip")}>
                  <div className={cx("item")}>
                    {user?.isAdmin ? (
                      <div onClick={handleProfile}>Profile</div>
                    ) : (
                      <div onClick={handleCart}>Đơn hàng của tôi</div>
                    )}
                  </div>
                  {/* đăng nhập hoặc hiện tên người dùng */}
                  <div className={cx("item")}>
                    {user?.name ? (
                      <div>
                        {user?.isAdmin ? (
                          <div onClick={handleAdmin}>Quản lý hệ thống</div>
                        ) : (
                          <div onClick={handleProfile}>Profile</div>
                        )}
                      </div>
                    ) : (
                      <div onClick={handleLogin}>Đăng Nhập</div>
                    )}
                  </div>
                  {/* đăng ký hoặc đăng xuất */}
                  <div className={cx("item")}>
                    {user?.name ? (
                      <div onClick={handleLogout}>Đăng xuất</div>
                    ) : (
                      <div onClick={handleRegister}>Đăng ký</div>
                    )}
                  </div>
                </div>
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FontAwesomeIcon
                  icon={faUser}
                  style={{ marginRight: "16px" }}
                />
                {user?.name ? <div>{user?.name}</div> : <div>Tài Khoản</div>}
              </div>
            </Tooltip>
          </div>
          <div className={cx("cart")} onClick={handleCart}>
            <div>
              {cart.products.length ? (
                <label
                  style={{
                    position: "absolute",
                    fontSize: "12px",
                    backgroundColor: "red",
                    color: "#fff",
                    top: "30%",
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginLeft: "12px",
                  }}
                >
                  {cart.products?.length}
                </label>
              ) : (
                <></>
              )}
              <FontAwesomeIcon
                icon={faCartShopping}
                style={{ marginRight: "16px" }}
              />
            </div>
            <div>Đơn hàng</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
