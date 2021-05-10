import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/allowance', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/allowance', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/allowance/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/allowance/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/allowance/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function findAmount(params) {
  const result = await axios
    .get('/allowance/findAmount', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
