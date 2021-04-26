import Sidebar from './Sidebar';
import TopBar from './TopBar';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const useStyles = makeStyles(theme => ({
  root: {},
  rootLayout: {
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
  },
  // ChatWindow
  card: {
    height: '72vh',
    display: 'flex'
  }
}));

// ----------------------------------------------------------------------

AppLayout.propTypes = {
  children: PropTypes.node
};

function AppLayout({ children }) {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);

  return (
    <div className={classes.rootLayout}>
      <TopBar onOpenNav={() => setOpenNav(true)} />
      {/* <NavBar onCloseNav={() => setOpenNav(false)} isOpenNav={openNav} /> */}
      <Sidebar />

      <div className={classes.main}>
        {children}
      </div>
    </div>
  );
}

export default AppLayout;
