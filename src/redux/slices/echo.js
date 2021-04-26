import axios from '~/utils/axios';
import { createSlice } from '@reduxjs/toolkit';
import objFromArray from '~/utils/objFromArray';
import faker from 'faker';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  contacts: { byId: {}, allIds: [] },
  echos: { byId: {}, allIds: [] },
  activeEchoId: null,
  participants: [],
  recipients: [],
  isOpenSidebarEcho: true,
  isOpenSidebarInfo: true,
  isOpenModal: false,
};

const slice = createSlice({
  name: 'echo',
  initialState,
  reducers: {

    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CONTACT SSUCCESS
    getContactsSuccess(state, action) {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET ECHOS
    getEchosSuccess(state, action) {
      const echos = action.payload;

      state.echos.byId = objFromArray(echos);
      state.echos.allIds = Object.keys(state.echos.byId);
    },

    // GET ECHO
    getEchoSuccess(state, action) {
      const echo = action.payload;

      if (echo) {
        state.echos.byId[echo.id] = echo;
        state.activeEchoId = echo.id;
        if (!state.echos.allIds.includes(echo.id)) {
          state.echos.allIds.push(echo.id);
        }
      } else {
        state.activeEchoId = null;
      }
    },

    // ON SEND MESSAGE
    onSendMessage(state, action) {
      const echo = action.payload;
      const {
        echoId,
        messageId,
        message,
        contentType,
        integration,
        createdAt,
        senderId,
        senderName
      } = echo;

      const newMessage = {
        id: messageId,
        body: message,
        contentType: contentType,
        integration: integration,
        createdAt: createdAt,
        senderId: senderId,
        senderName: senderName
      };

      state.echos.byId[echoId].messages.push(newMessage);
    },

    markEchoAsReadSuccess(state, action) {
      const { echoId } = action.payload;
      const echo = state.echos.byId[echoId];
      if (echo) {
        echo.unreadCount = 0;
      }
    },

    // GET PARTICIPANTS
    getParticipantsSuccess(state, action) {
      const participants = action.payload;
      state.participants = participants;
    },

    // RESET ACTIVE ECHO
    resetActiveEcho(state) {
      state.activeEchoId = null;
    },

    addRecipient(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    },

    // SIDEBAR
    onOpenSidebarEcho(state) {
      state.isOpenSidebarEcho = true;
    },

    onCloseSidebarEcho(state) {
      state.isOpenSidebarEcho = false;
    },

    onOpenSidebarInfo(state) {
      state.isOpenSidebarInfo = true;
    },

    onCloseSidebarInfo(state) {
      state.isOpenSidebarInfo = false;
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
    },

    // CREATE ECHO
    async createEcho(state, action) {
      state.isLoading = true;
      const myNewEcho = action.payload;

      var participants = []

      const response = await axios.get('/api/echo/getMyContact');
      participants.push(response.data.MY_CONTACT)

      for (var email of myNewEcho.participants) {
        const response = await axios.get('/api/echo/getUserByEmail', {
          params: { email }
        });
        participants.push(response.data.results)
      }

      const newEcho = {
        id: '8864c717-587d-472a-929a-8e5f298024da-4',
        name: myNewEcho.name,
        description: myNewEcho.description,
        creator: 'You',
        events: myNewEcho.events,
        picture: '/static/images/echoIcons/meeting.svg',
        participants: participants,
        type: 'GROUP',
        unreadCount: 0,
        messages: []
      }

      const postresponse = await axios.post('/api/echo/new', {
        newEcho: newEcho
      });
      console.log(postresponse)

      
      // state.activeEchoId = null;
      // state.echos.concat(newEcho)
      // state.isLoading = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addRecipient,
  onSendMessage,
  onOpenSidebarInfo,
  onCloseSidebarInfo,
  resetActiveEcho,
  onOpenSidebarEcho,
  onCloseSidebarEcho,
  openModal, 
  closeModal,
  createEcho
} = slice.actions;

// ----------------------------------------------------------------------



export function getContacts() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/contacts');
      dispatch(slice.actions.getContactsSuccess(response.data.contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEchos() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/conversations');
      console.log(response.data.echos)
      dispatch(
        slice.actions.getEchosSuccess(response.data.echos)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEcho(echoKey) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/conversation', {
        params: { echoKey }
      });
      dispatch(
        slice.actions.getEchoSuccess(response.data.echo)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function markEchoAsRead(echoId) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get('/api/chat/conversation/mark-as-seen', {
        params: { echoId }
      });
      dispatch(slice.actions.markEchoAsReadSuccess({ echoId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParticipants(echoKey) {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/chat/participants', {
        params: { echoKey }
      });
      dispatch(
        slice.actions.getParticipantsSuccess(response.data.participants)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
