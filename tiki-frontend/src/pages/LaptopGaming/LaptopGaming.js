import React, { useEffect, useState } from "react";

import styles from "./LaptopGaming.module.scss";
import classNames from "classnames/bind";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import * as ProductService from "../../services/ProductService";
import CardItem from "../../components/CardItem/CardItem";
const cx = classNames.bind(styles);
const LaptopGaming = () => {
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
  console.log("data products: ", PData);

  const LaptopGamingASUS = PData.filter((index) => {
    return index.type === "gaming-laptop" && index.company === "ASUS";
  });

  const LaptopGamingACER = PData.filter((index) => {
    return index.type === "gaming-laptop" && index.company === "ACER";
  });

  const LaptopGamingLENOVO = PData.filter((index) => {
    return index.type === "gaming-laptop" && index.company === "LENOVO";
  });

  const LaptopGamingMSI = PData.filter((index) => {
    return index.type === "gaming-laptop" && index.company === "MSI";
  });

  const LaptopGamingDELL = PData.filter((index) => {
    return index.type === "gaming-laptop" && index.company === "DELL";
  });

  console.log("LaptopGamingASUS: ", LaptopGamingASUS);
  console.log("LaptopGamingACER: ", LaptopGamingACER);
  console.log("LaptopGamingLENOVO: ", LaptopGamingLENOVO);
  console.log("LaptopGamingMSI: ", LaptopGamingMSI);
  console.log("LaptopGamingDELL: ", LaptopGamingDELL);

  return (
    <div className={cx("container")}>
      <div className={cx("content")}>
        <div className={cx("content-laptop")}>
          <p>Laptop ASUS</p>
          <div className={cx("items-wrapper")}>
            <Swiper spaceBetween={10} slidesPerView={6}>
              {LaptopGamingASUS.map((item) => (
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
              {LaptopGamingACER.map((item) => (
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
              {LaptopGamingLENOVO.map((item) => (
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
              {LaptopGamingMSI.map((item) => (
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
              {LaptopGamingDELL.map((item) => (
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

export default LaptopGaming;
