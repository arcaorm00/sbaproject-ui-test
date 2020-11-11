import React, { Component, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import {
  Icon,
  IconButton,
  Badge,
  MenuItem,
  withStyles,
  MuiThemeProvider
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import { MatxMenu, MatxSearchBox } from "matx";
import { isMdScreen } from "utils";
import NotificationBar from "../SharedCompoents/NotificationBar";
import { Link } from "react-router-dom";
import EnterAdmin from "../SharedCompoents/EnterAdmin";

import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const styles = theme => ({
  root: {
    backgroundColor: theme.palette.primary.main
  }
});

class Layout1Topbar extends Component {
  state = {};

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout1Settings: {
        ...settings.layout1Settings,
        leftSidebar: {
          ...settings.layout1Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout1Settings } = settings;

    let mode;
    if (isMdScreen()) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    this.updateSidebarMode({ mode });
  };


  handleSignOut = () => {
    sessionStorage.removeItem("sessionMember")
    window.location.reload()
    this.props.logoutUser();
  };
  render() {
    let { theme, settings, className, style } = this.props;
    const topbarTheme =
      settings.themes[settings.layout1Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <div className="topbar">
          <div
            className={`topbar-hold ${className}`}
            style={Object.assign({}, { backgroundColor: topbarTheme.palette.primary.main }, style)}
          >
            <div className="flex flex-space-between flex-middle h-100">
              <div className="flex">
                <IconButton onClick={this.handleSidebarToggle} className="hide-on-lg">
                  <Icon>menu</Icon>
                </IconButton>

                <div className="hide-on-mobile">
                  <IconButton>
                    <Link className="flex flex-middle" to="/session/signin">
                      <Icon><VpnKeyRoundedIcon></VpnKeyRoundedIcon></Icon>
                      {/* 이 부분이 나중에 NASDAQ / KOSPI 넘나드는 버튼으로 바뀔 예정 */}
                    </Link>
                  </IconButton>

                  {/* <IconButton>
                    <Icon>web_asset</Icon>
                  </IconButton>

                  <IconButton>
                    <Icon>star_outline</Icon>
                  </IconButton> */}
                </div>
              </div>
              <div className="flex flex-middle">
                <MatxSearchBox />

                {/* <NotificationBar /> */}

                {this.props.isAuth == 'admin@stockpsychic.com'
                ?
                <EnterAdmin></EnterAdmin>
                :
                <></>
                }
                

                {this.props.isAuth !== null
                ?
                <MatxMenu
                  menuButton={
                    <img
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      src="/assets/images/stock_img.jpg"
                      alt="user"
                    />
                  }
                >
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link className="flex flex-middle" to="/">
                      <Icon> home </Icon>
                      <span className="pl-16"> Home </span>
                    </Link>
                  </MenuItem>
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link
                      className="flex flex-middle"
                      to="/session/mypage"
                    >
                      <Icon> person </Icon>
                      <span className="pl-16"> Profile </span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Link
                      className="flex flex-middle"
                      to="/session/accountsetting"
                    >
                      <Icon> settings </Icon>
                      <span className="pl-16"> Settings </span>
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleSignOut}
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> Logout </span>
                  </MenuItem>
                </MatxMenu>
                :
                <MatxMenu
                  menuButton={
                    <img
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      src="/assets/images/stock_img.jpg"
                      alt="member"
                    />
                  }
                >
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link className="flex flex-middle" to="/">
                      <Icon> home </Icon>
                      <span className="pl-16"> Home </span>
                    </Link>
                  </MenuItem>
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link
                      className="flex flex-middle"
                      to="/session/signup"
                    >
                      <Icon><CheckCircleIcon/></Icon>
                      <span className="pl-16"> Sign up </span>
                    </Link>
                  </MenuItem>
                  <MenuItem style={{ minWidth: 185 }}>
                    <Link className="flex flex-middle" to="/session/signin">
                      <Icon> <VpnKeyRoundedIcon/> </Icon>
                      <span className="pl-16"> Sign in </span>
                    </Link>
                  </MenuItem>
                </MatxMenu>
                }
                
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout1Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(mapStateToProps, { setLayoutSettings, logoutUser })(Layout1Topbar)
  )
);
