import clsx from 'clsx';
import React from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import countries from './countries';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import useIsMountedRef from '~/hooks/useIsMountedRef';
import { Form, FormikProvider, useFormik } from 'formik';
import { UploadAvatar } from '~/components/Upload';
import { useFirebase, useFirestore } from 'react-redux-firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  Card,
  Switch,
  TextField,
  CardContent,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {}
}));

// ----------------------------------------------------------------------

General.propTypes = {
  className: PropTypes.string
};

function General({ className }) {
  const classes = useStyles();
  const firebase = useFirebase();
  const firestore = useFirestore();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const { auth, profile } = useSelector(state => state.firebase);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: auth.displayName || profile.displayName || '',
      email: auth.email,
      photoURL: auth.photoURL || profile.photoURL || '',
      about: profile.about || '',
      isPublic: false
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await firebase.updateProfile({}).then(res => {
          firestore
            .collection('users')
            .doc(res.id)
            .set(
              {
                displayName: values.name,
                photoURL: values.photoURL,
                phoneNumber: values.phoneNumber,
                about: values.about,
                isPublic: values.isPublic
              },
              { merge: true }
            );
        });
        enqueueSnackbar('Update success', { variant: 'success' });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (err) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: err.code });
          setSubmitting(false);
        }
      }
    }
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
    setFieldValue
  } = formik;

  return (
    <div className={clsx(classes.root, className)}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <Box
                  sx={{
                    my: 10,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <UploadAvatar
                    disabled={auth.email === 'demo@minimals.cc'} // You can remove this
                    value={values.photoURL}
                    onChange={value => setFieldValue('photoURL', value)}
                  />
                </Box>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        disabled={auth.email === 'demo@minimals.cc'} // You can remove this
                        fullWidth
                        label="Name"
                        {...getFieldProps('name')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        disabled
                        label="Email Address"
                        {...getFieldProps('email')}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        fullWidth
                        label="Phone Number"
                        {...getFieldProps('phoneNumber')}
                      />
                    </Grid>

                    

                    <Grid item xs={12}>
                      <TextField
                        {...getFieldProps('about')}
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={4}
                        label="About"
                      />
                    </Grid>
                  </Grid>

                  <Box
                    sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      pending={isSubmitting}
                    >
                      Save Changes
                    </LoadingButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </div>
  );
}

export default General;
