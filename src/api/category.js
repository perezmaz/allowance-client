import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/category', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/category', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/category/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/category/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/category/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
