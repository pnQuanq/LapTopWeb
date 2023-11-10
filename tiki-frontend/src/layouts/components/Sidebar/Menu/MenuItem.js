import React from "react";
import ProTypes from "prop-types";
import classNames from "classnames/bind";
import { NavLink } from "react-router-dom";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

const MenuItem = ({ title, to, icon }) => {
  return (
    <NavLink to={to} className={cx("menu-item")}>
      {icon}
      <span className={cx("title")}>{title}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  title: ProTypes.string.isRequired,
  to: ProTypes.string.isRequired,
  icon: ProTypes.node.isRequired,
};

export default MenuItem;
