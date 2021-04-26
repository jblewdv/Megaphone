import { map } from 'lodash';
import axios from '~/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { useFirestore } from 'react-redux-firebase';


// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  profile: null,
  notifications: null
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    }

  }
});

// Reducer
export default slice.reducer;

// Actions
export const {  } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/profile');
      dispatch(slice.actions.getProfileSuccess(response.data.profile));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setIntegrations() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());

    try {
      const { auth, profile } = useSelector(state => state.firebase);
      const firestore = useFirestore();
      // const uid = auth.uid;

      firestore.collection('users').doc(auth.uid).set({
        integrations: 'testing'
      });
      
      console.log('done')
     
      // dispatch(slice.actions.getProfileSuccess(response.data.profile));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNotifications() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/api/user/account/notifications-settings'
      );
      dispatch(
        slice.actions.getNotificationsSuccess(response.data.notifications)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
