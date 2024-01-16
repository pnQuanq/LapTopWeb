import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import HeadlessTippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import "tippy.js/dist/tippy.css";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import * as ProductService from "../../../services/ProductService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const numberFormat = new Intl.NumberFormat("en-US");
  const inputRef = useRef();

  // Fetch all products
  const fetchProductAll = async () => {
    try {
      const res = await ProductService.getAllProduct();
      const allProducts = res.data;
      return allProducts; // Return all products
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error
    }
  };

  // Function to search products based on the input value
  const searchProduct = (products, value) => {
    if (!value.trim()) {
      return []; // If input is empty, return an empty array
    }

    // Use filter to find products that match the search value
    return products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);
    setShowResult(!!inputValue); // Show results only if there's input
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await fetchProductAll();
        setSearchResult(searchProduct(allProducts, searchValue));
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [searchValue]);

  // Clear search input and results
  const handleClear = () => {
    setSearchValue("");
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleHideResult = () => {
    setShowResult(false);
  };
  const navigate = useNavigate();
  const handleDetailProduct = (id) => {
    navigate(`/productdetail/${id}`);
    handleClear();
    setShowResult(false);
  };
  return (
    <div className={cx("search-line")}>
      <HeadlessTippy
        interactive
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          <div className={cx("search-result")} tabIndex="-1" {...attrs}>
            {searchResult.map((result) => (
              <div
                key={result._id}
                className={cx("wrapper")}
                onClick={() => handleDetailProduct(result._id)}
              >
                <div className={cx("info")}>
                  <img src={result.image} alt={result.name} width={"100px"} />
                  <div>
                    <p>{result.name}</p>
                    <p style={{ color: "red" }}>
                      {" "}
                      {numberFormat.format(result.price)}Đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        onClickOutside={handleHideResult}
      >
        <div className={cx("search")}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="Tìm sản phẩm"
            spellCheck={false}
            onChange={handleInputChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && (
            <button className={cx("clear")} onClick={handleClear}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          <span>|</span>

          <button className={cx("search-btn")}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
