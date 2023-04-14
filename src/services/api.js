import axios from "axios";
import TokenService from "./token.service.js";

const instance = axios.create({
  baseURL: "https://sell-it.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log(err)
    const originalConfig = err.config;

    if (originalConfig?.url !== "/auth/signin" && err.response) {
      // Access Token was expired
      if (err.response.status === 403 && !originalConfig._retry) {
        originalConfig._retry = true;

        //   try {
        //     const rs = await instance.post("/auth/refresh-token", {
        //       token: TokenService.getLocalRefreshToken(),
        //     });
        //     console.log('res-', rs)
        //     const { accessToken } = rs?.data?.response?.tokens;
        //     TokenService.updateLocalAccessToken(accessToken);

        //     return instance(originalConfig);
        //   } catch (_error) {
        //     return Promise.reject(_error);
        //   }
        // }else if(err.response.status === 401){
        TokenService.removeUser()
      }
    }

    return Promise.reject(err);
  }
);

export default instance;