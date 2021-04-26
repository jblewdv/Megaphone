// React
import React, { useState, useEffect } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useBreakpoints from '~/hooks/useBreakpoints';

// Modules
import clsx from 'clsx';

// Core components
import { makeStyles } from '@material-ui/core/styles';
import { Box, Drawer, Hidden, Tooltip, Button, DialogTitle } from '@material-ui/core';
import Logo from '~/components/Logo';
import { MFab } from '~/@material-extend';
import { Icon } from '@iconify/react';
import plusFill from '@iconify-icons/eva/plus-fill';

// Custom components
import { DialogAnimate } from '~/components/Animate';
import CreateEchoForm from './CreateEchoForm';
import Search from './Search';
import SearchResults from './SearchResults';
import ConversationList from './ConversationList';
import Scrollbars from '~/components/Scrollbars';

// State
import {
  getEchos,
  getContacts,
  onOpenSidebarEcho,
  onCloseSidebarEcho,
  openModal, 
  closeModal
} from '~/redux/slices/echo';

import { getProfile } from '~/redux/slices/user';

// Utils
import axios from '~/utils/axios';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 320;

const useStyles = makeStyles(theme => {
  const isLight = theme.palette.mode === 'light';

  return {
    drawer: {
      [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
      }
    },
    drawerPaper: {
      width: DRAWER_WIDTH,
      background: theme.palette.background.default
    },
    subHeader: {
      ...theme.typography.overline,
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      color: theme.palette.text.primary
    },
    // sidebar styles
    root: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      transition: theme.transitions.create('width'),
      borderRight: `1px solid ${theme.palette.divider}`
    },
    collapse: { width: 96 },
    hide: { display: 'none' },
    createEchoBtn : {
      backgroundColor: theme.palette.primary.main
    }
  };
});

// ----------------------------------------------------------------------

function Sidebar({ isOpenNav, onCloseNav }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setSearchFocused] = useState(false);
  const isMoblie = useBreakpoints('down', 'md');
  const displayResults = searchQuery && isSearchFocused;
  
  useEffect(() => {
    dispatch(getEchos());
    dispatch(getContacts());
    dispatch(getProfile());
  }, [dispatch]);

  const {
    echos,
    isOpenSidebarEcho,
    activeEchoId
  } = useSelector(state => state.echo);

  console.log(echos)

  const {
    myProfile
  } = useSelector(state => state.user);

  const { isOpenModal } = useSelector(
    state => state.echo
  );

  useEffect(() => {
    if (isMoblie) {
      return dispatch(onCloseSidebarEcho());
    }
    return dispatch(onOpenSidebarEcho());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMoblie]);

  useEffect(() => {
    if (!isOpenSidebarEcho) {
      return setSearchFocused(false);
    }
  }, [isOpenSidebarEcho]);

  const handleClickAwaySearch = () => {
    setSearchFocused(false);
    setSearchQuery('');
  };

  const handleChangeSearch = async event => {
    try {
      const { value } = event.target;
      setSearchQuery(value);
      if (value) {
        const response = await axios.get('/api/chat/search', {
          params: { query: value }
        });
        setSearchResults(response.data.results);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchFocus = event => {
    setSearchFocused(true);
  };

  const handleSearchSelect = result => {
    setSearchFocused(false);
    setSearchQuery('');
    history.push(`/app/chat/${result.username}`); // broken
  };

  const handleSelectContact = result => {
    if (handleSearchSelect) {
      handleSearchSelect(result);
    }
  };

  const handleToggleEcho = () => {
    if (isOpenSidebarEcho) {
      return dispatch(onCloseSidebarEcho());
    }
    return dispatch(onOpenSidebarEcho());
  };

  // Add echo 
  const handleAddEvent = () => {
    dispatch(openModal());
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const renderContent = (
    <div
      className={clsx(classes.root, {
        [classes.collapse]: !isOpenSidebarEcho
      })}
    >
      <Box sx={{ py: 2, px: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          
        </Box>
        
        

        {isOpenSidebarEcho && (
          <>
            <Search
              query={searchQuery}
              onFocus={handleSearchFocus}
              onChange={handleChangeSearch}
              onClickAway={handleClickAwaySearch}
            />

            <Box sx={{ py: 3 }}>
              <Button
                className={classes.createEchoBtn}
                fullWidth
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
                onClick={handleAddEvent}
              >
                Create a new Echo
              </Button>
            </Box>
          </>
        )}
      </Box>

      {/* <div style={{ overflow : 'hidden' }}> */}
      <Scrollbars>
        {!displayResults ? (
          <ConversationList
            echos={echos}
            isOpenSidebarEcho={isOpenSidebarEcho}
            activeEchoId={activeEchoId}
            className={clsx({
              [classes.hide]: isSearchFocused
            })}
          />
        ) : (
          <SearchResults
            query={searchQuery}
            results={searchResults}
            onSelectContact={handleSelectContact}
          />
        )}
      </Scrollbars>
      {/* </div> */}
      

      <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle>
            Create a new Echo
          </DialogTitle>

          <CreateEchoForm
            history={history}
            onCancel={handleCloseModal}
          />
        </DialogAnimate>
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          open={isOpenNav}
          variant="temporary"
          onClose={onCloseNav}
          classes={{ paper: classes.drawerPaper }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          open
          anchor="left"
          variant="persistent"
          classes={{ paper: classes.drawerPaper }}
        >
          {renderContent}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;
