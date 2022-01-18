import axios, { CancelToken } from './Axios';
import { AxiosConfig } from './config/defaults';

export default axios;

const service = axios.createInstance({
  baseURL: 'https://mbd.baidu.com'
});

// 添加请求拦截器
service.interceptors.request.use((config: AxiosConfig) => {
  config.headers.test = 'A';
  config.headers.check = 'B';
  return config;
});

// 添加响应拦截器
service.interceptors.response.use((response: any) => ({ data: response.data, config: response.config }));

(async () => {
  const source = CancelToken.source();
  setTimeout(() => {
    source.cancel('Operation canceled by the user.');
  }, 10);
  try {
    const reply = await service.get('/newspage/api/getpcvoicelist', { cancelToken: source.token });
    console.log(reply);
  } catch(e) {
    if (e.name === 'CancelError') {
      // 如果请求被取消，则不抛出错误，只在控制台输出提示
      console.log(`请求被取消了, 取消原因: ${e.message}`);
      return;
    }
    throw e;
  }
})();
