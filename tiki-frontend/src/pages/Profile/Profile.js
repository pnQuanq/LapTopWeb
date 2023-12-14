import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slide/userSlide";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";
import { Empty } from "antd";

const cx = classNames.bind(styles);
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const mutation = useMutationHook((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      console.log("Error: ", data);
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setName(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };
  const handleOnchangeAddress = (value) => {
    setAddress(value);
  };

  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };
  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      access_token: user?.access_token,
    });
  };

  return (
    <div>
  <h1>Thông tin tài khoản</h1>
  <div className={cx("customer-container")}>
    {/* Cột bên trái - Thông tin cá nhân */}
    <div className={cx("contents-container")}>
      <h3>Thông tin cá nhân</h3>
      <div className={cx("avatar-container")}>
        <img
          src= {avatar ? avatar : Empty}
          alt= {avatar ? "avatar" : "empty"}
          className={cx("avatar")}
          onChange={() => handleOnchangeAvatar()}
        />
      </div>
      <table className={cx("personal-info-table")}>
        <tr>
          <td>
            <label>Tên</label>
          </td>
          <td>
            <input
              type="text"
              value={name}
              onChange={() => handleOnchangeName()}
              className={cx("input-text")}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>Địa chỉ</label>
          </td>
          <td>
            <input
              type="text"
              value={address ? address : "empty"}
              className={cx("input-text")}
              readOnly
            />
          </td>
        </tr>
      </table>
      <div className={cx("centered-btn")}>
        <button className={cx("save-btn")}>Lưu thay đổi</button>
      </div>
    </div>

    {/* Cột bên phải - Thông tin liên lạc và Bảo mật */}
    <div className={cx("misc-container")}>
      <table className={cx("contact-security-table")}>
        <tr>
          <th colSpan="2">
            <h3>Thông tin liên lạc</h3>
          </th>
        </tr>
        <tr>
          <td>
            Số điện thoại
            <br />
            {phone ? phone : "empty"}
          </td>
          <td>
            <button className={cx("update-btn")}>Cập nhật</button>
          </td>
        </tr>
        <tr>
          <td>
            Địa chỉ email
            <br />
            {user.email ? user.email : "empty"}
          </td>
          <td>
            <button className={cx("update-btn")}>Cập nhật</button>
          </td>
        </tr>
        <tr>
          <th colSpan="2">
            <h3>Bảo mật</h3>
          </th>
        </tr>
        <tr>
          <td>Đổi mật khẩu</td>
          <td>
            <button className={cx("update-btn")}>Cập nhật</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</div>

  
)
};

export default Profile;
