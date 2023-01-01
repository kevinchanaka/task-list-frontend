import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Label, CreateLabelReq } from "api/interfaces";
import LabelBox from "components/label/LabelBox";
import { useDeleteLabelMutation } from "redux/api";

interface LabelCardProps {
  label: Label;
}

export default function LabelCard(props: LabelCardProps): JSX.Element {
  const { label } = props;
  const history = useHistory<CreateLabelReq>();
  const [deleted, setDeleted] = useState(false);
  const [deleteLabel] = useDeleteLabelMutation();

  function handleInfoClick() {
    history.push(`/labels/${label.id}`);
  }

  function handleEditClick() {
    history.push(`/edit-label/${label.id}`, {
      name: label.name,
      colour: label.colour,
    });
  }

  async function handleDeleteClick() {
    const res = await deleteLabel(label.id);
    if ("data" in res) {
      setDeleted(true);
    }
  }

  return (
    <Col>
      {!deleted && (
        <Card className="mt-3">
          <Card.Body>
            <LabelBox colour={label.colour} />
            <b> {label.name}</b>
            <div className="float-right">
              <Button className="ml-1 mr-1" onClick={handleInfoClick}>
                <i className="bi bi-info-circle"></i>
              </Button>
              <Button className="ml-1 mr-1" onClick={handleEditClick}>
                <i className="bi bi-pencil"></i>
              </Button>
              <Button className="ml-1 mr-1" onClick={handleDeleteClick} variant="danger">
                <i className="bi bi-trash"></i>
              </Button>
            </div>
            <p style={{ whiteSpace: "pre-line" }}></p>
          </Card.Body>
        </Card>
      )}
    </Col>
  );
}
