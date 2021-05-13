import axios from './server';

export async function list(params) {
  const result = await axios
    .get('/message', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function save(request) {
  const result = await axios
    .post('/message', request)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/message/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
