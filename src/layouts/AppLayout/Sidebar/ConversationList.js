import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ConversationItem from './ConversationItem';
import { makeStyles } from '@material-ui/core/styles';
import { List } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(() => ({
  root: {}
}));

// ----------------------------------------------------------------------

ConversationList.propTypes = {
  echos: PropTypes.object,
  isOpenSidebarEcho: PropTypes.bool,
  activeEchoId: PropTypes.string,
  className: PropTypes.string
};

function ConversationList({
  echos,
  isOpenSidebarEcho,
  activeEchoId,
  className,
  ...other
}) {
  console.log(echos)
  const classes = useStyles();
  const history = useHistory();

  const handleSelectEcho = echoId => {
    let echoKey = '';
    const echo = echos.byId[echoId];
    echoKey = echo.id;
    history.push(`/app/dashboard/${echoKey}`);
  };

  return (
    <List disablePadding className={clsx(classes.root, className)} {...other}>
      {echos.allIds.map(echoId => (
        <ConversationItem
          key={echoId}
          isOpenSidebarEcho={isOpenSidebarEcho}
          echo={echos.byId[echoId]}
          isSelected={activeEchoId === echoId}
          onSelectEcho={() => handleSelectEcho(echoId)}
        />
      ))}
    </List>
  );
}

export default ConversationList;
