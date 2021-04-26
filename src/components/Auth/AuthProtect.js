import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { PATH_PAGE, PATH_USER } from '~/routes/paths';
import LoadingScreen from '~/components/LoadingScreen';
import { isLoaded, isEmpty, useFirestore } from 'react-redux-firebase';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

function AuthProtect({ children }) {
  const [integrationSetup, setIntegrationSetup] = useState(false);
  // const firestore = useFirestore();
  const { auth, profile } = useSelector(state => state.firebase);


  if (!isLoaded(auth)) {
    return <LoadingScreen />;
  }

  if (isEmpty(auth)) {
    return <Redirect to={PATH_PAGE.auth.login} />;
  }


  return children;
}

export default AuthProtect;
