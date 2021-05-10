import axios from './notificationServer';

export async function findAll(params) {
  const result = await axios
    .get('/notification', { params })
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function count() {
  const result = await axios
    .get('/notification/count')
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}

export async function remove(id) {
  const result = await axios
    .delete(`/notification/${id}`)
    .then(response => response.data)
    .catch(error => error.response.data);

  return result;
}
