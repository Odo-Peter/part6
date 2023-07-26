import { createContext, useReducer, useContext } from 'react';

const anecdotesReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `anecdote '${action.payload}' created`;
    case 'VOTE':
      return `anecdote '${action.payload.content}' voted`;
    case 'ERR_SHORT_ANECDOTE':
      return 'too short anecdote, must have length of 5 characters or more';
    default:
      return null;
  }
};

const AnecdoteContext = createContext();

export default AnecdoteContext;

export const AnecdoteContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    anecdotesReducer,
    null
  );

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </AnecdoteContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(AnecdoteContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(AnecdoteContext);
  return notificationAndDispatch[1];
};
