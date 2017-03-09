import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import SiteNav from '../SiteNav';
import SiteLinks from '../SiteLinks';
import SiteFooter from '../SiteFooter';
import './style.css';
import avatarPic from '../../pages/avatar.jpeg';

class SiteSidebar extends React.Component {
  render() {
    const { location } = this.props;
    const isHome = location.pathname === prefixLink('/');

    const header = (
      <header>
        <Link style={{ textDecoration: 'none', borderBottom: 'none', outline: 'none' }} to={prefixLink('/')}>
          <img src={prefixLink(avatarPic)} width="75" height="75" role="presentation" />
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
            <SiteNav {...this.props} />
            <footer>
              <SiteLinks {...this.props} />
              <SiteFooter />
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

SiteSidebar.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
};

export default SiteSidebar;
