import React, { useEffect, useState } from "react";
import styles from "./Payment.module.scss";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
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

  const [Data, setData] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { orderItems } = order;

  const numberFormat = new Intl.NumberFormat("en-US");

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
      if (user.address === "" || user.phone === "") {
        alert("Please add your address and phone number");
      } else {
        navigate("/order");
      }
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
            <div className={cx("location")} style={{}}>
              <p>Địa chỉ: {user.address ? user.address : "empty"} </p>
              <p
                style={{ color: "#1890ff", cursor: "pointer" }}
                onClick={handleOpenModal}
              >
                thay đổi
              </p>
            </div>
            <div className={cx("price-detail")}>
              <lable className={cx("lable")}>
                Tạm tính:
                <lable>{numberFormat.format(calculateTotal())}VNĐ</lable>
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
                {numberFormat.format(calculateTotal() + 30000)}VNĐ
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
              <input
                type="text"
                value={user.name}
                //onChange={handleOnChange}
                name="name"
              />
            </div>

            <div className={cx("modal-input")}>
              <p>Phone:</p>
              <input
                type="text"
                value={user.phone}
                //onChange={handleOnChange}
                name="name"
              />
            </div>
            <div className={cx("modal-input")}>
              <p>Address:</p>
              <input
                type="text"
                value={user.address}
                //onChange={handleOnChange}
                name="name"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Payment;
