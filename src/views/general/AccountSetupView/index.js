import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Step,
  Button,
  Stepper,
  StepLabel,
  Typography,
  Container
} from '@material-ui/core';
import Page from '~/components/Page';
import { MButton } from '~/@material-extend';

import Integrations from './Integrations';
import Done from './Done';
import Welcome from './Welcome';

import { useDispatch } from 'react-redux';
import { setIntegrations } from '~/redux/slices/user';
// Utils
import { PATH_APP } from '~/routes/paths';
import { useHistory } from 'react-router-dom';

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  list: {
    width: '100%',
    boxShadow: theme.shadows[25].z8,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white
  }
}));

const integrations = [
  {
    'id': 0,
    'name': 'Google Calender',
    'source': '/static/images/integrations/google_calendar.png',
    'events': [
      'Event Created',
      'Event Ended'
    ]
  },
  {
    'id': 1,
    'name': 'Gmail',
    'source': '/static/images/integrations/gmail.svg',
    'events': [
      'Email Starred'
    ]
  },
  {
    'id': 2,
    'name': 'Mailchimp',
    'source': '/static/images/integrations/mailchimp.svg',
    'events': [
      'New Campaign Created',
      'Daily Email Statistics'
    ]
  },
  {
    'id': 3,
    'name': 'Zoom',
    'source': '/static/images/integrations/zoom.png',
    'events': [
      'Meeting Scheduled',
      'Meeting Ended'
    ]
  },
  {
    'id': 4,
    'name': 'Calendly',
    'source': '/static/images/integrations/calendly.svg',
    'events': [
      'Event Created',
      'Event Ended',
      'Payment Received'
    ]
  },
  {
    'id': 5,
    'name': 'Salesforce',
    'source': '/static/images/integrations/salesforce.svg',
    'events': [
      'Event Created',
      'Event Ended'
    ]
  },
  {
    'id': 6,
    'name': 'Zendesk',
    'source': '/static/images/integrations/zendesk.svg',
    'events': [
      'New Pipeline Created',
      'Project Achievement'
    ]
  },
  {
    'id': 7,
    'name': 'Intercom',
    'source': '/static/images/integrations/intercom.svg',
    'events': [
      'Support Ticket Created',
      'Feedback Left'
    ]
  },
  {
    'id': 8,
    'name': 'Google Drive',
    'source': '/static/images/integrations/google_drive.png',
    'events': [
      'New File',
      'Shared Environment Update'
    ]
  },
  {
    'id': 9,
    'name': 'Trello',
    'source': '/static/images/integrations/trello.png',
    'events': [
      'Team Board Created',
      'Checklist Completed',
      'Project Goal Achieved'
    ]
  },
  {
    'id': 10,
    'name': 'Github',
    'source': '/static/images/integrations/github.svg',
    'events': [
      'Update to Master Branch',
      'New Action Created',
      'Docs Updated',
      'New Release',
      'New Issue'
    ]
  },
  {
    'id': 11,
    'name': 'Bitbucket',
    'source': '/static/images/integrations/bitbucket.png',
    'events': [
      'Update to Master Branch',
      'New Pipeline/Deployment Created',
      'Docs Updated',
      'New Release',
      'New Issue',
      'Successful Build'
    ]
  },
  {
    'id': 12,
    'name': 'Jira',
    'source': '/static/images/integrations/jira.svg',
    'events': [
      'Team Board Created',
      'Checklist Completed',
      'Project Goal Achieved'
    ]
  },
  {
    'id': 13,
    'name': 'Asana',
    'source': '/static/images/integrations/asana.svg',
    'events': [
      'Project Accomplishment',
      'New Member Added'
    ]
  },
  {
    'id': 14,
    'name': 'Dropbox',
    'source': '/static/images/integrations/dropbox.png',
    'events': [
      'New Shared Folder',
      'New Group'
    ]
  },
  {
    'id': 15,
    'name': 'Hubspot',
    'source': '/static/images/integrations/hubspot.svg',
    'events': [
      'Lead Goal Accomplished',
      'Email Campaign Statistics',
      'Pipeline Update',
      'Sales Achievement',
      'New Customer'
    ]
  }
];

function getSteps() {
  return [
    'Welcome', 
    'Integrations', 
    'Done'
  ];
}

function HorizontalLinearStepper() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(0);
  const [checkedIntegration, setCheckedIntegration] = useState([]);
  const steps = getSteps();
  

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleFinish = () => {
    // dispatch(setIntegrations(checkedIntegration));
    history.push(PATH_APP.main.root);
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleIntegrationToggle = value => () => {
    const currentIndex = checkedIntegration.indexOf(value);
    const newChecked = [...checkedIntegration];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setCheckedIntegration(newChecked);
    console.log(newChecked)
  };

  // custom
  // useEffect(() => {
  //   dispatch(setIntegrations());
  // }, [dispatch]);




  return (
    <Page title="Integrations" className={classes.root}>
      <Container>
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};
        
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <>
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    minHeight: 120,
                    bgcolor: 'background.neutral'
                  }}
                >
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                </Box>

                <Button onClick={handleReset} className={classes.button}>
                  Reset
                </Button>
              </>
            ) : (
              <div>
                <Box
                  sx={{
                    p: 3,
                    mb: 3,
                    minHeight: 120,
                    bgcolor: 'background.neutral'
                  }}
                >
                  <Typography className={classes.instructions}>
                    {activeStep == 0 && <Welcome />}
                    {activeStep == 1 && <Integrations integrations={integrations} checked={checkedIntegration} handleToggle={handleIntegrationToggle} />} 
                    {activeStep == 2 && <Done />}
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                 

                  {activeStep === steps.length - 1 ? 
                    <Button
                    variant="contained"
                    onClick={handleFinish}
                    className={classes.button}
                  >
                    Finish
                  </Button> 
                  : 
                    <Button
                    variant="contained"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>}
                </Box>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Page>
  );
}

export default HorizontalLinearStepper;
