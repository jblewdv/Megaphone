import faker from 'faker';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import roundSend from '@iconify-icons/ic/round-send';
import EmojiPicker from '~/components/EmojiPicker';
import { alpha, makeStyles } from '@material-ui/core/styles';
import {
  Box,
  MenuItem,
  TextField,
  Input,
  Divider,
  IconButton,
  InputAdornment
} from '@material-ui/core';

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
  const [messageIntegration, setMessageIntegration] = useState('');
  const [integration, setIntegration] = useState('Select one...');

  const handleChangeMessage = e => {
    setMessage(e.target.value);
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message || !messageIntegration) {
      return '';
    }
    if (onSend) {
      console.log(messageIntegration)
      onSend({
        echoId: echoId,
        messageId: faker.random.uuid(),
        message: message,
        contentType: 'text',
        integration: `/static/images/integrations/${messageIntegration}`,
        createdAt: new Date(),
        senderId: '8864c717-587d-472a-929a-8e5f298024da-0',
        senderName: 'Joshua Blew' // update this
      });
    }
    setMessage('');
  };

  // const handleOpen = event => {
  //   setOpen(event.currentTarget);
  // };

  const integrations = [
    {value:'Select one...', label:'Select one...'},
    {value:'google_calendar.png', label:'Google Calendar', pic:'/static/images/integrations/google_calendar.png'},
    {value:'zoom.png', label:'Zoom',  pic:'/static/images/integrations/zoom.png'},
    {value:'trello.png', label:'Trello',  pic:'/static/images/integrations/trello.png'},
  ]
  const handleChangeCurrency = event => {
    setIntegration(event.target.value);
    setMessageIntegration(event.target.value);
  };

  return (
      <div className={classes.messageBar} {...other}>

        <Box sx={{ px: 1 }}>

          <TextField
            // style={{paddingRight : '3rem'}}
            select
            style={{width : '12rem'}}
            size="small"
            label="Source"
            value={integration}
            onChange={handleChangeCurrency}
          >
            {integrations.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
                
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Divider orientation="vertical" flexItem />
        
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

        <Divider orientation="vertical" flexItem />

        <Box sx={{ px: 1 }}>
          <IconButton color="primary" disabled={!message} onClick={handleSend}>
            <Icon icon={roundSend} width={24} height={24} />
          </IconButton>
        </Box>
      </div>
  );
}

export default MessageInput;
