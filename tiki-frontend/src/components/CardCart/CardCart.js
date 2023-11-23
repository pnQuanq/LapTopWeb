import React, { useState } from "react";
import styles from "./CardCart.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import {
  decreaseAmount,
  increaseAmount,
  removeOrderProduct,
} from "../../redux/slide/orderSlide";

const cx = classNames.bind(styles);

const CardCart = ({ props }) => {
  const dispatch = useDispatch();

  const handleChangeCount = (type, idProduct, limited) => {
    if (type === "increase") {
      if (!limited) {
        dispatch(increaseAmount({ idProduct }));
      }
    } else {
      if (!limited) {
        dispatch(decreaseAmount({ idProduct }));
      }
    }
  };

  const handleDeleteOrder = (idProduct) => {
    dispatch(removeOrderProduct({ idProduct }));
  };

  return (
    <div className={cx("container")}>
      <div className={cx("wrapper")}>
        <div className={cx("product")}>
          <div className={cx("image")}>
            <img src={props.image} alt="img" width={"100px"} height={"100px"} />
          </div>
          <div className={cx("name")}>{props.name}</div>
        </div>
        <div className={cx("price")}>{props.price}</div>
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
            <p>{props.amount}</p>
            <button
              onClick={() =>
                handleChangeCount(
                  "increase",
                  props?.product,
                  props?.amount === props?.countInstock,
                  props?.amount === 1
                )
              }
            >
              +
            </button>
          </div>
        </div>
        <div className={cx("total")}>
          {props.amount * props.price}
          <span>đ</span>
        </div>
        <div className={cx("remove")}>
          <AiOutlineDelete
            size="2rem"
            color="red"
            onClick={() => handleDeleteOrder(props?.product)}
          />
        </div>
      </div>
    </div>
  );
};

export default CardCart;
