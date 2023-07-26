import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    votesUpdator(state, action) {
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === action.payload
      );
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((a) => (a.id !== action.payload ? a : changedAnecdote));
    },

    appendAnencdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnencdote, setAnecdotes, votesUpdator } =
  anecdoteSlice.actions;

export const initialAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content);
    dispatch(appendAnencdote(newAnecdote));
  };
};

export const addVotes = (id, anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateAnecdote(id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(votesUpdator(id));
  };
};

export default anecdoteSlice.reducer;
