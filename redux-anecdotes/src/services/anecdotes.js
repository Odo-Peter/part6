import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNewAnecdote = async (content) => {
  const object = {
    content,
    votes: 0,
  };
  const res = await axios.post(baseUrl, object);
  return res.data;
};

const updateAnecdote = async (id, anecdote) => {
  const res = axios.put(`${baseUrl}/${id}`, anecdote);
  return res.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNewAnecdote, updateAnecdote };
