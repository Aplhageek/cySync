import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import ApiConstants from "../utils/apiConstants";
import { COMMON_EVENTS, commonCustomEvent } from "./customEvents";

const axiosInstance = axios.create({
  baseURL: ApiConstants.BASE_URL,
});

const FAILED_REQUEST_MAX_RETRY_COUNT = 2;
const FAILED_REQUEST_RETRY_DELAY = 2000;
const HTTP_STATUS_CODE_403 = 403;

interface RetryErrorConfig extends AxiosRequestConfig {
  _allowRetry?: boolean;
  _retryCount?: number;
  _isRetryRequest?: boolean;
  _skipInterceptorAlert?: boolean;
}
const retryApiCall = async (error: AxiosError) => {
  const errorConfig: RetryErrorConfig = { ...error.config };

  errorConfig._retryCount = errorConfig?._retryCount || 0;

  if (
    errorConfig?._retryCount >= FAILED_REQUEST_MAX_RETRY_COUNT ||
    (errorConfig.method === "post" && !errorConfig.params?._allowRetry)
  ) {
    commonCustomEvent.dispatch(COMMON_EVENTS.ERROR_OCCURRED, {
      detail: {
        isRetryFailed: true,
        errorMessage: `Max retries failed for request: ${errorConfig.url}`,
      },
    });
    return Promise.reject(error);
  }

  errorConfig._retryCount += 1;
  errorConfig._isRetryRequest = true;
  const delayRetry = new Promise<void>((resolve) =>
    setTimeout(() => resolve(), FAILED_REQUEST_RETRY_DELAY)
  );
  return delayRetry.then(() => axiosInstance.request(errorConfig));
};

const requestInterceptSuccess = (config: InternalAxiosRequestConfig) => {
  config.params = {
    ...(config.params || {}),
    token: ApiConstants.API_TOKEN,
  };

  return config;
};

const requestInterceptError = (error: AxiosError) => {
  return Promise.reject(error);
};

const responseInterceptSuccess = (response: AxiosResponse) => {
  // if (response.data && response.data.code && response.data.errorMessage) {
  //   let message = response.data.errorMessage;
  //   if (
  //     response.data.debugMessage &&
  //     response.data.debugMessage.length > response.data.errorMessage.length
  //   ) {
  //     message = response.data.debugMessage;
  //   }
  //   // showAlert('Error occurred!', message);
  //   if (!message.includes('exception')) {
  //     // showToast(message, TOAST_TYPE.ERROR);
  //   }
  //   return Promise.reject(response.data);
  // }
  return response.data;
};

const responseInterceptError = (error: AxiosError) => {
  if (HTTP_STATUS_CODE_403 === error?.response?.status) {
    console.error(
      `API failed due to insufficient permission ${error?.request?.responseURL}`
    );
    return Promise.reject(error.response);
  }

  const errorConfig: RetryErrorConfig = { ...error.config };

  if (errorConfig?._allowRetry) {
    retryApiCall(error);
  } else {
    alert(error.response?.["data" as keyof typeof error.response]?.["error"]);
  }

  console.error("Error processing request: ", error.response);
  return Promise.reject(error.response);
};

axiosInstance.interceptors.request.use(
  (request) => requestInterceptSuccess(request),
  (error) => requestInterceptError(error)
);

axiosInstance.interceptors.response.use(
  (response) => responseInterceptSuccess(response),
  (error) => responseInterceptError(error)
);

export default axiosInstance;
