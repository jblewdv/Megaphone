import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import darkModeReducer from './slices/dark-mode';
import echoReducer from './slices/echo';
import userReducer from './slices/user';
import notificationsReducer from './slices/notifications';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['theme']
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  theme: darkModeReducer,
  echo: echoReducer,
  user: userReducer,
  notifications: notificationsReducer
});

export { rootPersistConfig, rootReducer };
