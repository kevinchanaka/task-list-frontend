import { Label } from "api/interfaces";
import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

interface LabelEditButtonProps {
  label: Label;
  children?: ReactNode;
}

export default function LabelEditButton(props: LabelEditButtonProps) {
  const history = useHistory();
  const { label, children } = props;

  function editLabel() {
    const { id, name, colour } = label;
    history.push(`/edit-label/${id}`, {
      name,
      colour,
    });
  }

  let innerComponent: ReactNode = <i className="bi bi-pencil"></i>;

  if (children) {
    innerComponent = children;
  }

  return (
    <Button className="ml-1 mr-1" onClick={editLabel}>
      {innerComponent}
    </Button>
  );
}
