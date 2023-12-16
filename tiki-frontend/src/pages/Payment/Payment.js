import React, { useEffect, useState } from "react";
import styles from "./Payment.module.scss";
import classNames from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import {
  apiGetPublicProvinces,
  apiGetPublicDistricts,
} from "../../services/AppService";
import { useMutationHook } from "../../hooks/useMutationHook";

import * as OrderService from "../../services/OrderService";
import * as UserService from "../../services/UserService";
import { resetState } from "../../redux/slide/cartSlide";

const cx = classNames.bind(styles);

const Payment = () => {
  const deliveryMethods = [
    { key: "standard", label: "Standard Delivery", fee: 30000 },
    { key: "express", label: "Express Delivery", fee: 50000 },
    // Add more delivery methods as needed
  ];

  const paymentMethods = [
    { key: "cod", label: "Thanh toán khi nhận hàng" },
    { key: "online", label: "Thanh toán online" },
    // Add more delivery methods as needed
  ];

  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();

  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [detailAddress, setDetailAddress] = useState();
  const [address, setAddress] = useState(user.address);
  const [phone, setPhone] = useState(user.phone);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const numberFormat = new Intl.NumberFormat("en-US");
  const mutationAddOrder = useMutationHook((data) => {
    const { token, ...rests } = data;
    const res = OrderService.createOrder({ ...rests }, token);
    return res;
  });
  const { isSuccess } = mutationAddOrder;

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

  useEffect(() => {
    if (isSuccess && mutationAddOrder.data.status === "OK") {
      alert("Đặt hàng thành công");
      dispatch(resetState());
      UserService.deleteAllUserCart(user?.id, user?.access_token);
      navigate("/");
    }
  }, [isSuccess]);

  const handleDeliveryMethodChange = (selectedMethod) => {
    setDeliveryMethod(selectedMethod);
    const selectedMethodObject = deliveryMethods.find(
      (method) => method.key === selectedMethod
    );
    if (selectedMethodObject) {
      setShippingFee(selectedMethodObject.fee);
    }
  };

  const handlePaymentMethodChange = (selectedMethod) => {
    setPaymentMethod(selectedMethod);
  };
  // Function to handle the payment submission (you can replace it with your actual logic)
  const handlePayment = () => {
    if (deliveryMethod === null && paymentMethod === null) {
      alert("Please select a delivery method and payment method");
      return;
    }
    if (deliveryMethod === null) {
      alert("Please select a delivery method");
      return;
    }
    if (paymentMethod === null) {
      alert("Please select a payment method");
      return;
    } else {
      if (address === "" || phone === "") {
        alert("Please add your address and phone number");
      } else if (paymentMethod === "online") {
        alert("Chức năng thanh toán online đang được phát triển");
      } else {
        mutationAddOrder.mutate({
          token: user?.access_token,
          orderItems: cart?.products,
          fullName: user?.name,
          address: address,
          phone: phone,
          city: province,
          paymentMethod: paymentMethod,
          itemsPrice: cart?.cartTotal,
          shippingPrice: shippingFee,
          totalPrice: cart?.cartTotal + shippingFee,
          user: user?.id,
          email: user?.email,
        });
      }
    }
  };
  const handleOpenModal = () => {
    setIsOpenModal(true);
  };
  const handleOk = () => {
    setIsOpenModal(false);
    const address = detailaddress() + " " + detailAddress;
    setAddress(address);
  };
  const handleCancel = () => {
    setIsOpenModal(false);
  };

  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleOnChangeDetailAddress = (e) => {
    const detailAdress = e.target.value;
    setDetailAddress(detailAdress);
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
      <h1 style={{ paddingBlock: "1rem" }}>Thanh toán</h1>
      <div className={cx("wrapper")}>
        <div className={cx("content")}>
          <div className={cx("delivery-methods")}>
            <div className={cx("title")}>
              <h3>Phương thức giao hàng</h3>
            </div>
            <div
              className={cx("methods")}
              onChange={handleDeliveryMethodChange}
              value={deliveryMethod}
            >
              {deliveryMethods.map((method) => (
                <div
                  className={cx("method")}
                  key={method.key}
                  onClick={() => handleDeliveryMethodChange(method.key)}
                >
                  <input
                    type="radio"
                    name="delivery"
                    id={`delivery-${method.key}`}
                    checked={deliveryMethod === method.key}
                    onChange={() => handleDeliveryMethodChange(method.key)}
                  />
                  <label htmlFor={`payment-${method.key}`}>
                    {method.label} - {numberFormat.format(method.fee)} VNĐ
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className={cx("payment-methods")}>
            <div className={cx("title")}>
              <h3>Phương thức thanh toán</h3>
            </div>
            <div className={cx("methods")}>
              {paymentMethods.map((method) => (
                <div
                  className={cx("method")}
                  key={method.key}
                  onClick={() => handlePaymentMethodChange(method.key)}
                >
                  <input
                    type="radio"
                    name="payment"
                    id={`payment-${method.key}`}
                    checked={paymentMethod === method.key}
                    onChange={() => handlePaymentMethodChange(method.key)}
                  />
                  <label htmlFor={`payment-${method.key}`}>
                    {method.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={cx("firm")}>
          <div className={cx("price-content")}>
            <div className={cx("location")}>
              <p>Địa chỉ: {address ? address : "empty"} </p>
              <p
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={handleOpenModal}
              >
                thay đổi
              </p>
            </div>
            <div className={cx("phone")}>
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
                <lable>{numberFormat.format(shippingFee)}VNĐ</lable>
              </lable>
            </div>
            <div className={cx("price-total")}>
              <p>Tổng cộng:</p>
              <p className={cx("total")}>
                {numberFormat.format(cart?.cartTotal + shippingFee)}VNĐ
              </p>
            </div>
          </div>
          <div className={cx("button-buy")} onClick={handlePayment}>
            <button>Đặt hàng</button>
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
              <input type="text" value={user.name} name="name" />
            </div>

            <div className={cx("modal-input")}>
              <p>Phone:</p>
              <input
                type="number"
                value={phone}
                onChange={handleOnChangePhone}
                name="phone"
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
                name="detail"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Payment;
