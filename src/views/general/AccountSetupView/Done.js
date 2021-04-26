import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Block from '~/components/Block';

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
} from '@material-ui/core';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  list: {
    width: '100%',
    boxShadow: theme.shadows[25].z8,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white
  }
}));

function Events() {
  const classes = useStyles();

  return (
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
                <CardHeader title="Done" />
                <CardContent>
                  <Block>
                    <h4>👋🏼 Sweet, that's it!</h4>
                    <p>Let's go make your first Echo.</p>
                  </Block>
                </CardContent>
              </Card>
        </Grid>
      </Grid>
    </CardContent>
  );
}

export default Events;
