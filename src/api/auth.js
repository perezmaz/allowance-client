// eslint-disable-next-line import/no-unresolved
import Moment from 'moment';
import jwtDecode from 'jwt-decode';
import axios from './server';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../config/localStorage';

export function getToken(tokenType) {
  const token = localStorage.getItem(tokenType);

  if (!token || token === 'null') {
    return null;
  }

  const metaToken = jwtDecode(token);
  const { expiredAt } = metaToken;
  const today = Moment().unix();
  const willExpireToken = today > expiredAt;
  if (willExpireToken) {
    return null;
  }
  return token;
}

export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

export async function refreshAccessToken(refreshToken) {
  const request = {
    refreshToken,
  };

  const response = await axios
    .post('/refresh-token', request)
    .then(result => result.data)
    .catch(error => error.response.data);

  if (!response || response.code !== 0) {
    logout();
  } else {
    localStorage.setItem(ACCESS_TOKEN, response.result.accessToken);
    localStorage.setItem(REFRESH_TOKEN, response.result.refreshToken);
  }
}
