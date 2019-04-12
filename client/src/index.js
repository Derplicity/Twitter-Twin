import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faCaretDown,
  faHome,
  faSearch,
  faBell,
  faEnvelope,
  faHashtag,
  faTimes,
  faBolt,
  faShareSquare,
  faSpinner,
  faTimesCircle as fasTimesCircle,
  faPlay,
  faVolumeUp,
  faExpand,
  faPause,
  faVolumeMute,
  faRetweet,
  faCheckCircle,
  faHeart,
  faComment,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faReact } from '@fortawesome/free-brands-svg-icons';
import {
  faTimesCircle,
  faUser,
  faListAlt,
  faBookmark,
  faChartBar,
} from '@fortawesome/free-regular-svg-icons';

library.add(
  faCaretDown,
  faHome,
  faSearch,
  faBell,
  faEnvelope,
  faTwitter,
  faTimesCircle,
  faHashtag,
  faTimes,
  faBolt,
  faShareSquare,
  faReact,
  faUser,
  faListAlt,
  faBookmark,
  faChartBar,
  faSpinner,
  fasTimesCircle,
  faPlay,
  faVolumeUp,
  faExpand,
  faPause,
  faVolumeMute,
  faRetweet,
  faCheckCircle,
  faHeart,
  faComment,
  faUpload,
);

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
