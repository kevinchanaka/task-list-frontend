import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface LoadingSpinnerProps {
  loaded: boolean,
  error: string | undefined,
  children: React.ReactElement
}

const crossStyle = {
  fontSize: '2rem',
  display: 'inline',
};

function LoadingSpinner(props: LoadingSpinnerProps): JSX.Element {
  if (props.loaded == false) {
    return <Spinner animation="border" />;
  } else if (props.error && Object.keys(props.error).length != 0) {
    return <i className="bi bi-x-lg" style={crossStyle}></i>;
  } else {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
}

export default LoadingSpinner;
