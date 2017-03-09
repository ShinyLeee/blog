import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import './style.css';

class SiteNav extends React.Component {
  render() {
    // const { location } = this.props;
    return (
      <nav className="blog-nav">
        <ul>
          <li>
            <Link to={prefixLink('/')} activeClassName="current" onlyActiveOnIndex> 文章
            </Link>
          </li>
          <li>
            <Link to={prefixLink('/about/')} activeClassName="current"> 关于我
            </Link>
          </li>
          <li>
            <Link to={prefixLink('/contact/')} activeClassName="current"> 联系我
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

SiteNav.propTypes = {
  location: React.PropTypes.object,
};

export default SiteNav;
