import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const DefaultLayout = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container-content")}>
        <Sidebar />
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
