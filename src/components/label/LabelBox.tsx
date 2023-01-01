interface LabelBoxProps {
  colour: string;
}

export default function LabelBox(props: LabelBoxProps) {
  const { colour } = props;
  const style = {
    display: "inline-block",
    color: colour,
  };
  return <i style={style} className="m-1 mr-2 bi bi-square-fill"></i>;
}
