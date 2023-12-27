import React, { useEffect, useState } from "react";

import styles from "./Laptop.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

import CardItem from "../../components/CardItem/CardItem";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const cx = classNames.bind(styles);

const Laptop = () => {
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

  const NormalLaptopASUS = PData.filter((index) => {
    return index.type === "normal-laptop" && index.company === "ASUS";
  });

  const NormalLaptopACER = PData.filter((index) => {
    return index.type === "normal-laptop" && index.company === "ACER";
  });

  const NormalLaptopLENOVO = PData.filter((index) => {
    return index.type === "normal-laptop" && index.company === "LENOVO";
  });

  const NormalLaptopMSI = PData.filter((index) => {
    return index.type === "normal-laptop" && index.company === "MSI";
  });

  const NormalLaptopDELL = PData.filter((index) => {
    return index.type === "normal-laptop" && index.company === "DELL";
  });

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("content-laptop")}>
          <p>Laptop ASUS</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {NormalLaptopASUS.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={cx("content-laptop")}>
          <p>Laptop ACER</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {NormalLaptopACER.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={cx("content-laptop")}>
          <p>Laptop LENOVO</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {NormalLaptopLENOVO.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={cx("content-laptop")}>
          <p>Laptop MSI</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {NormalLaptopMSI.map((item) => (
                <SwiperSlide key={item.id}>
                  <CardItem props={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className={cx("content-laptop")}>
          <p>Laptop DELL</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {NormalLaptopDELL.map((item) => (
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

export default Laptop;
