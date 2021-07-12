import { Tooltip } from '@material-ui/core';
import logoA from './express.png';
import logoB from './mongo.png';
import './style.css';

const ServerLogo = (props) => {
  return props.serverType ? (
    <div className="server-logo-container">
      <Tooltip placement={'right-end'} title={'Source: Deezer API'}>
        <img src={logoA} alt="express" />
      </Tooltip>
    </div>
  ) : (
    <div className="server-logo-container">
      <Tooltip placement={'right-end'} title={'Source: MongoDB'}>
        <img src={logoB} alt="mongodb" />
      </Tooltip>
    </div>
  );
};

export default ServerLogo;
