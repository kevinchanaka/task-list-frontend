import { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import { useDeleteTaskMutation } from "redux/api";
import { useHistory } from "react-router-dom";

interface TaskDeleteButtonProps {
  id: string;
  children?: ReactNode;
  redirect?: string;
}

export default function TaskDeleteButton(props: TaskDeleteButtonProps) {
  const [deleteTaskApi] = useDeleteTaskMutation();
  const history = useHistory();
  const { id, children, redirect } = props;

  async function deleteTask() {
    const res = await deleteTaskApi(id);
    if ("data" in res && redirect) {
      history.replace(redirect);
    }
  }

  let innerComponent: ReactNode = <i className="bi bi-trash"></i>;

  if (children) {
    innerComponent = children;
  }

  return (
    <Button className="ml-1 mr-1" variant="danger" onClick={deleteTask}>
      {innerComponent}
    </Button>
  );
}
