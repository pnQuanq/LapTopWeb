import React, { useEffect, useState } from "react";
import { getItem } from "../../utils";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import styles from "./Admin.module.scss";
import classNames from "classnames/bind";
import { Menu } from "antd";
import AdminUser from "./Component/User/User";
import Product from "./Component/Product/Product";
const cx = classNames.bind(styles);

const Admin = () => {
  const [keySelected, setKeySelected] = useState("");
  const items = [
    getItem(
      "Người dùng",
      "user",
      <UserOutlined style={{ fontSize: "24px" }} />
    ),
    getItem(
      "Sản phẩm",
      "product",
      <AppstoreOutlined style={{ fontSize: "24px" }} />
    ),
    getItem(
      "Đơn hàng",
      "order",
      <ShoppingCartOutlined style={{ fontSize: "24px" }} />
    ),
  ];
  const rootSubmenuKeys = ["user", "product", "order"];
  const handleOnClick = ({ key }) => {
    setKeySelected(key);
  };

  const renderPage = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <Product />;
      case "order":
        return <div>Đơn hàng</div>;
      default:
        return <></>;
    }
  };

  console.log("keySelected", keySelected);
  return (
    <div className={cx("container")}>
      <div>
        <Menu
          mode="inline"
          style={{
            left: 0,
            width: 256,
            height: "100vh",
            borderRight: "2px solid #f0f0f0",
            fontSize: "18px",
          }}
          items={items}
          onClick={handleOnClick}
        />
      </div>
      <div className={cx("content")}>{renderPage(keySelected)}</div>
    </div>
  );
};

export default Admin;
