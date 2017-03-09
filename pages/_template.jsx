import React, { Component, PropTypes } from 'react';

import '../static/css/reset.css';
import '../static/css/typography.css';
import '../static/css/base.css';

class Template extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="wrapper">
        { children }
      </div>
    );
  }
}

Template.propTypes = {
  children: PropTypes.any,
  location: PropTypes.object,
  route: PropTypes.object,
};

export default Template;
