import React, { useState } from 'react';
import { Card, Container, Grid } from '@material-ui/core';
import Page from '~/components/Page';
import { makeStyles } from '@material-ui/core/styles';
import Welcome from './Welcome';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const useStyles = makeStyles(theme => ({
  root: {},
  main: {
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 40,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 40,
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

function AppView() {
  const classes = useStyles();
  const [openNav, setOpenNav] = useState(false);
  const { auth, profile } = useSelector(state => state.firebase);
  const displayName = auth.displayName || profile.displayName;

  return (
    <Page title="Dashboard" className={classes.root}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/*********************/}
          <Grid item xs={12} md={12}>
            <Welcome displayName={displayName.includes(" ") ? displayName.split(" ")[0] : displayName} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default AppView;
