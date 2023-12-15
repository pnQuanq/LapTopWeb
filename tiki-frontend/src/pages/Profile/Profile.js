import React, { useEffect, useState } from "react";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
import { useMutationHook } from "../../hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/slide/userSlide";
import { getBase64 } from "../../utils";
import * as UserService from "../../services/UserService";
import {
  apiGetPublicProvinces,
  apiGetPublicDistricts,
} from "../../services/AppService";
import { Empty } from "antd";
import Modal from "./Modal";

const cx = classNames.bind(styles);
const Profile = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");
  const [city, setCity] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [province, setProvince] = useState();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [showUpdateEmailForm, setShowUpdateEmailForm] = useState(false);
  const [showUpdatePhoneForm, setShowUpdatePhoneForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

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
    setCity(user?.city);
  }, [user]);

  const resetFields = () => {
    setEmail(user?.email || "");
    setName(user?.name || "");
    setPhone(user?.phone || "");
    setAddress(user?.address || "");
    setAvatar(user?.avatar || "");
    setCity(user?.city || "");
    setProvince(province || "");
    setDistrict(district || "");
  };
  

  useEffect(() => {
    if (isSuccess) {
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      console.log("Error: ", data);
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      try {
        const res = await apiGetPublicProvinces();
        setProvinces(res?.data?.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchPublicProvince();
  }, []);

  useEffect(() => {
    const fetchPublicDistrict = async () => {
      try {
        const res = await apiGetPublicDistricts(province);
        setDistricts(res?.data?.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    province && fetchPublicDistrict(province);
  }, [province]);

  useEffect(() => {
    // Phân tích giá trị city thành province_id và district_id
    const [parsedProvince, parsedDistrict] = city.split(" ");
    
    // Cập nhật giá trị select
    setProvince(parsedProvince);
    setDistrict(parsedDistrict);  

  }, [city]);

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

  const handleOnchangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setProvince(selectedProvince);

    setCity(`${selectedProvince} ${district}`);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setDistrict(selectedDistrict);

    setCity(`${province} ${selectedDistrict}`);
  };

  const handleShowEmailForm = () => {
    setShowUpdateEmailForm(true);

  };

  const handleUpdatePhone = () => {
    const phoneRegex = /^0[0-9]{9}$/;
    if (phoneRegex.test(phone))
    {
      mutation.mutate({
      id: user?.id,
      phone,
      access_token: user?.access_token,
    });
      alert("Cập nhật số điện thoại thành công!")
      setShowUpdatePhoneForm(false);
    } 
    else {
      alert("Số điện thoại phải gồm 10 chữ số và bắt đầu bằng chữ số 0!")
    }
  }

  const handleShowPhoneForm = () => {
    setShowUpdatePhoneForm(true);
  };

  const handleUpdateEmail = () => {
    mutation.mutate({
      id: user?.id,
      email,
      access_token: user?.access_token,
    });
  }

  const handleShowPasswordForm = () => {
    setShowChangePasswordForm(true);
  };

  const handleUpdatePassword = () => {
    
  }

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      email,
      name,
      phone,
      address,
      avatar,
      city,
      access_token: user?.access_token,
    });
  };

  const handleSaveChanges = () => {
    
    handleUpdate();
    setIsEditing(false);
  };

  const handleCancelChanges = () => {
    setIsEditing(false);
    resetFields();
  };

  const handleEdit = () => {
    setIsEditing(true);
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
              src={avatar}
              className={cx("avatar")}
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
                placeholder={name}
                onChange={(e) => handleOnchangeName(e.target.value)}
                className={cx("input-text")}
                readOnly={!isEditing}
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
              value={address}
              placeholder={address}
              onChange={(e) => handleOnchangeAddress(e.target.value)}
              className={cx("input-text")}
              readOnly={!isEditing}
              />

              </td>
            </tr>
            <tr>
              <td>
                <label>Tỉnh/Thành phố</label>
              </td>
              <td>
                <select
                value={province}
                onChange={handleProvinceChange}
                disabled={!isEditing}
                >
                <option value="">Chọn Tỉnh/Thành phố</option>
                {provinces.map((item) => (
                  <option key={item?.province_id} value={item?.province_id}>
                    {item?.province_name}
                  </option>
                ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>Quận/Huyện</label>
              </td>
              <td>
                <select
                  value={district}
                  onChange={handleDistrictChange}
                  disabled={!isEditing}
                  >
                  <option value="">Chọn Quận/Huyện</option>
                  {districts.map((item) => (
                    <option key={item?.district_id} value={item?.district_id}>
                      {item?.district_name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </table>
          <div className={cx("centered-btn")}>
            {isEditing && (
              <button className={cx("file-input-label")} onClick={() => {
                document.getElementById("selectAvatar").click();
              }}>
                Chọn ảnh
                <input id="selectAvatar"
                  type="file"
                  accept="image/*"
                  onChange={handleOnchangeAvatar}
                  className={cx("file-input")}
                  hidden
                />
              </button>
            )}
            {isEditing ? (
              <>
                <button className={cx("save-btn")} onClick={handleSaveChanges}>
                  Lưu thay đổi
                </button>
                <button className={cx("cancel-btn")} onClick={handleCancelChanges}>
                  Hủy
                </button>
              </>
            ) : (
              <button className={cx("edit-btn")} onClick={handleEdit}>
                Sửa thông tin
              </button>
            )}
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
              <button className={cx("update-btn")} onClick={handleShowPhoneForm}>Cập nhật</button>
            </td>
          </tr>
          <tr>
            <td>
              Địa chỉ email
              <br />
              {user.email ? user.email : "empty"}
            </td>
            <td>
              <button className={cx("update-btn")} onClick={handleShowEmailForm}>Cập nhật</button>
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
              <button className={cx("update-btn")} onClick={handleShowPasswordForm}>Cập nhật</button>
            </td>
          </tr>
        </table>

        <div>

      {/* Form cập nhật số điện thoại */}
      {showUpdatePhoneForm && (
        <Modal title="Cập nhật số điện thoại" onClose={() => setShowUpdatePhoneForm(false)}>
          <div>
            <label>Nhập số điện thoại mới:</label>
            <input type="text" value={phone} onChange={ (e) => handleOnchangePhone(e.target.value)}/>
            <button onClick={() => {setShowUpdatePhoneForm(false);
            handleCancelChanges()}}>Hủy bỏ</button>
            <button onClick={() => handleUpdatePhone()}>Cập nhật</button>
          </div>
        </Modal>
      )}

      {/* Form cập nhật email */}
      {showUpdateEmailForm && (
        <Modal title="Cập nhật email" onClose={() => setShowUpdateEmailForm(false)}>
          <div>
            <label>Nhập email mới:</label>
            <input type="text" value={email} onChange={ (e) => handleOnchangeEmail(e.target.value)}/>
            <button onClick={() => setShowUpdateEmailForm(false)}>Hủy bỏ</button>
            <button onClick={() => setShowUpdateEmailForm(false)}>Cập nhật</button>
          </div>
        </Modal>
      )}

      {/* Form đổi mật khẩu */}
      {showChangePasswordForm && (
        <Modal title="Đổi mật khẩu" onClose={() => setShowChangePasswordForm(false)}>
          <div>
            <label>Nhập mật khẩu cũ:</label>
            <input type="password" />
            <label>Nhập mật khẩu mới:</label>
            <input type="password" />
            <label>Xác nhận mật khẩu mới:</label>
            <input type="password" />
            <button onClick={() => setShowChangePasswordForm(false)}>Hủy bỏ</button>
            <button onClick={() => setShowChangePasswordForm(false)}>Cập nhật</button>
          </div>
        </Modal>
      )}
    </div>
      </div>
        
    </div>
  </div> 
)};

export default Profile;
