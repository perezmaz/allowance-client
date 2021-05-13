import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/note', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function listByChild(params) {
  const result = await axios
    .get('/note', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/note', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/note/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/note/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/note/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
