import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Icon,
  withStyles,
  MenuItem,
  Tooltip,
  IconButton,
  MuiThemeProvider
} from "@material-ui/core";

import { connect } from "react-redux";
import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { withRouter, useHistory } from "react-router-dom";
import { MatxMenu } from "matx";
import Sidenav from "../SharedCompoents/Sidenav";
import Brand from "../SharedCompoents/Brand";
import SidenavTheme from "../MatxTheme/SidenavTheme";
import { isMdScreen } from "utils";

import { Link } from 'react-router-dom'

import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = theme => ({});

const IconButtonWhite = withStyles(theme => ({
  root: {
    // color: theme.palette.getContrastText(purple[500]),
    backgroundColor: "transparent",
    padding: "5px"
  }
}))(IconButton);

const IconSmall = withStyles(() => ({
  root: {
    fontSize: "1rem"
  }
}))(Icon);

const Layout1Sidenav = (props) => {

  const history = useHistory()

  const sessionMember = sessionStorage.getItem("sessionMember")
  const state = {
    sidenavToggleChecked: false,
    // hidden: true
  };

  // const componentWillMount = () => {

  //   // CLOSE SIDENAV ON ROUTE CHANGE ON MOBILE
  //   unlistenRouteChange = props.history.listen((location, action) => {
  //     if (isMdScreen()) {
  //       updateSidebarMode({ mode: "close" });
  //     }
  //   });

  // }

  // const componentWillUnmount = () => {
  //   unlistenRouteChange();
  // }

  const updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings, setDefaultSettings } = sidebarSettings;
    const updatedSettings = {
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    };
    setLayoutSettings(updatedSettings);
    setDefaultSettings(updatedSettings);
  };

  const handleSidenavToggle = () => {
    let { sidenavToggleChecked } = state;
    let mode = sidenavToggleChecked ? "full" : "compact";
    this.updateSidebarMode({ mode });
    this.setState({ sidenavToggleChecked: !sidenavToggleChecked });
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("sessionMember")
    window.location.reload()
    props.logoutUser();
  }

  

  const renderLogoSwitch = () => (
    // Open Brand component file to replace logo and text
    <Brand>
      <Switch
        className="sidenav__toggle show-on-lg"
        onChange={handleSidenavToggle}
        checked={!state.sidenavToggleChecked}
        color="secondary"
      />
    </Brand>
  );

  const renderUser = () => {
    
    // let { user } = this.props;
    return (
      <div className="sidenav__user">
        {/* <div className="username-photo">
          <img src={user.photoURL} alt="user" />
        </div> */}
        {props.isAuth !== null
        ?
        <div className="ml-8">
          <span className="username">
            {/* <Icon>lock</Icon> */}
            {sessionMember}
          </span>
          <div className="user__menu">
            <MatxMenu
              menuButton={
                <Tooltip title="Settings">
                  <IconButtonWhite
                    aria-label="Delete"
                    className=""
                    size="small"
                  >
                    <IconSmall> settings </IconSmall>
                  </IconButtonWhite>
                </Tooltip>
              }
            >
              <MenuItem className="flex flex-middle" style={{ minWidth: 185 }}>
              <Link className="flex flex-middle" to="/">
                <Icon> home </Icon>
                <span className="pl-16"> Home </span>
              </Link>
              </MenuItem>
              <MenuItem className="flex flex-middle" style={{ minWidth: 185 }}>
              <Link className="flex flex-middle" to="/session/accountsetting">
                <Icon> settings </Icon>
                <span className="pl-16"> Account Setting </span>
                </Link>
              </MenuItem>
            </MatxMenu>

            <Tooltip title="mypage">
              <IconButtonWhite aria-label="Delete" className="" size="small">
              <Link className="flex flex-middle" to="/session/mypage">
                <IconSmall>person</IconSmall>
              </Link>
              </IconButtonWhite>
            </Tooltip>
            <Tooltip title="Sign out">
              <IconButtonWhite
                aria-label="Delete"
                className=""
                size="small"
                onClick={handleSignOut}
              >
                <IconSmall>exit_to_app</IconSmall>
              </IconButtonWhite>
            </Tooltip>
          </div>
        </div>
        :
        <div className="ml-8">
          <span className="username">
            {/* <Icon>lock</Icon> */}
            Hello Stranger!
          </span>
          <div className="user__menu">
            <Tooltip title="Sign up">
              <Link to="/session/signup">
                <IconButtonWhite
                  aria-label="Delete"
                  className=""
                  size="small"
                >
                  <IconSmall><CheckCircleIcon style={{ fontSize: "small" }}/></IconSmall>
                  <span style={{fontSize: "0.9rem"}}>Sign up</span>
                </IconButtonWhite>
              </Link>
            </Tooltip>
            <Tooltip title="Sign in">
              <Link to="/session/signin">
                <IconButtonWhite
                  aria-label="Delete"
                  className=""
                  size="small"
                >
                  <IconSmall><VpnKeyRoundedIcon style={{ fontSize: "small" }}/></IconSmall>
                  <span style={{fontSize: "0.9rem"}}>Sign in</span>
                </IconButtonWhite>
              </Link>
            </Tooltip>
          </div>
        </div>
        }
      </div>
    );
  };

  let { theme, settings } = props;
  const sidenavTheme =
    settings.themes[settings.layout1Settings.leftSidebar.theme] || theme;
  return (
    <MuiThemeProvider theme={sidenavTheme}>
      <SidenavTheme theme={sidenavTheme} settings={settings} />

      <div className="sidenav">
        <div className="sidenav__hold">
          {(
            <Fragment>
              {renderLogoSwitch()}
              <Sidenav>{renderUser()}</Sidenav>
            </Fragment>
          )}
        </div>
      </div>
    </MuiThemeProvider>
  );
}

Layout1Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setDefaultSettings: PropTypes.func.isRequired,
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  user: state.user,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, {
      setLayoutSettings,
      setDefaultSettings,
      logoutUser
    })(Layout1Sidenav)
  )
);
