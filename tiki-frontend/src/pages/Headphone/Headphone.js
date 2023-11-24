import React, { useEffect, useState } from "react";

import styles from "./Headphone.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import * as ProductService from "../../services/ProductService";
import CardItem from "../../components/CardItem/CardItem";
import Data from "../../Data/Data";
const cx = classNames.bind(styles);
const Headphone = () => {

  const [PData, setPData] = useState([]);

  const fetchProductAll = async () => {
    try {
      const res = await ProductService.getAllProduct();
      console.log("Data fetched:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProductAll();
        setPData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("PData:", PData);
  }, []);

  useEffect(() => {
    console.log("Rerendered!");
  }, [PData]);

  console.log("data products: ", PData);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("content-pcgaming")}>
          <p>Pc Gaming bán chạy</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {PData.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={cx("content-laptop")}>
          <p>Laptop bán chạy</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {PData.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Headphone;
