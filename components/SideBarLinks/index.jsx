import React from 'react';
import { config } from 'config'; // eslint-disable-line
import './style.css';
import '../../static/fonts/fontawesome/style.css';

const SiteLinks = () => (
  <div className="blog-links">
    <ul>
      {config.siteTwitterUrl && (
        <li>
          <a href={config.siteTwitterUrl}>
            <i className="fa fa-twitter" />
          </a>
        </li>
      )}
      {config.siteGithubUrl && (
        <li>
          <a href={config.siteGithubUrl}>
            <i className="fa fa-github-alt" />
          </a>
        </li>
      )}
      {config.siteEmailUrl && (
        <li>
          <a href={`mailto:${config.siteEmailUrl}`}>
            <i className="fa fa-envelope-o" />
          </a>
        </li>
      )}
    </ul>
  </div>
);

export default SiteLinks;
