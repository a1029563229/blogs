// 这里偷个懒，直接用一个 fetch 库
import fetch from 'isomorphic-fetch';
import { AxiosConfig } from './defaults';

// 检测是否为超链接
const getEffectiveUrl = (config: AxiosConfig) => /^https?/.test(config.url) ? config.url : config.baseURL + config.url;

// 获取 query 字符串
const getQueryStr = (config: AxiosConfig) => {
  const { params } = config;
  if (!Object.keys(params).length) return '';

  let queryStr = '';
  for (const key in params) {
    queryStr += `&${key}=${(params as any)[key]}`;
  }

  return config.url.indexOf('?') > -1 
    ? queryStr
    : '?' + queryStr.slice(1);
};

const getAdapter = () => async (config: AxiosConfig) => {
  const { method, headers, data } = config;
  let url = getEffectiveUrl(config);
  url += getQueryStr(config);

  const response = await fetch(url, {
    method,
    // 非 GET 方法才发送 body
    body: method !== 'get' ? JSON.stringify(data) : null,
    headers
  });

  // 组装响应数据
  const reply = {
    data: await response.json(),
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: config,
  };
  return reply;
};

export default getAdapter;