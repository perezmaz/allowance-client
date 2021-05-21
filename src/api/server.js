// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import api from '../config/api';
import { getToken } from './auth';
import { ACCESS_TOKEN } from '../config/localStorage';

const instance = axios.create({
  baseURL: `${api.HOST}/api/${api.VERSION}`,
  timeout: 60000,
});

instance.defaults.headers['Content-Type'] = 'application/json';
const token = getToken(ACCESS_TOKEN);
instance.defaults.headers.Authorization = token;

export default instance;
