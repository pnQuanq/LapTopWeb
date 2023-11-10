import styles from "./Nothing.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const Nothing = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container-content")}>{children}</div>
    </div>
  );
};

export default Nothing;
