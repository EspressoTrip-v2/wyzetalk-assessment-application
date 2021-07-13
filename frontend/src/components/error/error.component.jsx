import { Button } from '@material-ui/core';
import logo from './error.png';
import './style.css';

const Error = (props) => {
  return (
    <div className="error-container">
      <img className="error-img" src={logo} alt="error" />
      <div className="btn-error">
        <Button
          onClick={() => props.history.push('/')}
          style={{
            backgroundColor: '#E81C46',
            color: '#fff',
            fontSize: '1vw',
            height: '2vw',
            width: '18vw',
            maxWidth: '18vw',
            position: 'relative',
            borderRadius: '1vw',
          }}
          variant="contained"
        >
          Return to home page
        </Button>
      </div>
    </div>
  );
};

export default Error;
