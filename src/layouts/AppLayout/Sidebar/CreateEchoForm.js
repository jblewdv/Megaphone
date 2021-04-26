import React, { useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useFormik, Form, FormikProvider } from 'formik';
import { createEcho } from '~/redux/slices/echo';
import { makeStyles } from '@material-ui/core/styles';
import Block from '~/components/Block';
import {
  Button,
  TextField,
  DialogActions,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Typography,
  Checkbox,
  Box,
  Grid,
  Divider,
  Card,
  List,
  Avatar,
  Switch,
  ListItem,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core';
import Tags from "@yaireo/tagify/dist/react.tagify";
import "@yaireo/tagify/dist/tagify.css";
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------


const INTEGRATIONS = [
  {
    'name': 'Google Calender',
    'logo': '/static/images/integrations/google_calendar.png',
    'events': [
      'Event Ended'
    ]
  },
  {
    'name': 'Trello',
    'logo': '/static/images/integrations/trello.png',
    'events': [
      'Checklist Completed',
      'Project Goal Achieved'
    ]
  },
  {
    'name': 'Bitbucket',
    'logo': '/static/images/integrations/bitbucket.png',
    'events': [
      'Update to Master Branch',
      'Successful Build',
      'New Release'
    ]
  }
]

const getInitialValues = () => {
  const _echo = {
    name: '',
    description: '',
    events: [],
    participants: '',
    textColor: '#1890FF',
  };

  return _echo;
};

const useStyles = makeStyles(theme => ({
  root: {},
  // content: { padding: theme.spacing(0, 3) },
  margin: { marginBottom: theme.spacing(3) },
  list: {
    width: '100%',
    boxShadow: theme.shadows[25].z8,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginBottom: '1rem',
  }
}));

// ----------------------------------------------------------------------

CreateEchoForm.propTypes = {
  events: PropTypes.array,
  onCancel: PropTypes.func
};

function CreateEchoForm({ history, onCancel }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [checkedEvents, setCheckedEvents] = useState([]);

  const handleToggle = value => () => {
    const currentIndex = checkedEvents.indexOf(value);
    const newChecked = [...checkedEvents];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedEvents(newChecked);
  };

  const EchoSchema = Yup.object().shape({
    name: Yup.string()
      .max(255)
      .required('Name is required'),
    description: Yup.string().max(500),
    events: Yup.array()
  });

  const formik = useFormik({
    initialValues: getInitialValues(),
    validationSchema: EchoSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        var Ps = values.participants.split(',')
        Ps = Ps.map(p => p.trim());
        
        const newEcho = {
          name: values.name,
          description: values.description,
          events: ['Google Calender creation', 'Zoom meeting'],
          participants: Ps
        };

        dispatch(createEcho(newEcho));
        enqueueSnackbar('Create echo success', { variant: 'success' });
        resetForm();
        onCancel();
        setSubmitting(false);
        // history.push('/app/dashboard');
      } catch (err) {
        console.error(err);
      }
    }
  });

  // alert(formik.validationSchema)

  const {
    values,
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    getFieldProps,
    setFieldValue
  } = formik;

  // const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            {...getFieldProps('name')}
            error={Boolean(touched.title && errors.title)}
            helperText="Whatcha wanna call it?"
            className={classes.margin}
          />

          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Description"
            {...getFieldProps('description')}
            error={Boolean(touched.description && errors.description)}
            helperText="A lil blurb about your Echo."
            className={classes.margin}
          />
               
          <FormGroup>
            {INTEGRATIONS.map(integration => (
              <div className={classes.list}>
                <List style={{marginTop: '1rem'}} subheader={
                  <ListSubheader> 
                    <img src={integration.logo} width='24px' height='24px' />
                    {integration.name}
                  </ListSubheader>}>
                  {integration.events.map(e => (
                    <ListItem>
                      <ListItemText
                        id={e}
                        primary={e}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          edge="end"
                          onChange={handleToggle(integration + '_' + e)}
                          checked={checkedEvents.indexOf(integration + '_' + e) !== -1}
                          inputProps={{
                            'aria-labelledby': 'switch-list-label-wifi'
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}   
                </List>
              </div>
            ))}
          </FormGroup>

          <Divider style={{paddingTop: '2rem', paddingBottom : '2rem'}}>
            <Typography variant="body2" color="textSecondary">
              Add more integrations <a href="#">here</a>
            </Typography>
          </Divider>

          <TextField
            fullWidth
            label="Participants"
            {...getFieldProps('participants')}
            error={Boolean(touched.title && errors.title)}
            helperText="Add people to your Echo by email, separate with commas."
            className={classes.margin}
          />
         
        </DialogContent>

        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            pending={isSubmitting}
            pendingIndicator="Loading..."
          >
            Create
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}

export default CreateEchoForm;
