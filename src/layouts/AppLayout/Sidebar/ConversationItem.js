import clsx from 'clsx';
import React from 'react';
import { last } from 'lodash';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
import BadgeStatus from '~/components/BadgeStatus';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Avatar,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 36;
const AVATAR_SIZE_GROUP = 24;

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1.5, 3),
    transition: theme.transitions.create('all')
  },
  listItemSelected: {
    backgroundColor: theme.palette.action.selected
  },
  avatar: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& .MuiAvatar-img': { borderRadius: '50%' },
    '& .MuiAvatar-root': { width: '100%', height: '100%' }
  },
  avatarGroup: {
    position: 'relative',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    '& $avatar': {
      position: 'absolute',
      width: AVATAR_SIZE_GROUP,
      height: AVATAR_SIZE_GROUP,
      '&:nth-child(1)': {
        zIndex: 9,
        left: 0,
        bottom: 2,
        '& .MuiAvatar-root': {
          border: `solid 2px ${theme.palette.background.paper}`
        }
      },
      '&:nth-child(2)': { top: 2, right: 0 }
    }
  },
  lastActivity: {
    fontSize: 12,
    lineHeight: '22px',
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1.25),
    color: theme.palette.text.disabled
  }
}));

// ----------------------------------------------------------------------

const getDetails = (echo, currentUserId) => {
  const name = echo.name;
  const picture = echo.picture;
  // const otherParticipants = echo.participants.filter(
  //   participant => participant.id !== currentUserId
  // );
  // const displayNames = otherParticipants
  //   .reduce((names, participant) => [...names, participant.name], [])
  //   .join(', ');
  // let displayText = '';
  // const lastMessage = echo.messages[echo.messages.length - 1];
  // if (lastMessage) {
  //   const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';
  //   const message =
  //     lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;
  //   displayText = `${sender}${message}`;
  // }
  // return { otherParticipants, name, displayText };
  return { name, picture };
};

ConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  echo: PropTypes.object.isRequired,
  isOpenSidebarEcho: PropTypes.bool,
  onSelectEcho: PropTypes.func,
  className: PropTypes.string
};

function ConversationItem({
  isSelected,
  echo,
  onSelectEcho,
  isOpenSidebarEcho,
  className,
  ...other
}) {
  const classes = useStyles();
  const details = getDetails(
    echo,
    '8864c717-587d-472a-929a-8e5f298024da-0'
  );

  const displayLastActivity = last(echo.messages).createdAt;
  // const isGroup = details.otherParticipants.length > 1;
  const isUnread = echo.unreadCount > 0;
  // const isOnlineGroup =
  //   isGroup &&
  //   details.otherParticipants.map(item => item.status).includes('online');

  return (
    <ListItem
      button
      disableGutters
      onClick={onSelectEcho}
      className={clsx(
        classes.root,
        { [classes.listItemSelected]: isSelected },
        className
      )}
      {...other}
    >

      {/* Avatar */}
      {/* <ListItemAvatar>
        <div>
          <Avatar alt={details.name} src={details.picture} />

       
        </div>
      </ListItemAvatar> */}

      {isOpenSidebarEcho && (
        <>
          <ListItemText
            primary={details.name}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2'
            }}
            // secondary={details.displayText}
            // secondaryTypographyProps={{
            //   noWrap: true,
            //   variant: isUnread ? 'subtitle2' : 'body2',
            //   color: isUnread ? 'textPrimary' : 'textSecondary'
            // }}
          />

          <Box
            sx={{
              ml:1,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column'
            }}
          >
            {/* <div className={classes.lastActivity}>
              {formatDistanceToNowStrict(new Date(displayLastActivity), {
                addSuffix: false
              })}
            </div> */}
            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Box>
        </>
      )}
    </ListItem>
  );
}

export default ConversationItem;
