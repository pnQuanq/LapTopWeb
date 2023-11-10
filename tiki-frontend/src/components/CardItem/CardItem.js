import React from "react";
import styles from "./CardItem.module.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const cx = classNames.bind(styles);

const CardItem = ({ props }) => {
  const navigate = useNavigate();
  const handleDetail = () => {
    navigate("/productdetail", {
      replace: false,
      state: {
        id: props.id,
        name: props.name,
        rating: props.rating,
        price: props.price,
        image: props.image,
        description: props.description,
      },
    });
  };

  const renderRate = () => {
    let result = [];
    for (let i = 0; i < parseInt(props.rating); i++) {
      result.push(<AiFillStar color="#FFCD00" size="1.5rem" key={i} />);
    }
    return result;
  };

  return (
    <div className={cx("wrapper")} onClick={handleDetail}>
      <div key={props.id} className={cx("image")}>
        <img
          src={props.image}
          alt="img"
          width={"100%"}
          height={"100%"}
          style={{ borderRadius: "16px 16px 0 0" }}
        />
      </div>
      <div className={cx("info")}>
        <p className={cx("name")}>{props.name}</p>
        <div className={cx("rate")}>{renderRate()}</div>
        <p className={cx("price")}> {props.price} </p>
      </div>
    </div>
  );
};

export default CardItem;
