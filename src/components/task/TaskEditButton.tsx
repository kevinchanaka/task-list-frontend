import { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { Task } from "api/interfaces";

interface TaskEditButtonProps {
  task: Task;
  children?: ReactNode;
}

export default function TaskEditButton(props: TaskEditButtonProps) {
  const history = useHistory();
  const { task, children } = props;

  function editTask() {
    const { id, name, description, completed, labels } = task;
    history.push({
      pathname: `/edit-task/${id}`,
      state: {
        name,
        description,
        completed,
        labels,
      },
    });
  }

  let innerComponent: ReactNode = <i className="bi bi-pencil"></i>;

  if (children) {
    innerComponent = children;
  }

  return (
    <Button className="ml-1 mr-1" onClick={editTask}>
      {innerComponent}
    </Button>
  );
}
