// React
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';

// Core components
import { makeStyles } from '@material-ui/core/styles';
import { Box, Divider, Container, Card  } from '@material-ui/core';

// Custom components
import RoomInfo from './RoomInfo';
import MessageList from './MessageList';
import HeaderDetail from './HeaderDetail';
import MessageInput from './MessageInput';
import Page from '~/components/Page';
import Scrollbars from '~/components/Scrollbars';

// State
import {
  addRecipient,
  onSendMessage,
  getEcho,
  getParticipants,
  markEchoAsRead,
  resetActiveEcho
} from '~/redux/slices/echo';

// Utils
import { PATH_APP } from '~/routes/paths';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flexGrow: 1,
    display: 'flex',
    overflow: 'hidden'
  },
  card: {
    height: '85vh',
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

const echoSelector = state => {
  const { echos, activeEchoId } = state.echo;
  const echo = echos.byId[activeEchoId];
  if (echo) {
    return echo;
  }
  return {
    id: null,
    messages: [],
    participants: [],
    name: '',
    description: '',
    picture: '',
    unreadMessages: 0
  };
};

function EchoView() {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();
  const { echoKey } = useParams();
  const {
    contacts,
    recipients,
    participants,
    activeEchoId
  } = useSelector(state => state.echo);
  const echo = useSelector(state => echoSelector(state));

  const displayParticipants = participants.filter(
    item => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0'
  );

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(echoKey));
      try {
        await dispatch(getEcho(echoKey));
      } catch (err) {
        console.error(err);
        history.push(PATH_APP.app.chat.new);
      }
    };
    if (echoKey) {
      getDetails();
    } else {
      if (activeEchoId) {
        dispatch(resetActiveEcho());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echoKey]);

  useEffect(() => {
    if (activeEchoId) {
      dispatch(markEchoAsRead(activeEchoId));
    }
  }, [dispatch, activeEchoId]);

  const handleAddRecipient = recipient => {
    dispatch(addRecipient(recipient));
  };

  const handleSendMessage = async value => {
    console.log(value)
    try {
      dispatch(onSendMessage(value));
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Card className={classes.card}>
          <div className={classes.root}>
            <HeaderDetail echo={echo} />
            <Divider />
            <div className={classes.main}>
              <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
                  <MessageList echo={echo} />
                  <Divider />

                  <MessageInput 
                    echoId={activeEchoId}
                    onSend={handleSendMessage}
                    disabled={pathname === '/app/chat/new'}
                  />  
              </Box>
              <RoomInfo
                  echo={echo}
                  participants={displayParticipants}
              />
            </div>
          </div>
        </Card>
      </Container>
    </Page>
  );
}

export default EchoView;
