import { useMutation, useQueryClient } from 'react-query';
import { createAnecdote } from '../requests';
import { useNotificationDispatch } from '../AnecdoteContext';

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch();

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
      dispatch({
        type: 'CREATE',
        payload: newAnecdote.content,
      });
      setTimeout(() => {
        dispatch({ type: null });
      }, 5000);
    },

    onError: () => {
      dispatch({ type: 'ERR_SHORT_ANECDOTE' });
      setTimeout(() => {
        dispatch({ type: null });
      }, 5000);
    },
  });

  const onCreate = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
