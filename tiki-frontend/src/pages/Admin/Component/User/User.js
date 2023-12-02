import React, { useEffect, useState } from "react";
import styles from "./User.module.scss";
import classNames from "classnames/bind";
import * as ProductService from "../../../../services/ProductService";
import * as UserService from "../../../../services/UserService";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import * as AiIcons from "react-icons/ai";
import { getBase64 } from "../../../../utils";
import { Modal, Table } from "antd";
import { Upload } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";

const cx = classNames.bind(styles);

const Product = () => {
  const [Data, setData] = useState([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "authorization",
      dataIndex: "isAdmin",
      render: (text) => (
        <p style={{ fontWeight: "550" }}>{text ? "Admin" : "User"}</p>
      ),
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },

    {
      title: "Action",
      render: (text, record) => (
        <div>
          <AiIcons.AiFillDelete className={cx("AiIcons")} color="red" />
          <AiIcons.AiFillEdit className={cx("AiIcons")} color="#F0E68C" />
        </div>
      ),
    },
  ];

  //Fetch ALL data
  const fetchUserAll = async () => {
    try {
      const res = await UserService.getAllUser();
      console.log("Data fetched all product:", res);
      return res;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchUserAll();
        setData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("Data:", Data);
  }, []);

  return (
    <div className={cx("container")}>
      <p>Quản lí User</p>

      <div className={cx("content")}>
        <Table columns={columns} dataSource={Data} />
      </div>
    </div>
  );
};

export default Product;
