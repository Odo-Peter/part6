import axios from 'axios';

const BASE_URL = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createAnecdote = async (anecdote) => {
  const response = await axios.post(BASE_URL, anecdote);
  return response.data;
};

export const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${BASE_URL}/${anecdote.id}`, anecdote);
  return response.data;
};
