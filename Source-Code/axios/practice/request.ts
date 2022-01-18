import { AxiosConfig } from './config/defaults';
import CancelToken from './CancelToken';

export const dispatchRequest = (config: AxiosConfig) => {
  // 在发起请求前，检测是否取消请求
  CancelToken.checkIsCancel(config.cancelToken ?? null);
  const { adapter } = config;
  return adapter(config).then((response: any) => {
    // 在请求成功响应后，检测是否取消请求
    CancelToken.checkIsCancel(config.cancelToken ?? null);
    return response;
  });
};
