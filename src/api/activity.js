import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/activity', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/activity', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function edit(id) {
  const result = await axios
    .get(`/activity/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function update(id, request) {
  const result = await axios
    .put(`/activity/${id}`, request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/activity/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function findPercentLeft(params) {
  const result = await axios
    .get('/activity/findPercentLeft', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
