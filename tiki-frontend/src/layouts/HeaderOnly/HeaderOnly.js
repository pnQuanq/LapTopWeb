import Header from "../components/Header/Header";

import styles from "./HeaderOnly.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HeaderOnly = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <Header />
      <div className={cx("container-content")}>
        <div className={cx("main-content")}>{children}</div>
      </div>
    </div>
  );
};

export default HeaderOnly;
