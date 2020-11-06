import React, { Component } from "react";
import { Link } from 'react-router-dom'

class Brand extends Component {
  state = {};
  render() {
    return (
      <div className="flex flex-middle flex-space-between brand-area">
        <div className="flex flex-middle brand">
          <Link to="/">
            <img src="/assets/images/logo.png" alt="company-logo"/>
            <span className="brand__text">Stock Psychic</span>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default Brand;
