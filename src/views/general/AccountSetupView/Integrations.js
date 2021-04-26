import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Block from '~/components/Block';
import {
  Grid,
  FormGroup,
  FormControl,
  FormControlLabel,
  Switch,
  Card,
  List,
  Avatar,
  Divider,
  ListItem,
  Collapse,
  Checkbox,
  Container,
  IconButton,
  CardHeader,
  CardContent,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core';
import { MCheckbox } from '~/@material-extend';
import { MSwitch } from '~/@material-extend';

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

function Integrations({ integrations, checked, handleToggle }) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  

  return (
    <CardContent>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader title="What apps do you and your team use the most?" />
            <CardContent>
              <Block>
                <div className={classes.list}>
                  <List>
                    {integrations.map((integration, index) => {
                      const labelId = { integration };
                      return (
                        <ListItem
                          key={index}
                          role={undefined}
                          dense
                          button
                          onClick={handleToggle(integration)}
                        >
                          <ListItemIcon>
                            <Checkbox
                              edge="start"
                              checked={checked.indexOf(integration) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            id={labelId}
                            primary={integration.name}
                          />
                          <ListItemSecondaryAction>
                            <img
                              src={integration.source}
                              width="30px"
                              height="30px"
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </Block>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </CardContent>
  );
}

export default Integrations;
