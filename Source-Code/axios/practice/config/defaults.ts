import getAdapter from './adapter';

export type AxiosConfig = {
  url: string;
  method: string;
  baseURL: string;
  headers: {[key: string]: string};
  params: {};
  data: {};
  adapter: Function;
  cancelToken?: number;
}

const defaultConfig: AxiosConfig = {
  url: '',
  method: 'get',
  baseURL: '',
  headers: {},
  params: {},
  data: {},
  adapter: getAdapter()
};

export default defaultConfig;