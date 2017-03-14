import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import moment from 'moment';
import Helmet from 'react-helmet';
import access from 'safe-access';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import SideBar from '../components/SideBar';

class SiteIndex extends Component {

  render() {
    const { route } = this.props;
    const pageLinks = [];
        // Sort pages.
    const sortedPages = sortBy(route.pages, page => access(page, 'data.date')).reverse();

    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && access(page, 'data.layout') === 'post') {
        const title = access(page, 'data.title') || page.path;
        const description = access(page, 'data.description');
        const datePublished = access(page, 'data.date');
        const category = access(page, 'data.category');

        const dateTime = moment(datePublished).format('YYYY/MM/DD');

        pageLinks.push(
          <div className="blog-post" key={title}>
            <time dateTime={dateTime}>
              { dateTime }
            </time>
            <span style={{ padding: '5px' }} />
            <span className="blog-category">{ category }</span>
            <h2><Link style={{ borderBottom: 'none' }} to={prefixLink(page.path)} > { title } </Link></h2>
            <p dangerouslySetInnerHTML={{ __html: description }} />
            <Link className="readmore" to={prefixLink(page.path)}>阅读</Link>
          </div>,
        );
      }
    });

    return (
      <div>
        <Helmet title={config.siteTitle} />
        <SideBar {...this.props} />
        <div className="content">
          <div className="main">
            <div className="main-inner">
              { pageLinks }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SiteIndex.propTypes = {
  route: PropTypes.object,
};

export default SiteIndex;
