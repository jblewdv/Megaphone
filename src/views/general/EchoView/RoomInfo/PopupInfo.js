import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { DialogAnimate } from '~/components/Animate';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, DialogContent } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  dialogContent: {
    textAlign: 'center',
    padding: `${theme.spacing(5, 0)} !important`
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(1.5)
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  }
}));

// ----------------------------------------------------------------------

PopupInfo.propTypes = {
  participant: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  className: PropTypes.string
};

function PopupInfo({ participant, isOpen, onClose, className, ...other }) {
  const classes = useStyles();
  const { name, avatar, email } = participant;

  return (
    <DialogAnimate
      fullWidth
      maxWidth="xs"
      open={isOpen}
      onClose={onClose}
      className={clsx(classes.root, className)}
      {...other}
    >
      <DialogContent className={classes.dialogContent}>
        <Avatar
          alt={name}
          src={avatar}
          className={classes.avatar}
          sx={{
            mb: 2,
            mx: 'auto',
            width: 96,
            height: 96
          }}
        />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          {email}
        </Typography>
      </DialogContent>
    </DialogAnimate>
  );
}

export default PopupInfo;
