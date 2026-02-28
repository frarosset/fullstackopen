import axios from "axios";

const baseUrl = "http://localhost:3001/persons";
const resourceUrl = (id) => `${baseUrl}/${id}`;

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (newObject) =>
  axios.post(baseUrl, newObject).then((response) => response.data);

const remove = (id) =>
  axios.delete(resourceUrl(id)).then((response) => response.data);

const update = (id, updatedObject) =>
  axios.put(resourceUrl(id), updatedObject).then((response) => response.data);

export default { getAll, create, remove, update };
