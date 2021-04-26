import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import googleFill from '@iconify-icons/eva/google-fill';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core';
import { useFirestore } from 'react-redux-firebase';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

SocialRegister.propTypes = {
  firebase: PropTypes.object,
  className: PropTypes.string
};

function SocialRegister({ firebase, className }) {
  const classes = useStyles();
  const firestore = useFirestore();

  const handleLoginGoogle = async () => {
    try {
      // await firebase.login({ provider: 'google', type: 'popup' });
      firebase.auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result) => {
        firestore
          .collection('users')
          .doc(result.user.uid)
          .set({
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            google_token: result.credential.accessToken,
            integrations: 'none'
        })
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Grid container spacing={2} className={clsx(classes.root, className)}>
      <Grid item xs>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          onClick={handleLoginGoogle}
        >
          <Icon icon={googleFill} color="#DF3E30" height={24} />
        </Button>
      </Grid>
    </Grid>
  );
}

export default SocialRegister;
