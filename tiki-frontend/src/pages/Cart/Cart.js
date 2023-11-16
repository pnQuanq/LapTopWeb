import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";
import { Table } from "antd";
import * as AiIcons from "react-icons/ai";
import { useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Cart = () => {
  const [amount, setAmount] = useState(1);
  const [Data, setData] = useState([]);

  const order = useSelector((state) => state.order);
  const { orderItems } = order;
  console.log("orderItems", orderItems);

  useEffect(() => {
    if (orderItems) {
      setData(orderItems);
      setData((prev) => {
        const newData = prev.map((item) => {
          return {
            ...item,
            total: item.price * item.amount,
          };
        });
        return newData;
      });
    }
  }, [orderItems]);
  console.log("Data", Data);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => <img src={image} width={150} alt="Uploaded Image" />,
    },

    {
      title: "Sản phẩm",
      dataIndex: "name",
    },

    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      render: () => (
        <div className={cx("quantity-wrapper")}>
          <button onClick={handleDown}>-</button>
          <p>{amount}</p>
          <button onClick={handleUp}>+</button>
        </div>
      ),
    },
    // lam toi day roi
    {
      title: "Thành tiền",
      dataIndex: "total",
    },
    {
      title: "Xóa",
      dataIndex: "delete",
      render: () => <AiIcons.AiOutlineDelete />,
    },
  ];

  const handleDown = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };
  const handleUp = () => {
    setAmount(amount + 1);
  };

  return (
    <div className={cx("container")}>
      <h1 style={{ paddingBlock: "1rem" }}>Giỏ hàng</h1>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <Table
            columns={columns}
            dataSource={Data}
            style={{ width: "100%" }}
          />
        </div>
        <div className={cx("firm")}>
          <div className={cx("price-content")}>
            <div className={cx("location")}>
              <p>Địa chỉ: HCM Hồ Chí Minh Quận 1</p>
            </div>
            <div className={cx("price-detail")}>
              <lable className={cx("lable")}>
                Tạm tính:
                <lable>đ</lable>
              </lable>
              <lable className={cx("lable")}>
                Giảm giá:
                <lable>đ</lable>
              </lable>
              <lable className={cx("lable")}>
                Phí vận chuyển:
                <lable>30.000đ</lable>
              </lable>
            </div>
            <div className={cx("price-total")}>
              <p>Tổng cộng:</p>
              <p className={cx("total")}>đ</p>
            </div>
          </div>
          <div className={cx("button-buy")}>
            <button>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
