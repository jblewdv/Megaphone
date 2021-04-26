import clsx from 'clsx';
import { Icon } from '@iconify/react';
import { PATH_APP } from '~/routes/paths';
import MyAvatar from '~/components/MyAvatar';
import React, { useRef, useState } from 'react';
import PopoverMenu from '~/components/PopoverMenu';
import personFill from '@iconify-icons/eva/person-fill';
import settingsFill from '@iconify-icons/eva/settings-fill';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography } from '@material-ui/core';
import moreVerticalFill from '@iconify-icons/eva/more-vertical-fill';
import { MIconButton } from '~/@material-extend';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Invite',
    icon: personFill,
    linkTo: '/app/account'
  },
  {
    label: 'Leave',
    icon: settingsFill,
    linkTo: '/app/integrations'
  }
];

const useStyles = makeStyles(theme => ({
  menuItem: {
    ...theme.typography.body2,
    padding: theme.spacing(1, 2.5)
  },
  btnAvatar: {
    padding: 0,
    width: 44,
    height: 44
  },
  isSelected: {
    '&:before': {
      zIndex: 1,
      content: "''",
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      position: 'absolute',
      background: alpha(theme.palette.grey[900], 0.8)
    }
  },
  divider: {
    margin: theme.spacing(1, 0)
  },
  icon: { width: 20, height: 20 }
}));

// ----------------------------------------------------------------------

function Dropdown() {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        className={clsx(classes.btnAvatar, { [classes.isSelected]: isOpen })}
      >
        <MyAvatar />
      </MIconButton> */}

      <MIconButton>
        <Icon 
            icon={moreVerticalFill} 
            className={classes.icon} 
            ref={anchorRef}
            onClick={handleOpen}
        />
      </MIconButton>

      <PopoverMenu
        width={220}
        open={isOpen}
        onClose={handleClose}
        anchorEl={anchorRef.current}
      >

        {MENU_OPTIONS.map(option => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            className={classes.menuItem}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}
      </PopoverMenu>
    </>
  );
}

export default Dropdown;
