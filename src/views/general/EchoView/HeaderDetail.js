import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from './Dropdown';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { fToNow } from '~/utils/formatTime';
import videoFill from '@iconify-icons/eva/video-fill';
import phoneFill from '@iconify-icons/eva/phone-fill';
// import BadgeStatus from '~/components/BadgeStatus';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify-icons/eva/arrow-ios-forward-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Link, Avatar, Typography, AvatarGroup } from '@material-ui/core';
import { MIconButton } from '~/@material-extend';
import { MChip } from '~/@material-extend';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    minHeight: 92,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 3)
  },
  icon: { width: 20, height: 20 },
  avatarGroup: {
    marginBottom: theme.spacing(0.5),
    '& > *': { width: 32, height: 32 }
  }
}));

// ----------------------------------------------------------------------

HeaderDetail.propTypes = {
  className: PropTypes.string,
  echo: PropTypes.object
};

function HeaderDetail({ echo, className, ...other }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...other}>
      
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Box sx={{ position: 'relative' }}>
          <Avatar src={echo.picture} alt={echo.picture} />
        </Box> */}
        <Box sx={{ ml: 2 }}>
          <MChip
            // icon={<FaceIcon />}
            label={echo.name}
            color="default"
          />
          {/* <Typography variant="subtitle2">{echo.name}</Typography> */}
          <Typography variant="body2" color="textSecondary">{echo.description}</Typography>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }} />
      <Dropdown />
      {/* <MIconButton>
        <Icon icon={moreVerticalFill} className={classes.icon} />
      </MIconButton> */}
    </div>
  );
}

export default HeaderDetail;
