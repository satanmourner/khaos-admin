import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { logout } from '../auth/authUtilities';
import Cookies from 'js-cookie';
import { store } from '../store/store';
import { setError } from '../store/slices/errorSlice';

interface AxiosOptions extends AxiosRequestConfig {
  isAuthenticated?: boolean;
}
const api = Axios.create();

api.interceptors.request.use(function (config: any) {
  const token = Cookies.get('token');
  //set Authorization header
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});
api.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: any) {
    if (error.response && error.response.status === 401) {
      store.dispatch(setError({ type: 401, message: 'token invalid' }));
    }
    return Promise.reject(error);
  },
);
const request = {
  get: <T>(endpoint: string, options?: AxiosOptions): Promise<AxiosResponse<T>> => {
    return api.get(endpoint, options);
  },
  post: <T>(endpoint: string, data: unknown, options?: AxiosOptions): Promise<AxiosResponse<T>> => {
    if (options?.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      return api.post(endpoint, data, options);
    }
    return api.post(endpoint, Object.assign({}, data), options);
  },
  put: (endpoint: string, data: unknown, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.put(endpoint, data, options);
  },
  patch: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.patch(endpoint, options);
  },
  delete: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.delete(endpoint, options);
  },
  options: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.options(endpoint, options);
  },

  head: (endpoint: string, options?: AxiosOptions): Promise<AxiosResponse> => {
    return api.head(endpoint, options);
  },
};

export default { request, api };
