import logo from './d-logo.png';
import './style.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner">
        <div className="spinner-inside">
          <div className="progress">
            <img src={logo} style={{ width: '5vw', borderRadius: '50%' }} alt="small logo" />
          </div>
        </div>
        <div className="spinner-sector spinner-color-a"></div>
        <div className="spinner-sector spinner-color-b"></div>
        <div className="spinner-sector spinner-color-c"></div>
      </div>
    </div>
  );
};

export default Loader;
