import { createSlice } from '@reduxjs/toolkit';

let timeOutId = null;

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const notificationMessenger = (notification) => {
  return (dispatch) => {
    dispatch(setNotification(notification.message));
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    timeOutId = setTimeout(() => {
      dispatch(setNotification(null));
    }, notification.time * 1000);
  };
};

export const { setNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
