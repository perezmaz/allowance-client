import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/child', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/child', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/child/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/child/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/child/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
