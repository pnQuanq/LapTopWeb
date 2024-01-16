import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import dragon from "../../assets/images/dragon.png";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  const [theme, setTheme] = useState("tet");
  const [icon, setIcon] = useState("icon-tet");
  const ToggleTheme = () => {
    if (theme === "tet") {
      setTheme("light");
    } else {
      setTheme("tet");
    }
  };
  return (
    <div className={cx(theme)}>
      <Header />
      <div className={cx(icon)} onClick={ToggleTheme}></div>
      <div className={cx("container-content")}>
        <Sidebar />
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
