import React, { PropTypes } from 'react';
import SideBar from '../SideBar';
import './style.css';

const SitePage = (props) => {
  const post = props.route.page.data;
  return (
    <div>
      <SideBar {...props} />
      <div className="content">
        <div className="main">
          <div className="main-inner">
            <div className="blog-page">
              <div className="text">
                <h1>{ post.title }</h1>
                <div dangerouslySetInnerHTML={{ __html: post.body }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

SitePage.propTypes = {
  route: PropTypes.object.isRequired,
};

export default SitePage;
