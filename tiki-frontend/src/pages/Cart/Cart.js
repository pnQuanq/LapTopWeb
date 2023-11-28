import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import CardCart from "../../components/CardCart/CardCart";

const cx = classNames.bind(styles);

const Cart = () => {
  const [Data, setData] = useState([]);
  const order = useSelector((state) => state.order);
  const { orderItems } = order;

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
  console.log("Data ", Data);

  const calculateTotal = () => {
    const total = Data.reduce((acc, item) => {
      return acc + item.total;
    }, 0);
    return total;
  };

  return (
    <div className={cx("container")}>
      <h1 style={{ paddingBlock: "1rem" }}>Giỏ hàng</h1>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("title")}>
            <p style={{ flex: 2 }}>Sản phẩm</p>
            <p style={{ flex: 1 }}>Đơn giá</p>
            <p style={{ flex: 1 }}>Số lượng</p>
            <p style={{ flex: 1 }}>Thành tiền</p>
            <p style={{ flex: 0.5 }}>Xóa</p>
          </div>
          {Data.length !== 0 ? (
            Data.map((item, index) => {
              return <CardCart key={index} props={item} />;
            })
          ) : (
            <div className={cx("empty")}>
              <p>Không có sản phẩm nào trong giỏ hàng</p>
            </div>
          )}
        </div>
        <div className={cx("firm")}>
          <div className={cx("price-content")}>
            <div className={cx("location")}>
              <p>Địa chỉ: HCM Hồ Chí Minh Quận 1</p>
            </div>
            <div className={cx("price-detail")}>
              <lable className={cx("lable")}>
                Tạm tính:
                <lable>{calculateTotal()}đ</lable>
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
              <p className={cx("total")}>{calculateTotal() + 30000}đ</p>
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
