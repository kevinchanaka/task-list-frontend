import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Label, CreateLabelReq } from "api/interfaces";
import LabelBox from "components/label/LabelBox";
import LabelEditButton from "components/label/LabelEditButton";
import LabelDeleteButton from "components/label/LabelDeleteButton";

interface LabelCardProps {
  label: Label;
}

export default function LabelCard(props: LabelCardProps): JSX.Element {
  const { label } = props;
  const history = useHistory<CreateLabelReq>();

  return (
    <Col>
      <Card className="mt-3">
        <Card.Body>
          <LabelBox colour={label.colour} />
          <b> {label.name}</b>
          <div className="float-right">
            <Button className="ml-1 mr-1" onClick={() => history.push(`/labels/${label.id}`)}>
              <i className="bi bi-info-circle"></i>
            </Button>
            <LabelEditButton label={label} />
            <LabelDeleteButton id={label.id} />
          </div>
          <p style={{ whiteSpace: "pre-line" }}></p>
        </Card.Body>
      </Card>
    </Col>
  );
}
