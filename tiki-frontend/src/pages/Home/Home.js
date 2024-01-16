import React, { useEffect, useState } from "react";
import styles from "./Home.module.scss";
import classNames from "classnames/bind";
import MySlider from "../../components/MySlider/MySlider";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../../components/CardItem/CardItem";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import { setCartProduct } from "../../redux/slide/cartSlide";
import { setOrder } from "../../redux/slide/orderSlide";
import { useDispatch, useSelector } from "react-redux";

const cx = classNames.bind(styles);

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
        setProducts(result.data);
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
    <div>
      <div className={cx("slide")}>
        <MySlider />
      </div>
      {!products ? null : (
        <div className={cx("content")}>
          <div className={cx("content-hot-product")}>
            <p style={{ fontSize: "22px", color: "red" }}>Sản phẩm nổi bật</p>
            <div className={cx("items-wrapper")}>
              <Swiper
                slidesPerView={6}
                spaceBetween={15}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  590: {
                    slidesPerView: 1,
                  },
                  840: {
                    slidesPerView: 2,
                  },
                  1090: {
                    slidesPerView: 3,
                  },
                  1340: {
                    slidesPerView: 4,
                  },
                  1590: {
                    slidesPerView: 5,
                  },
                  1840: {
                    slidesPerView: 6,
                  },
                }}
              >
                {products.map((products) => (
                  <SwiperSlide key={products._id}>
                    <CardItem props={products} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={cx("content-hot-product")}>
            <p style={{ fontSize: "22px", color: "red" }}>PC bán chạy</p>
            <div className={cx("items-wrapper")} key="2">
              <Swiper
                slidesPerView={6}
                spaceBetween={15}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  590: {
                    slidesPerView: 1,
                  },
                  840: {
                    slidesPerView: 2,
                  },
                  1090: {
                    slidesPerView: 3,
                  },
                  1340: {
                    slidesPerView: 4,
                  },
                  1590: {
                    slidesPerView: 5,
                  },
                  1840: {
                    slidesPerView: 6,
                  },
                }}
              >
                {products.map((products) => (
                  <SwiperSlide key={products._id}>
                    <CardItem props={products} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={cx("content-hot-product")}>
            <p style={{ fontSize: "22px", color: "red" }}>PC Gaming bán chạy</p>
            <div className={cx("items-wrapper")} key="3">
              <Swiper
                slidesPerView={6}
                spaceBetween={15}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  590: {
                    slidesPerView: 1,
                  },
                  840: {
                    slidesPerView: 2,
                  },
                  1090: {
                    slidesPerView: 3,
                  },
                  1340: {
                    slidesPerView: 4,
                  },
                  1590: {
                    slidesPerView: 5,
                  },
                  1840: {
                    slidesPerView: 6,
                  },
                }}
              >
                {products.map((products) => (
                  <SwiperSlide key={products._id}>
                    <CardItem props={products} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={cx("content-hot-product")}>
            <p>Laptop văn phòng bán chạy</p>
            <div className={cx("items-wrapper")} key="4">
              <Swiper
                slidesPerView={6}
                spaceBetween={15}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  590: {
                    slidesPerView: 1,
                  },
                  840: {
                    slidesPerView: 2,
                  },
                  1090: {
                    slidesPerView: 3,
                  },
                  1340: {
                    slidesPerView: 4,
                  },
                  1590: {
                    slidesPerView: 5,
                  },
                  1840: {
                    slidesPerView: 6,
                  },
                }}
              >
                {products.map((products) => (
                  <SwiperSlide key={products._id}>
                    <CardItem props={products} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className={cx("content-hot-product")}>
            <p>Laptop Gaming bán chạy</p>
            <div className={cx("items-wrapper")} key="5">
              <Swiper
                slidesPerView={6}
                spaceBetween={15}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },

                  590: {
                    slidesPerView: 1,
                  },
                  840: {
                    slidesPerView: 2,
                  },
                  1090: {
                    slidesPerView: 3,
                  },
                  1340: {
                    slidesPerView: 4,
                  },
                  1590: {
                    slidesPerView: 5,
                  },
                  1840: {
                    slidesPerView: 6,
                  },
                }}
              >
                {products.map((products) => (
                  <SwiperSlide key={products._id}>
                    <CardItem props={products} />
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
