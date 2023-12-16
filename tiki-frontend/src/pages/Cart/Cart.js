import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import CardCart from "../../components/CardCart/CardCart";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { resetState } from "../../redux/slide/orderSlide";

const cx = classNames.bind(styles);

const Cart = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const numberFormat = new Intl.NumberFormat("en-US");

  const handlePayment = () => {
    if (cart.products.length === 0) {
      alert("Không có sản phẩm nào trong giỏ hàng");
      return;
    } else {
      navigate("/payment");
    }
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
          {cart.products.length !== 0 ? (
            cart.products?.map((item, index) => {
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
              <p>Địa chỉ: {user.address ? user.address : "empty"} </p>
            </div>
            <div className={cx("phone")}>
              <p>Số điện thoại: {user.phone ? user.phone : "empty"} </p>
            </div>
            <div className={cx("price-detail")}>
              <lable className={cx("lable")}>
                Tạm tính:
                <lable>{numberFormat.format(cart?.cartTotal)}VNĐ</lable>
              </lable>
              <lable className={cx("lable")}>
                Giảm giá:
                <lable>0 VNĐ</lable>
              </lable>
              <lable className={cx("lable")}>
                Phí vận chuyển:
                <lable>0 VNĐ</lable>
              </lable>
            </div>
            <div className={cx("price-total")}>
              <p>Tổng cộng:</p>
              <p className={cx("total")}>
                {numberFormat.format(cart?.cartTotal)}VNĐ
              </p>
            </div>
          </div>
          <div className={cx("button-buy")}>
            <button onClick={handlePayment}>Thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
