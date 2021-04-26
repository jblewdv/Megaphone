import TopBar from './TopBar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    overflow: 'hidden'
  },
  main: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  }
}));

// ----------------------------------------------------------------------

AuxLayout.propTypes = {
  children: PropTypes.node
};

function AuxLayout({ children }) {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onOpenNav={() => setOpenNav(true)} />

      <div className={classes.main}>
        {children}
      </div>
    </div>
  );
}

export default AuxLayout;
