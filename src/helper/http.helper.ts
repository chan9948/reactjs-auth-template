import axios from 'axios';
import { ProviderContext, useSnackbar } from 'notistack';

export const endpoint = process.env.REACT_APP_BACKEND_ENDPOINT;

const setRequestInterceptors = (jwt: string) => {
  axios.interceptors.request.use(
    (request) => {
      if (request.headers) {
        request.headers['Authorization'] = `Bearer ${jwt}`;
      }
      return request;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

const setResponseInterceptors = (snackbar: ProviderContext) => {
  axios.interceptors.response.use(
    (response) => {
      console.log('got response', response);
      return response;
    },
    (error) => {
      console.log('got error', error);
      snackbar.enqueueSnackbar(
        error?.response?.data?.message ?? error.message,
        { variant: 'error' },
      );
      return Promise.reject(error);
    },
  );
};

const constructPath = (subPath: string) => {
  const path = `${endpoint?.replace(/(\/)*$/, '')}/${subPath.replace(
    /^(\/)*/,
    '',
  )}`;
  console.log('constructPath', path);

  return path;
};

export const httpHelper = {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  constructPath: constructPath,
  setRequestInterceptors,
  setResponseInterceptors,
};
