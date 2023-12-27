import React, { useEffect, useState } from "react";
import styles from "./OrderSuccess.module.scss";
import classNames from "classnames/bind";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";
import { Space, Table } from "antd";

const cx = classNames.bind(styles);

const OrderSuccess = () => {
  const [Data, setData] = useState([]);
  const numberFormat = new Intl.NumberFormat("en-US");

  const columns = [
    {
      title: "Products",
      dataIndex: "orderItems",
      render: (orderItems) => (
        <div>
          {orderItems.map((item, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                margin: "10px 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <img
                src={item.image}
                style={{ height: "100px", width: "100px" }}
              />
              <div style={{ marginLeft: "8px" }}>
                <span style={{ fontSize: "16px" }}>Product: {item.name}</span>
                <br />
                <span style={{ fontSize: "16px" }}>
                  Amount: {numberFormat.format(item.amount)}
                </span>
                <br />
                <span style={{ fontSize: "16px" }}>
                  Price: {numberFormat.format(item.price)} đ
                </span>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Product Price",
      dataIndex: "itemsPrice",
      render: (itemsPrice) => (
        <p
          style={{
            fontWeight: "550",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {numberFormat.format(itemsPrice)} đ
        </p>
      ),
    },

    {
      title: "Ship Price",
      dataIndex: "shippingPrice",
      render: (shippingPrice) => (
        <p
          style={{
            fontWeight: "550",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {numberFormat.format(shippingPrice)} đ
        </p>
      ),
    },

    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (totalPrice) => (
        <p
          style={{
            fontWeight: "550",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {numberFormat.format(totalPrice)} đ
        </p>
      ),
    },

    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      render: (paymentMethod) => (
        <p
          style={{
            fontWeight: "550",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {paymentMethod}
        </p>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => (
        <p
          style={{
            fontWeight: "550",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {text}
        </p>
      ),
    },

    {
      title: "Status",
      dataIndex: "isDelivered",
      render: (status) => (
        <p
          style={{
            fontWeight: "550",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {status ? "Đã giao hàng" : "Đang giao hàng"}
        </p>
      ),
    },
  ];

  const user = useSelector((state) => state.user);
  //Fetch ALL data
  const fetchOrderByUserId = async () => {
    try {
      const res = await OrderService.getOrderByUserId(
        user?.id,
        user?.access_token
      );
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      const fetchData = async () => {
        try {
          //fetch all products
          const result = await fetchOrderByUserId();
          setData(result.data);
          console.log("result", result.data);
        } catch (error) {
          console.log("error", error);
        }
      };
      fetchData();
    } else {
      console.log("waiting....");
    }
  }, [user]);

  return (
    <div className={cx("container")}>
      <p>Đơn hàng của tôi</p>

      <div className={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default OrderSuccess;
