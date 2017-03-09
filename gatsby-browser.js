import ReactGA from 'react-ga';
import { config } from 'config'; // eslint-disable-line

ReactGA.initialize(config.googleAnalyticsId);

exports.onRouteUpdate = (state, page, pages) => { // eslint-disable-line no-unused-vars
  ReactGA.pageview(state.pathname);
};
