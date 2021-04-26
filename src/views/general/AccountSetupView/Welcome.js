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

function Welcome() {
  const classes = useStyles();

  return (
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
                <CardHeader title="Welcome" />
                <CardContent>
                  <Block>
                    {/* <div className={classes.list}> */}
                    
                      <h4> 🎉 Hey there, thanks for joining Megaphone!</h4>
                      <p>Getting started is super easy, just tell us which apps you and your team use the most.</p>
                     
                    {/* </div> */}
                  </Block>
                </CardContent>
              </Card>
        </Grid>
      </Grid>
    </CardContent>
  );
}

export default Welcome;
