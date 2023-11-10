import React, { useState } from "react";

import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import linkien from "../../assets/images/linkien.webp";
import { AiFillStar } from "react-icons/ai";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import CardItem from "../../components/CardItem/CardItem";
import Data from "../../Data/Data";

import { useLocation, useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
const ProductDetail = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const id = location.state.id;
  const name = location.state.name;
  const price = location.state.price;
  const srcimage = location.state.image;
  const handleDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleUp = () => {
    setQuantity(quantity + 1);
  };

  const handleBuy = () => {
    navigate("/cart", {
      replace: false,
      state: {
        id: id,
        name: name,
        price: price,
        image: srcimage,
        option: props.option,
        quantity: quantity,
      },
    });
  };

  return (
    <div className={cx("container")}>
      <div className={cx("container-content")}>
        <div className={cx("container-image")}>
          <div className={cx("image")}>
            <img src={srcimage} alt="linkien" />
          </div>
          <div className={cx("list-image")}>
            <img src={linkien} alt="linkien" />
            <img src={linkien} alt="linkien" />
            <img src={linkien} alt="linkien" />
            <img src={linkien} alt="linkien" />
            <img src={linkien} alt="linkien" />
          </div>
        </div>
        <div className={cx("container-info")}>
          <div className={cx("base-info")}>
            <div className={cx("name")}>
              <p>{name}</p>
            </div>
            <div className={cx("rate")}>
              <p style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <AiFillStar color="yellow" size="2rem" />
                  <AiFillStar color="yellow" size="2rem" />
                  <AiFillStar color="yellow" size="2rem" />
                  <AiFillStar color="yellow" size="2rem" />
                  <AiFillStar color="yellow" size="2rem" />
                </div>

                <span style={{ marginLeft: "8px" }}>0 đánh giá</span>
              </p>
            </div>
            <div className={cx("price")}>
              <p>{price}</p>
            </div>
          </div>
          <div className={cx("option-info")}>
            <p>Option 1</p>
            <p>Option 2</p>
          </div>
          <div className={cx("quantity")}>
            <p>Số lượng</p>
            <div className={cx("quantity-wrapper")}>
              <button onClick={handleDown}>-</button>
              <p>{quantity}</p>
              <button onClick={handleUp}>+</button>
            </div>
          </div>

          <div className={cx("buy")} onClick={handleBuy}>
            <p
              style={{
                color: "#fff",
                fontSize: "24px",
                alignItems: "center",
                justifyContent: "center",
                margin: "0px",
              }}
            >
              MUA NGAY
            </p>
            <p
              style={{
                color: "#fff",
                fontSize: "12px",
                alignItems: "center",
                justifyContent: "center",
                margin: "0px",
              }}
            >
              Giao tận nơi hoặc nhận tại cửa hàng
            </p>
          </div>
        </div>
      </div>

      <div className={cx("container-description")}>
        <p style={{ fontSize: "18px" }}>Mô tả sản phẩm</p>
        <div className={cx("description")}>
          <p>{location.state.description}</p>
        </div>
      </div>

      <div className={cx("another-product")}>
        <p>Sản phẩm bạn có thể quan tâm</p>
        <div className={cx("items-wrapper")}>
          <Swiper spaceBetween={10} slidesPerView={8}>
            {Data.map((item) => (
              <SwiperSlide key={item.id}>
                <CardItem props={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className={cx("container-comments")}>
        <p style={{ fontSize: "18px" }}>Đánh giá và nhận xét</p>
        <div className={cx("product-review")}>
          <div className={cx("product-review-average")}>
            <div>
              <p style={{ fontSize: "28px", color: "red" }}>0/5</p>
            </div>
            <div style={{ marginTop: "8px" }}>
              <p>rating</p>
            </div>
            <div>
              <p>0 đánh giá & nhận xét</p>
            </div>
          </div>
          <div className={cx("product-review-detail")}>
            <div className={cx("rating")}>
              <p>5 sao</p>
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: "10px",
                  width: "300px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                }}
              />
            </div>
            <div className={cx("rating")}>
              <p>4 sao</p>
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: "10px",
                  width: "300px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                }}
              />
            </div>
            <div className={cx("rating")}>
              <p>3 sao</p>
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: "10px",
                  width: "300px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                }}
              />
            </div>
            <div className={cx("rating")}>
              <p>2 sao</p>
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: "10px",
                  width: "300px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                }}
              />
            </div>
            <div className={cx("rating")}>
              <p>1 sao</p>
              <div
                style={{
                  backgroundColor: "#ccc",
                  height: "10px",
                  width: "300px",
                  borderRadius: "5px",
                  marginLeft: "8px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
