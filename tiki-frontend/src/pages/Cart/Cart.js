import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import CardCart from "../../components/CardCart/CardCart";
import * as UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateCartUser } from "../../services/UserService";

const cx = classNames.bind(styles);

const Cart = () => {
  const [Data, setData] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const { products } = cart;
  const navigate = useNavigate();

  const numberFormat = new Intl.NumberFormat("en-US");

  useEffect(() => {
    if (products) {
      console.log("products", cart);
      setData(products);
      setTotalPrice(cart.cartTotal);
    }
  }, [products]);

  const handlePayment = () => {
    if (Data.length === 0) {
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
          {Data.length !== 0 ? (
            Data?.map((item, index) => {
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
                <lable>{numberFormat.format(totalPrice)}VNĐ</lable>
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
                {numberFormat.format(Data.cartTotal)}VNĐ
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
