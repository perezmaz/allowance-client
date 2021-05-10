// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import notificationApi from '../config/notificationApi';
import { getToken } from './auth';
import { ACCESS_TOKEN } from '../config/localStorage';

const instance = axios.create({
  baseURL: `${notificationApi.HOST}:${notificationApi.PORT}/api/${notificationApi.VERSION}`,
  timeout: 60000,
});

instance.defaults.headers['Content-Type'] = 'application/json';
const token = getToken(ACCESS_TOKEN);
instance.defaults.headers.Authorization = token;

export default instance;
