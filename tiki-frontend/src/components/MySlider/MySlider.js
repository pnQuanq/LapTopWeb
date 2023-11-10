import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./MySlider.module.scss";
import classNames from "classnames/bind";
import slide1 from "../../assets/images/slide1.jpg";
import slide2 from "../../assets/images/slide2.jpg";

const cx = classNames.bind(styles);

const MySlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className={cx("container")}>
      <Slider {...settings}>
        <div>
          <img src={slide1} style={{ width: "100%" }} alt="img" />
        </div>
        <div>
          <img src={slide2} style={{ width: "100%" }} alt="img" />
        </div>
        <div>
          <img src={slide1} style={{ width: "100%" }} alt="img" />
        </div>
        <div>
          <img src={slide2} style={{ width: "100%" }} alt="img" />
        </div>
        <div>
          <img src={slide1} style={{ width: "100%" }} alt="img" />
        </div>
        <div>
          <img src={slide2} style={{ width: "100%" }} alt="img" />
        </div>
      </Slider>
    </div>
  );
};

export default MySlider;
