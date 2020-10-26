import React, { Component, useState } from "react";
import { connect, Provider } from "react-redux";
import { PropTypes } from "prop-types";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withStyles } from "@material-ui/core";
import Scrollbar from "react-perfect-scrollbar";
import { isMdScreen, classList } from "utils";
import { renderRoutes } from "react-router-config";
import Layout1Topbar from "./Layout1Topbar";
import Layout1Sidenav from "./Layout1Sidenav";
import Footer from "../SharedCompoents/Footer";
import AppContext from "app/appContext";

import { createStore, applyMiddleware, combineReducer } from 'redux'
import ReduxThunk from 'redux-thunk'


const styles = theme => {
  return {
    layout: {
      backgroundColor: theme.palette.background.default
    }
  };
};

const Layout1 = (props) => {

  const componentWillMount = () => {
    if (isMdScreen()) {
      updateSidebarMode({ mode: "close" });
    }
  }

  const componentWillUnmount = () => {
  }

  const updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = sidebarSettings;
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

  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("sessionMember"))

  let { settings, classes, theme } = props;

  let { layout1Settings } = settings;
  let layoutClasses = {
    [classes.layout]: true,
    [`${settings.activeLayout} sidenav-${layout1Settings.leftSidebar.mode} theme-${theme.palette.type} flex`]: true,
    "topbar-fixed": layout1Settings.topbar.fixed
  };
    return (
      <AppContext.Consumer>
        {({ routes }) => (
          <div className={classList(layoutClasses)}>
            {layout1Settings.leftSidebar.show && <Layout1Sidenav />}

            <div className="content-wrap position-relative">
              {layout1Settings.topbar.show && layout1Settings.topbar.fixed && (
                <Layout1Topbar className="elevation-z8" isAuth={loggedIn}/>
              )}

              {settings.perfectScrollbar && (
                <Scrollbar className="scrollable-content">
                  {layout1Settings.topbar.show &&
                    !layout1Settings.topbar.fixed && <Layout1Topbar style={{height: '80px'}} isAuth={loggedIn}/>}
                  <div className="content">{renderRoutes(routes)}</div>
                  <div className="my-auto" />
                  {settings.footer.show && !settings.footer.fixed && <Footer />}
                </Scrollbar>
              )}

              {!settings.perfectScrollbar && (
                <div className="scrollable-content">
                  {layout1Settings.topbar.show &&
                    !layout1Settings.topbar.fixed && <Layout1Topbar isAuth={loggedIn}/>}
                  <div className="content">{renderRoutes(routes)}</div>
                  <div className="my-auto" />
                  {settings.footer.show && !settings.footer.fixed && <Footer />}
                </div>
              )}

              {settings.footer.show && settings.footer.fixed && <Footer />}
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
}

Layout1.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { setLayoutSettings }
  )(Layout1)
);
