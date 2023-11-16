import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import * as UserService from "../../../services/UserService";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { useSelector, useDispatch } from "react-redux";

import { Tooltip } from "react-tippy";
import { resetUser } from "../../../redux/slide/userSlide";

const cx = classNames.bind(styles);

const Header = () => {
  const [visible, setVisible] = useState(false);
  console.log("visible: ", visible, typeof visible);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

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
  };

  console.log("user: ", user);

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <Link className={cx("logo")} to={config.routes.home}>
          <img
            src="https://salt.tikicdn.com/ts/upload/c1/64/f7/4e6e925ea554fc698123ea71ed7bda26.png"
            alt="tiki-logo"
            width="72"
            height="72"
          />
        </Link>
        <div className={cx("search")}>
          <input placeholder="Tìm sản phẩm" spellCheck={false} />
          <span>|</span>
          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
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
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ marginRight: "16px" }}
            />
            <div>Đơn hàng</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
