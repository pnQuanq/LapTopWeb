import React, { useEffect, useState } from "react";
import styles from "./Product.module.scss";
import classNames from "classnames/bind";
import * as ProductService from "../../../../services/ProductService";
import { useMutationHook } from "../../../../hooks/useMutationHook";
import * as AiIcons from "react-icons/ai";
import { getBase64 } from "../../../../utils";
import { Modal, Table } from "antd";
import { Upload } from "antd";

const cx = classNames.bind(styles);

const columns = [
  {
    title: "Image",
    dataIndex: "image",
    render: (image) => <img src={image} width={150} alt="Uploaded Image" />,
  },
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <p style={{ fontWeight: "550" }}>{text}</p>,
  },
  {
    title: "Type",
    dataIndex: "type",
  },
  {
    title: "Company",
    dataIndex: "company",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "CountInStock",
    dataIndex: "countInStock",
  },
  {
    title: "Rating",
    dataIndex: "rating",
  },
  {
    title: "Description",
    dataIndex: "description",
  },
  {
    title: "Action",
    render: () => (
      <div>
        <AiIcons.AiFillDelete className={cx("AiIcons")} color="red" />
        <AiIcons.AiFillEdit className={cx("AiIcons")} color="#F0E68C" />
      </div>
    ),
  },
];
const listType = [
  {
    id: 1,
    name: "normal-laptop",
  },
  {
    id: 2,
    name: "gaming-laptop",
  },
  {
    id: 3,
    name: "normal-PC",
  },
  {
    id: 3,
    name: "gaming-PC",
  },
];
const listCompany = [
  {
    id: 1,
    name: "Asus",
  },
  {
    id: 2,
    name: "Lenovo",
  },
  {
    id: 3,
    name: "MSI",
  },
  {
    id: 3,
    name: "DELL",
  },
  {
    id: 3,
    name: "ACER",
  },
];

const Product = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownType, setIsDropdownType] = useState(false);
  const [isDropdownCompany, setIsDropdownCompany] = useState(false);
  const [Data, setData] = useState([]);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    company: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    image: "",
  });

  const mutation = useMutationHook((data) =>
    ProductService.createProduct(data)
  );

  const { isError, isSuccess } = mutation;

  useEffect(() => {
    if (isSuccess && mutation.data.status === "OK") {
      alert("Thêm sản phẩm thành công");
      console.log(mutation.data.status);
    } else if (isSuccess && mutation.data.status === "ERR") {
      alert(mutation.data.message);
      console.log("mutation.data.status:", mutation.data);
    } else if (isError) {
      alert(mutation.data);
      console.log("ERR mutation.data:", mutation.data);
      console.log("ERR mutationERR:", mutation.error);
    }
  }, [isSuccess, isError]);

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
        setData(result.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
    console.log("Data:", Data);
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOk = () => {
    mutation.mutate(stateProduct);
    console.log("stateProduct", stateProduct);
    setIsModalOpen(false);
  };

  //mutation.mutate(stateProduct);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOnChange = (event) => {
    setStateProduct({
      ...stateProduct,
      [event.target.name]: event.target.value,
    });
  };
  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  return (
    <div className={cx("container")}>
      <p>Quản lí sản phẩm</p>
      <div
        className={cx("add")}
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        +
      </div>
      <div className={cx("content")}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={Data}
        />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className={cx("wrapper-button")}>
            <div className={cx("modal-button-cancel")} onClick={handleOk}>
              Cancel
            </div>

            <div className={cx("modal-button-submit")} onClick={handleOk}>
              Submit
            </div>
          </div>,
        ]}
      >
        <div>
          <div className={cx("modal-input")}>
            <p>Name:</p>
            <input
              type="text"
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Type:</p>

            <input
              type="button"
              value={stateProduct.type}
              onChange={handleOnChange}
              onClick={() => {
                setIsDropdownType(!isDropdownType);
              }}
              name="type"
            />
          </div>

          {isDropdownType ? (
            <div className={cx("wrapper")}>
              <div className={cx("dropdown")}>
                {listType.map((item, i) => (
                  <div
                    className={cx("dropdownitem")}
                    onClick={() => {
                      setIsDropdownType(!isDropdownType);
                      setStateProduct({
                        ...stateProduct,
                        type: item.name,
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          <div className={cx("modal-input")}>
            <p>Company:</p>
            <input
              type="button"
              value={stateProduct.company}
              onChange={handleOnChange}
              onClick={() => {
                setIsDropdownCompany(!isDropdownCompany);
              }}
              name="company"
            />
          </div>
          {isDropdownCompany ? (
            <div className={cx("wrapper")}>
              <div className={cx("dropdown")}>
                {listCompany.map((item, i) => (
                  <div
                    className={cx("dropdownitem")}
                    onClick={() => {
                      setIsDropdownCompany(!isDropdownCompany);
                      setStateProduct({
                        ...stateProduct,
                        company: item.name,
                      });
                    }}
                  >
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          <div className={cx("modal-input")}>
            <p>Price:</p>
            <input
              type="text"
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>countInStock:</p>
            <input
              type="text"
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Rating:</p>
            <input
              type="text"
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Description</p>
            <input
              type="text"
              value={stateProduct.description}
              onChange={handleOnChange}
              name="description"
            />
          </div>
          <div className={cx("modal-input")}>
            <p>Image</p>
            <Upload
              onChange={handleOnChangeImage}
              fileList={
                stateProduct.image
                  ? [{ uid: "-1", name: "image.png", status: "done" }]
                  : []
              }
            >
              {stateProduct.image ? (
                <img
                  src={stateProduct.image}
                  alt="Uploaded Image"
                  style={{ maxWidth: "100px" }}
                />
              ) : (
                <input
                  type="file"
                  value={stateProduct.image}
                  onChange={handleOnChange}
                  name="image"
                />
              )}
            </Upload>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
