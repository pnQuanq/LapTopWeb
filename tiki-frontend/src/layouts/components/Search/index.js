import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { Wrapper as PopperWrapper } from "../../../components/Popper";
import "tippy.js/dist/tippy.css";
//import AccountItem from "../AccountItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useDebounce } from "../../../hooks";

//import { search } from "../../../apiServices/searchService";
//import Data from "../../../Data/Data";

//import * as searchService from "../../../apiServices/searchService";
import * as ProductService from "../../../services/ProductService";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const debounced = useDebounce(searchValue, 500);

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
    <Tippy
      interactive
      visible={showResult && searchResult.length > 0}
      render={(attrs) => (
        <div className={cx("search-result")} tabIndex="-1" {...attrs}>
          <PopperWrapper>
            <h4 className={cx("search-title")}>Products</h4>
            {searchResult.map((result) => (
              <div
                className={cx("wrapper")}
                onClick={() => handleDetailProduct(result._id)}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} key={result._id} />
                <div className={cx("info")}>
                  <h4 className={cx("name")}>
                    <span>{result.name}</span>
                  </h4>
                </div>
              </div>
            ))}
          </PopperWrapper>
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
    </Tippy>
  );
}

export default Search;
