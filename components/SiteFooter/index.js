import React from 'react';

class SiteFooter extends React.Component {
  render() {
    return (
      <div className="blog-footer">
        <p style={{ fontSize: 12 }}>
          Powered by&nbsp;
          <a href="https://github.com/gatsbyjs/gatsby">Gatsby</a>
          &nbsp;with&nbsp;<a href="https://github.com/wpioneer/gatsby-starter-lumen">lumen</a> starter</p>
      </div>
    );
  }
}

export default SiteFooter;
