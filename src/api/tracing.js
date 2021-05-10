import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/tracing', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/tracing', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/tracing/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/tracing/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/tracing/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
