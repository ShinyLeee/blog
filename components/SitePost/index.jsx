import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import ReadNext from '../ReadNext';
import './style.css';
import '../../static/css/highlight.css';

class SitePost extends Component {
  render() {
    const { route } = this.props;
    const post = route.page.data;
    const home = (
      <div>
        <Link className="gohome" to={prefixLink('/')}> 所有文章</Link>
      </div>
    );

    return (
      <div>
        { home }
        <div className="blog-single">
          <div className="text">
            <h1>{ post.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className="date-published">
              <em>{ moment(post.date).format('YYYY/MM/DD') }</em>
            </div>
          </div>
          <div className="footer">
            <ReadNext post={post} {...this.props} />
            <hr />
            <p>
              { config.siteDescr }
              <a href={config.siteTwitterUrl}>
                <br /> <strong>{ config.siteAuthor }</strong> on Twitter</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SitePost.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SitePost;
