import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAnecdotes, updateAnecdote } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import { useNotificationDispatch } from './AnecdoteContext';

const App = () => {
  const dispatch = useNotificationDispatch();

  const { isLoading, isError, data, error } = useQuery(
    ['anecdotes'],
    getAnecdotes,
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      const updateArray = [...anecdotes];
      const index = anecdotes.findIndex(
        (anec) => anec.id === updatedAnecdote.id
      );

      if (index !== -1) {
        updateArray[index] = {
          ...updateArray[index],
          votes: updateArray[index].votes + 1,
        };
      }

      queryClient.setQueryData(['anecdotes'], updateArray);
      dispatch({
        type: 'VOTE',
        payload: updatedAnecdote,
      });
      setTimeout(() => {
        dispatch({ type: null });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  if (isLoading) return <div>loading data....</div>;

  if (isError && error)
    return <h1>anecdote service not available due to problems in server</h1>;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
