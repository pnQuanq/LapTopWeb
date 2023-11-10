import React from "react";
import ProTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

const Menu = ({ children }) => {
  return (
    <div className={cx("wrapper")}>
      <p>Danh mục</p>
      <nav>{children}</nav>
    </div>
  );
};

Menu.propTypes = {
  children: ProTypes.node.isRequired,
};

export default Menu;
