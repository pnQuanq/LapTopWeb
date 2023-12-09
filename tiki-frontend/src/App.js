import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { isJsonString } from "./utils";
import jwt_decode from "jwt-decode";
import { resetUser, updateUser } from "./redux/slide/userSlide";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "./services/UserService";
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData =
      user?.access_token || localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData) && !user?.access_token) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
      console.log("decoded", decoded);
    }
    return { decoded, storageData };
  };

  // UserService.axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     // Do something before request is sent
  //     const { storageData, decoded } = handleDecoded();
  //     const currentTime = new Date().getTime() / 1000;
  //     console.log("storageData", storageData, isJsonString(storageData));
  //     console.log("decoded", decoded);
  //     if (decoded?.exp < currentTime) {
  //       const data = await UserService.refreshToken();
  //       config.headers["token"] = `Bearer ${data.access_token}`;
  //     }
  //     return config;
  //   },
  //   (error) => {
  //     // Do something with request error
  //     return Promise.reject(error);
  //   }
  // );

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      let storageRefreshToken = localStorage.getItem("refresh_token");
      const refreshToken = JSON.parse(storageRefreshToken);
      const decodedRefreshToken = jwt_decode(refreshToken);
      if (decoded?.exp < currentTime.getTime() / 1000) {
        if (decodedRefreshToken?.exp > currentTime.getTime() / 1000) {
          const data = await UserService.refreshToken(refreshToken);
          config.headers["token"] = `Bearer ${data.access_token}`;
        } else {
          dispatch(resetUser());
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
    console.log("res", res);
  };

  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            {routes.map((route, index) => {
              const Page = route.component;
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }

              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </QueryClientProvider>
    </Router>
  );
};

export default App;
