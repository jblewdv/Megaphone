import clsx from 'clsx';
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  margin: {
    marginBottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------


function IntegrationsView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
    </div>
  );
}

export default IntegrationsView;
