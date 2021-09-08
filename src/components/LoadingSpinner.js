import Spinner from 'react-bootstrap/Spinner';

const crossStyle = {
  fontSize: '2rem',
  display: 'inline',
};

function LoadingSpinner(props) {
  if (props.loaded == false) {
    return <Spinner animation="border" />;
  } else if (Object.keys(props.error).length != 0) {
    return <i className="bi bi-x-lg" style={crossStyle}></i>;
  } else {
    return (props.children);
  }
}

export default LoadingSpinner;
