interface LabelBoxProps {
    colour: string
}

function LabelBox(props: LabelBoxProps): JSX.Element {
  const {colour} = props;
  const style = {
    display: 'inline-block',
    color: colour,
  };
  return (<i style={style} className="m-1 mr-2 bi bi-square-fill"></i>);
}

export default LabelBox;
