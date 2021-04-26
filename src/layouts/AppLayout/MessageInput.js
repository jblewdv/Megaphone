// React
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Modules
import faker from 'faker';

// Core components
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  AppBar,
  Input,
  Divider,
  IconButton,
  InputAdornment
} from '@material-ui/core';

// Custom components
import { Icon } from '@iconify/react';
import roundSend from '@iconify-icons/ic/round-send';
import EmojiPicker from '~/components/EmojiPicker';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 320;

const useStyles = makeStyles(theme => ({
  root: {
    top: 'auto',
    bottom: 0,
    boxShadow: 'none',
    backdropFilter: 'blur(8px)',
    backgroundColor: alpha(theme.palette.background.default, 0.72),
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`
    },
    borderTop: '1px solid #DFE3E8'
  },
  messageBar: {
    minHeight: 56,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    paddingLeft: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

MessageInput.propTypes = {
  disabled: PropTypes.bool,
  echoId: PropTypes.string,
  onSend: PropTypes.func,
  className: PropTypes.string
};

function MessageInput({ disabled, echoId, onSend, className, ...other }) {
  const classes = useStyles();
  const [message, setMessage] = useState('');

  const handleChangeMessage = e => {
    setMessage(e.target.value);
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    if (onSend) {
      onSend({
        echoId: echoId,
        messageId: faker.random.uuid(),
        message: message,
        contentType: 'text',
        integration: '/static/images/avatars/joshuablew.jpeg',
        createdAt: new Date(),
        senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
        senderName: 'Joshua Blew' // update this
      });
    }
    setMessage('');
  };

  return (
    <AppBar position="fixed" className={classes.root}>
      <div className={classes.messageBar} {...other}>
        <Input
          disabled={disabled}
          fullWidth
          value={message}
          disableUnderline
          onKeyUp={handleKeyUp}
          onChange={handleChangeMessage}
          placeholder="Type a message"
          className={classes.input}
          startAdornment={
            <InputAdornment position="start">
              <EmojiPicker
                disabled={disabled}
                value={message}
                setValue={setMessage}
              />
            </InputAdornment>
          }
        />

        {/* <Divider orientation="vertical" flexItem />

        <Box sx={{ px: 1 }}>
          <IconButton color="primary" disabled={!message} onClick={handleSend}>
            <Icon icon={roundSend} width={24} height={24} />
          </IconButton>
        </Box> */}
      </div>
    </AppBar>
  );
}

export default MessageInput;
