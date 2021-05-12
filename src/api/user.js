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

export async function uploadAvatar(id, request) {
  const formData = new FormData();
  formData.append('avatar', request.avatar);

  const header = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const result = await axios
    .put(`/avatar/${id}`, formData, header)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function getAvatar(fileName) {
  const result = await axios
    .get(`/avatar/${fileName}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
