import axios from 'axios';

export const baseURL = process.env.VUE_APP_API_BASE_URL;

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 120000;

console.log(baseURL)

axios.interceptors.response.use(
  (response: any) => {
    if (response.status === 200) return response.data;
    return response;
  },
  (error: any) => {
    if (!error.response) return Promise.reject(error);

    const { status } = error.response;

    if (status === 401) {
      //logout
    }

    return Promise.reject(error);
  }
);

export default axios;