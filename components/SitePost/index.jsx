/* eslint-disable no-script-url */
import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line
import ReadNext from '../ReadNext';
import { on, off } from '../../utils/event';
import debounce from '../../utils/debounce';
import scrollTo from '../../utils/scrollTo';
import './style.css';
import '../../static/css/highlight.css';

class SitePost extends Component {

  constructor(props) {
    super(props);
    this.scrollHandler = debounce(this.handleScroll.bind(this), 300, false);
    this._isMounted = false;
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    on(window, 'scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    this._isMounted = false;
    off(window, 'scroll', this.scrollHandler);
  }

  handleScroll() {
    const scrollY = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    if (scrollY > 1000) {
      this.setState({ show: true });
    } else {
      this.setState({ show: false });
    }
  }

  render() {
    const { route } = this.props;
    const post = route.page.data;

    return (
      <div>
        {
          <div>
            <Link className="gohome" to={prefixLink('/')}> 所有文章</Link>
          </div>
        }
        <div className="blog-single">
          <div className="text">
            <h1>{ post.title }</h1>
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
            <div className="date-published">
              <em>
                {
                  post.editDate
                  ? `最后修改于 ${moment(post.editDate).format('YYYY/MM/DD HH:mm:ss')}`
                  : `发布于 ${moment(post.date).format('YYYY/MM/DD HH:mm:ss')}`
                }
              </em>
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
          {
            this.state.show && (
              <div>
                <button className="backTop" onClick={() => scrollTo(0, 1200)}> 返回顶部</button>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

SitePost.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SitePost;
