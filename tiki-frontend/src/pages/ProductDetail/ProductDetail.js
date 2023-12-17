import React, { useEffect, useState } from "react";
import styles from "./ProductDetail.module.scss";
import classNames from "classnames/bind";
import linkien from "../../assets/images/linkien.webp";
import { AiFillStar } from "react-icons/ai";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../../components/CardItem/CardItem";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import Data from "../../Data/Data";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/slide/cartSlide";
import { useMutationHook } from "../../hooks/useMutationHook";

const cx = classNames.bind(styles);

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [detailProduct, setDetailProduct] = useState({});
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const mutation = useMutationHook((cartData) =>
    UserService.addUserCart(user.id, cartData, user.token)
  );

  const numberFormat = new Intl.NumberFormat("en-US");

  const handleDown = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleUp = () => {
    setQuantity(quantity + 1);
  };

  const fetchGetDetailsProduct = async (id) => {
    try {
      const res = await ProductService.getDetailsProduct(id);
      if (res?.data) {
        setDetailProduct(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    if (id) {
      fetchGetDetailsProduct(id);
    }
  }, [id]);

  useEffect(() => {
    const scrollToTop = async () => {
      // Cuộn lên đầu trang
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();
  }, []);

  const handleBuy = async () => {
    if (!user?.id) {
      navigate("/login", { state: location.pathname });
    } else {
      const cart = {
        _id: detailProduct._id,
        name: detailProduct.name,
        image: detailProduct.image,
        amount: quantity,
        price: detailProduct.price,
      };
      try {
        mutation.mutate(cart);
        dispatch(
          addtoCart({
            products: {
              product: detailProduct._id,
              name: detailProduct.name,
              image: detailProduct.image,
              price: detailProduct.price,
              amount: quantity,
            },
            user: {
              user: user?.id,
            },
          })
        );
      } catch (error) {
        console.log("error", error);
      }

      alert("Đã thêm vào giỏ hàng");
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("container-content")}>
        <div className={cx("container-image")}>
          <div className={cx("image")}>
            <img src={detailProduct.image} alt="linkien" />
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
              <p>{detailProduct.name}</p>
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
              <p>{numberFormat.format(detailProduct.price)} VNĐ</p>
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
          <p>{detailProduct.description}</p>
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
