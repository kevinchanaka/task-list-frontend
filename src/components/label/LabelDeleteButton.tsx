import { ReactNode } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDeleteLabelMutation } from "redux/api";

interface LabelDeleteButtonProps {
  id: string;
  children?: ReactNode;
  redirect?: string;
}

export default function LabelDeleteButton(props: LabelDeleteButtonProps) {
  const [deleteLabelApi] = useDeleteLabelMutation();
  const history = useHistory();
  const { id, children, redirect } = props;

  async function deleteLabel() {
    const res = await deleteLabelApi(id);
    if ("data" in res && redirect) {
      history.replace(redirect);
    }
  }

  let innerComponent: ReactNode = <i className="bi bi-trash"></i>;

  if (children) {
    innerComponent = children;
  }

  return (
    <Button className="ml-1 mr-1" onClick={deleteLabel} variant="danger">
      {innerComponent}
    </Button>
  );
}
