import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';
import Scrollbars from '~/components/Scrollbars';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, Box, Rating, Avatar } from '@material-ui/core';
import { MTimelineDot } from '~/@material-extend';
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent
} from '@material-ui/lab';

import MessageItem from './MessageItem';

import FavoriteIcon from '@material-ui/icons/Favorite';

// const StyledRating = withStyles({
//   iconFilled: { color: '#FF4842' },
//   iconHover: { color: '#B72136' }
// })(Rating);

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  scroll: { height: '100%', padding: theme.spacing(3) }
}));

// ----------------------------------------------------------------------

MessageList.propTypes = {
  echo: PropTypes.object.isRequired,
  className: PropTypes.string
};

function MessageList({ echo, className, ...other }) {
  const classes = useStyles();
  const scrollRef = useRef();

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echo.messages]);

  return (
    <Scrollbars
      scrollableNodeProps={{ ref: scrollRef }}
      className={classes.scroll}
    >
      <div className={clsx(classes.root, className)} {...other}>

        <p
          style={{
            textAlign: 'center',
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }}
        >
          🚀 {echo.creator} started the Echo
        </p>

        <Timeline align="alternate">

          {echo.messages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              echo={echo}
            />
          ))}

        </Timeline>



    

        <p
          style={{
            textAlign: 'center',
            paddingTop: '1rem',
            paddingBottom: '1rem'
          }}
        >
          🎉 You're all caught up!
        </p>
      </div>
    </Scrollbars>
  );
}

export default MessageList;
