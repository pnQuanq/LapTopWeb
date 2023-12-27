import React, { useEffect, useState } from "react";
import styles from "./Order.module.scss";
import classNames from "classnames/bind";
import * as OrderService from "../../../../services/OrderService";
import * as AiIcons from "react-icons/ai";
import { Table } from "antd";

const cx = classNames.bind(styles);

const Order = () => {
  const [Data, setData] = useState([]);
  const numberFormat = new Intl.NumberFormat("en-US");
  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      render: (ID) => {
        return (
          <div style={{ fontWeight: "500", fontSize: "16px", width: "100px" }}>
            {ID}
          </div>
        );
      },
    },

    {
      title: "User",
      dataIndex: "shippingAddress",
      render: (shippingAddress) => (
        <p style={{ fontWeight: "500", fontSize: "16px" }}>
          {shippingAddress.fullName}
        </p>
      ),
    },

    {
      title: "OrderItems",
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
                width: "400px",
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
        <p style={{ fontWeight: "500", fontSize: "16px" }}>
          {numberFormat.format(itemsPrice)} đ
        </p>
      ),
    },

    {
      title: "Ship Price",
      dataIndex: "shippingPrice",
      render: (shippingPrice) => (
        <p style={{ fontWeight: "500", fontSize: "16px" }}>
          {numberFormat.format(shippingPrice)} đ
        </p>
      ),
    },

    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (totalPrice) => (
        <p style={{ fontWeight: "500", fontSize: "16px" }}>
          {numberFormat.format(totalPrice)} đ
        </p>
      ),
    },

    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      render: (paymentMethod) => (
        <p style={{ fontWeight: "500", fontSize: "16px" }}>{paymentMethod}</p>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => (
        <div style={{ fontWeight: "500", fontSize: "16px", width: "100px" }}>
          {text}
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "isDelivered",
      render: (isDelivered) => (
        <p style={{ fontWeight: "500", fontSize: "16px" }}>
          {isDelivered ? "Delivered" : "Not Delivered"}
        </p>
      ),
    },

    {
      title: "Action",
      render: (text, record) => (
        <div>
          <AiIcons.AiFillDelete className={cx("AiIcons")} color="red" />
          <AiIcons.AiFillEdit className={cx("AiIcons")} color="#F0E68C" />
        </div>
      ),
    },
  ];

  //Fetch ALL data
  const fetchOrderAll = async () => {
    try {
      const res = await OrderService.getAllOrder();
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchOrderAll();
        setData(result.data);
        console.log("data", result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={cx("container")}>
      <p>Quản lí đơn hàng</p>

      <div className={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default Order;
