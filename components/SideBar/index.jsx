import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import SideBarNav from '../SideBarNav';
import SideBarLinks from '../SideBarLinks';
import SideBarFooter from '../SideBarFooter';
import avatarPic from '../../pages/avatar.jpeg';

import './style.css';

class SiteSidebar extends Component {
  render() {
    const { location } = this.props;
    const isHome = location.pathname === prefixLink('/');

    const header = (
      <header>
        <Link style={{ textDecoration: 'none', borderBottom: 'none', outline: 'none' }} to={prefixLink('/')}>
          <img src={avatarPic} width="75" height="75" role="presentation" />
        </Link>
        { isHome ? (
          <h1>
            <Link style={{ textDecoration: 'none', borderBottom: 'none', color: 'inherit' }} to={prefixLink('/')}>
              { config.siteAuthor }
            </Link>
          </h1>
        ) :
          <h2>
            <Link style={{ textDecoration: 'none', borderBottom: 'none', color: 'inherit' }} to={prefixLink('/')}>
              { config.siteAuthor }
            </Link>
          </h2> }
        <p>
          { config.siteDescr }
        </p>
      </header>
  );

    return (
      <div className="sidebar">
        <div className="sidebar-inner">
          <div className="blog-details">
            <header>
              { header }
            </header>
          </div>
          <div className="blog-options">
            <SideBarNav {...this.props} />
            <footer>
              <SideBarLinks {...this.props} />
              <SideBarFooter />
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

SiteSidebar.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
};

export default SiteSidebar;
