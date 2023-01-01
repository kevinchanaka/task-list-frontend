import Card from "react-bootstrap/Card";
import { CreateLabelReq } from "api/interfaces";
import LabelBox from "components/label/LabelBox";

interface LabelIconProps {
  label: CreateLabelReq;
}

export default function LabelIcon(props: LabelIconProps) {
  const { name, colour } = props.label;
  return (
    <Card style={{ width: "fit-content" }}>
      <div>
        <span className="m-1 ml-2">{name}</span>
        <LabelBox colour={colour} />
      </div>
    </Card>
  );
}
