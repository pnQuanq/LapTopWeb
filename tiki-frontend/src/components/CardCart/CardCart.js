import React, { useEffect, useState } from "react";
import styles from "./CardCart.module.scss";
import classNames from "classnames/bind";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeCartProduct,
} from "../../redux/slide/cartSlide";
import * as UserSerVice from "../../services/UserService";

const cx = classNames.bind(styles);

const CardCart = ({ props }) => {
  const dispatch = useDispatch();
  const numberFormat = new Intl.NumberFormat("en-US");
  const user = useSelector((state) => state.user);
  const [amount, setAmount] = useState(props?.amount);
  const [price, setPrice] = useState(props?.price * props?.amount);
  const handleChangeCount = async (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        setAmount(amount + 1);
        setPrice(price + props?.price);
        recurseIncrease();
        dispatch(increaseAmount(idProduct));
      }
    } else {
      if (amount > 1) {
        setAmount(amount - 1);
        setPrice(price - props?.price);
        recurseDecrease();
        dispatch(decreaseAmount(idProduct));
      } else if (amount === 1) {
        setAmount(1);
      }
    }
  };

  const recurseIncrease = () => {
    if (user?.id) {
      UserSerVice.updateUserCart(
        user?.id,
        props?.product,
        amount + 1,
        user?.access_token
      );
    } else {
      recurseIncrease();
    }
  };
  const recurseDecrease = () => {
    if (user?.id) {
      UserSerVice.updateUserCart(
        user?.id,
        props?.product,
        amount - 1,
        user?.access_token
      );
    } else {
      recurseDecrease();
    }
  };
  const handleDeleteProductinCart = (id, idProduct) => {
    dispatch(removeCartProduct({ idProduct }));
    UserSerVice.deleteUserCart(id, idProduct, user?.access_token);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("product")}>
          <div className={cx("image")}>
            <img
              src={props?.image}
              alt="img"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <div className={cx("name")}>{props?.name}</div>
        </div>
        <div className={cx("price")}>{numberFormat.format(props?.price)}Đ</div>
        <div className={cx("quantity")}>
          <div className={cx("wrapper-quantity")}>
            <button
              onClick={() =>
                handleChangeCount(
                  "decrease",
                  props?.product,

                  props?.amount === 1
                )
              }
            >
              -
            </button>
            <p>{amount}</p>
            <button
              onClick={() =>
                handleChangeCount(
                  "increase",
                  props?.product,
                  props?.amount === 50
                )
              }
            >
              +
            </button>
          </div>
        </div>
        <div className={cx("total")}>{numberFormat.format(price)}Đ</div>
        <div className={cx("remove")}>
          <AiOutlineDelete
            size="2rem"
            color="red"
            onClick={() => handleDeleteProductinCart(user?.id, props?.product)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCart;
