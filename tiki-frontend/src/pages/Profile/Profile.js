import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slide/userSlide";
import * as UserService from "../../services/UserService";

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
        <div className={cx("contents-container")}>
          <h3>Thông tin cá nhân</h3>
          <img
            src="/static/media/pc.da3985e199b2bc4bc470.png"
            alt="Avatar"
          ></img>
          <table>
            <tr>
              <td>
                <label>Tên</label>
              </td>
              <td>
                <input type="text" value={name}></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Ngày sinh</label>
              </td>
              <td>
                <input type="text" placeholder="06/09/1969"></input>
              </td>
            </tr>
            <tr>
              <td>
                <label>Giới tính</label>
              </td>
              <td>
                <input type="radio" name="gender"></input>
                <label>Nam</label>
                <input type="radio" name="gender"></input>
                <label>Nữ</label>
              </td>
            </tr>
            <tr>
              <td>
                <label>Quốc tịch</label>
              </td>
              <td>
                <input type="text" value="Việt Nam"></input>
              </td>
            </tr>
          </table>
          <div className={cx("centered-btn")}>
            <button>Lưu thay đổi</button>
          </div>
        </div>
        <div className={cx("misc-container")}>
          <table>
            <tr>
              <th colspan="2">
                <h3>Thông tin liên lạc</h3>
              </th>
            </tr>
            <tr>
              <td>
                Số điện thoại
                <br />
                0969XXXXXX
              </td>
              <td>
                <button>Cập nhật</button>
              </td>
            </tr>
            <tr>
              <td>
                Địa chỉ email
                <br />
                abcxyz@gmail.com
              </td>
              <td>
                <button>Cập nhật</button>
              </td>
            </tr>
            <tr>
              <th colspan="2">
                <h3>Bảo mật</h3>
              </th>
            </tr>
            <tr>
              <td>Đổi mật khẩu</td>
              <td>
                <button>Cập nhật</button>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Profile;
