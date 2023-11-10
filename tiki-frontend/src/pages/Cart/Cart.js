import React, { useState } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(location.state.quantity);

  const handleDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleUp = () => {
    setQuantity(quantity + 1);
  };
  return (
    <div className={cx("container")}>
      <h1 style={{ paddingBlock: "1rem" }}>Giỏ hàng</h1>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <p>Tất cả sản phẩm</p>
          <p>Đơn giá</p>
          <p>Số lượng</p>
          <p>Thành tiền</p>
        </div>
        <div className={cx("firm")}>
          <div className={cx("price-content")}>
            <div className={cx("location")}>
              <p>Địa chỉ: HCM Hồ Chí Minh Quận 1</p>
            </div>
            <div className={cx("price-detail")}>
              <lable className={cx("lable")}>
                Tạm tính:
                <lable>{location.state.price * quantity}đ</lable>
              </lable>
              <lable className={cx("lable")}>
                Giảm giá:
                <lable>{location.state.price * quantity * 0.1}đ</lable>
              </lable>
              <lable className={cx("lable")}>
                Phí vận chuyển:
                <lable>30.000đ</lable>
              </lable>
            </div>
            <div className={cx("price-total")}>
              <p>Tổng cộng:</p>
              <p className={cx("total")}>{location.state.price * quantity}đ</p>
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
