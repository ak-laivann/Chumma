import axios from "axios";
import { AuthInterceptor } from "./interceptor";
import { InternalEndPointConfig as EndpointConfig } from "./InternalEndPointConfig";

export const InternalAxiosInstance = axios.create({
  baseURL: `${EndpointConfig}/api`, // later add /api/v1 here
  headers: {
    useMirage: false,
  },
});

InternalAxiosInstance.interceptors.request.use(AuthInterceptor, Promise.reject);
