import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/login`,
    data
  );
  return res.data;
};

export const registerUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/register`,
    data
  );
  return res.data;
};

export const getDetailsUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-details/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUser = async (id, access_token, data) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/getAll`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

// export const refreshToken = async () => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`, {
//         withCredentials: true
//     })
//     return res.data
// }

export const refreshToken = async () => {
  console.log("refreshToken", refreshToken);
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`);
  return res.data;
};

export const updateUser = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  alert("Update succesfully!");
  return res.data;
};

export const addUserCart = async (id, cartData, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/user/cart-user/${id}`,
    cartData,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getUserCart = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API_URL}/user/get-cart-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateUserCart = async (id, idProduct, amount, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API_URL}/user/update-cart-user/${id}/${idProduct}`,
    { amount },
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteUserCart = async (id, idProduct, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-cart-user/${id}/${idProduct}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteAllUserCart = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-all-cart-user/${id}`,

    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const addOrderProduct = async (id, cart, access_token) => {
  try {
    const res = await axiosJWT.put(
      `${process.env.REACT_APP_API_URL}/cart-user/${id}`,
      { cart },
      {
        headers: {
          Authorization: `Bearer ${access_token}`, // Use Authorization header for token
          //"Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed to update user cart");
    }

    return res.data;
  } catch (error) {
    console.error("Error updating user cart:", error.message);
    throw error; // You may want to handle the error in your component or return a default value
  }
};

export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API_URL}/user/delete-many`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
