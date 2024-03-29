import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import GroupParticipant from './GroupParticipant';
import React, { useState, useEffect } from 'react';
import useBreakpoints from '~/hooks/useBreakpoints';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseSidebarInfo, onOpenSidebarInfo } from '~/redux/slices/echo';
import arrowIosBackFill from '@iconify-icons/eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    width: 240,
    flexShrink: 0,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    borderLeft: `solid 1px ${theme.palette.divider}`,
    transition: theme.transitions.create('width')
  },
  toggleButton: {
    borderRight: 0,
    display: 'flex',
    overflow: 'hidden',
    position: 'absolute',
    alignItems: 'center',
    top: theme.spacing(1),
    left: theme.spacing(-4),
    width: theme.spacing(4),
    height: theme.spacing(4),
    justifyContent: 'center',
    boxShadow: theme.shadows[25].z8,
    border: `solid 1px ${theme.palette.divider}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    borderBottomLeftRadius: theme.shape.borderRadius
  },
  hideSidebar: { width: 0, '& > *': { overflow: 'hidden' } }
}));

// ----------------------------------------------------------------------

RoomInfo.propTypes = {
  echo: PropTypes.object.isRequired,
  participants: PropTypes.array.isRequired,
  className: PropTypes.string
};

function RoomInfo({ echo, participants, className, ...other }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [showInfo, setShowInfo] = useState(true);
  const [selectUser, setSelectUser] = useState(null);
  const [showAttachment, setShowAttachment] = useState(true);
  const [showParticipants, setShowParticipants] = useState(true);
  const { isOpenSidebarInfo } = useSelector(state => state.echo);
  const isMoblie = useBreakpoints('down', 'lg');
  const isGroup = participants.length > 1;

  useEffect(() => {
    if (isMoblie) return dispatch(onCloseSidebarInfo());
    return dispatch(onOpenSidebarInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoblie]);

  const handleToggleSidebar = () => {
    if (isOpenSidebarInfo) {
      return dispatch(onCloseSidebarInfo());
    }
    return dispatch(onOpenSidebarInfo());
  };

  return (
    <div
      className={clsx(
        classes.root,
        { [classes.hideSidebar]: !isOpenSidebarInfo },
        className
      )}
      {...other}
    >
      <div className={classes.toggleButton}>
        <IconButton onClick={handleToggleSidebar}>
          <Icon
            icon={isOpenSidebarInfo ? arrowIosForwardFill : arrowIosBackFill}
            width={16}
            height={16}
          />
        </IconButton>
      </div>

      <GroupParticipant
          selectUserId={selectUser}
          participants={participants}
          isCollapse={showParticipants}
          onShowPopupUserInfo={participantId => setSelectUser(participantId)}
          onCollapse={() => setShowParticipants(prev => !prev)}
        />
    </div>
  );
}

export default RoomInfo;
