import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./MySlider.module.scss";
import classNames from "classnames/bind";
import pic1 from "../../assets/images/pic1.jpg";
import pic2 from "../../assets/images/pic2.jpg";
import pic3 from "../../assets/images/pic3.jpg";
import pic4 from "../../assets/images/pic4.jpg";

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
          <img src={pic1} style={{ width: "100%", height: "100%" }} alt="img" />
        </div>
        <div>
          <img src={pic2} style={{ width: "100%", height: "100%" }} alt="img" />
        </div>
        <div>
          <img src={pic3} style={{ width: "100%", height: "100%" }} alt="img" />
        </div>
        <div>
          <img src={pic4} style={{ width: "100%", height: "100%" }} alt="img" />
        </div>
      </Slider>
    </div>
  );
};

export default MySlider;
