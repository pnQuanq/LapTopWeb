import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';
import { Wrapper as PopperWrapper} from "../../../components/Popper";
import 'tippy.js/dist/tippy.css';
import AccountItem from "../AccountItem";
import classNames from "classnames/bind";
import styles from "./Search.module.scss";
import { useDebounce } from "../../../hooks";
 
import { search } from "../../../apiServices/searchService";
import Data from "../../../Data/Data";

const cx = classNames.bind(styles); 

function Search() {

    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);

    const debounced = useDebounce(searchValue, 500);

    const inputRef = useRef();
    
    const [PData, setPData] = useState([]);
    useEffect(() => {
        //if (!debounced.trim()) {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        
        // const fetchApi = async () => {
        //     const result = await search(debounced);
        //     setSearchResult(result);
        // } 
        fetch('https://tiktok.fullstack.edu.vn/api/users/search?q=hoaa&type=less')
        .then((res) => res.json())
        .then((res) => {
            setSearchResult(res.data);
        })
    }, [searchValue]);
    // }, [debounced]);

    
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        //********* handle search result *********
        <Tippy 
            interactive
            visible={showResult && searchResult.length > 0}
            render={attrs => (
            
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                    <h4 className={cx('search-title')}>Products</h4>
                    {searchResult.map((result) => (
                        <AccountItem key={result.id} data={result} />
                    ))}
                </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            {/* get user input in Search Bar */}
            <div className={cx("search")}>
                <input 
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm sản phẩm" 
                    spellCheck={false} 
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && (
                    <button 
                        className={cx("clear")} 
                        onClick={handleClear}
                    >
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