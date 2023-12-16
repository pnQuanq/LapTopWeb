import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import MySlider from "../../components/MySlider/MySlider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../../components/CardItem/CardItem";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import { setCartProduct } from "../../redux/slide/cartSlide";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Home = () => {
  const [PData, setPData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

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
        //fetch all products
        const result = await fetchProductAll();
        setPData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user?.id && user?.cart?.cartTotal) {
      UserService.getUserCart(user?.id, user?.access_token).then((res) => {
        dispatch(setCartProduct(res));
      });
    }
  }, [user?.id]);

  return (
    <div className={cx("container")}>
      <div className={cx("slide")}>
        <MySlider />
      </div>
      {!PData ? null : (
        <div className={cx("content")}>
          <div className={cx("content-hot-product")}>
            <p>Sản phẩm nổi bật</p>
            <div className={cx("items-wrapper")}>
              <Swiper spaceBetween={10} slidesPerView={6}>
                {PData.map((products) => (
                  <SwiperSlide key={products.id}>
                    <CardItem props={products} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={cx("content-hot-product")}>
            <p>PC bán chạy</p>
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
          <div className={cx("content-hot-product")}>
            <p>PC Gaming bán chạy</p>
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
          <div className={cx("content-hot-product")}>
            <p>Laptop văn phòng bán chạy</p>
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
          <div className={cx("content-hot-product")}>
            <p>Laptop Gaming bán chạy</p>
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
      )}
    </div>
  );
};

export default Home;
