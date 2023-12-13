import React, { useEffect, useState } from "react";
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import CardCart from "../../components/CardCart/CardCart";
import * as UserService from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { useMutationHook } from "../../hooks/useMutationHook";
import { updateCartUser } from "../../services/UserService";
import { Modal } from "antd";
import { resetState } from "../../redux/slide/cartSlide";
import { setCartProduct } from "../../redux/slide/cartSlide";
import {
  apiGetPublicProvinces,
  apiGetPublicDistricts,
} from "../../services/AppService";

const cx = classNames.bind(styles);

const Cart = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();

  //fetch cart user
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch cart user
        const userCartPromise = UserService.getUserCart(
          user?.id,
          user?.access_token
        );
        if (userCartPromise instanceof Promise) {
          const DBData = await userCartPromise;
          dispatch(setCartProduct(DBData));
          console.log("user cart :", cart);
        } else {
          console.error("getUserCart does not return a Promise");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  //fetch provincea
  useEffect(() => {
    const fetchPublicProvince = async () => {
      try {
        const res = await apiGetPublicProvinces();
        setProvinces(res?.data?.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    const fetchPublicDistrict = async () => {
      try {
        const res = await apiGetPublicDistricts(province);
        setDistricts(res?.data?.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    province && fetchPublicDistrict(province);
  }, [province]);

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
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleOk = () => {
    setIsOpenModal(false);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };
  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleOnChangeDetailAddress = (e) => {
    const address = detailaddress() + " " + e.target.value;
    setAddress(address);
  };
  const detailaddress = () => {
    if (province && district) {
      return `${
        provinces.find((item) => item.province_id === province)?.province_name
      },${
        districts.find((item) => item.district_id === district)?.district_name
      }`;
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
            <div className={cx("location")} style={{}}>
              <p>Địa chỉ: {address ? address : "empty"} </p>
              <p
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={handleOpenModal}
              >
                thay đổi
              </p>
            </div>
            <div className={cx("phone")} style={{}}>
              <p>Số điện thoại: {phone ? phone : "empty"} </p>
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
        <Modal
          title="Basic Modal"
          open={isOpenModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className={cx("wrapper-button")}>
              <div className={cx("modal-button-cancel")} onClick={handleCancel}>
                Cancel
              </div>

              <div className={cx("modal-button-submit")} onClick={handleOk}>
                Submit
              </div>
            </div>,
          ]}
        >
          <div>
            <div className={cx("modal-input")}>
              <p>Name:</p>
              <input type="text" value={name} name="name" />
            </div>

            <div className={cx("modal-input")}>
              <p>Phone:</p>
              <input
                type="text"
                value={phone}
                onChange={handleOnChangePhone}
                name="name"
              />
            </div>
            <div className={cx("modal-input")}>
              <p>Province / City:</p>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <option value="">Select province</option>
                {provinces.map((item) => {
                  return (
                    <option key={item?.province_id} value={item?.province_id}>
                      {item?.province_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={cx("modal-input")}>
              <p>District:</p>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select district</option>
                {districts.map((item) => {
                  return (
                    <option key={item?.district_id} value={item?.district_id}>
                      {item?.district_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className={cx("modal-input")}>
              <p>Detail:</p>
              <input
                type="text"
                onChange={(e) => handleOnChangeDetailAddress(e)}
                name="name"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Cart;
