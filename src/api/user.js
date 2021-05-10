import axios from './server';

export async function register(request) {
  const result = await axios
    .post('/register', request)
    .then(response => response.data)
    .catch(error => error.response.data);
  return result;
}

export async function login(request) {
  const result = await axios
    .post('/login', request)
    .then(response => response.data)
    .catch(error => error.response.data);
  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/user/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/user/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function forgot(request) {
  const result = await axios
    .post('/forgot', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function activate(request) {
  const result = await axios
    .post('/activate', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
