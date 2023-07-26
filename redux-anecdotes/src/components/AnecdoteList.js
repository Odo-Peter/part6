import { useSelector, useDispatch } from 'react-redux';
import { addVotes } from '../reducers/anecdoteReducer';
import { notificationMessenger } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return anecdotes.map((a) => a).sort((a, b) => b.votes - a.votes);
    } else {
      return anecdotes
        .filter((anec) =>
          anec.content.toLowerCase().includes(filter.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes);
    }
  });

  const dispatch = useDispatch();

  const vote = async (id) => {
    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    // console.log(anecdote);
    dispatch(addVotes(id, anecdote));
    dispatch(
      notificationMessenger({
        message: `You voted for '${anecdote.content}'`,
        time: 5,
      })
    );
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
