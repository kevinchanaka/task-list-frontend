import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Task, TaskHistory } from "api/interfaces";
import LabelIconList from "components/label/LabelIconList";
import { useDeleteTaskMutation } from "redux/api";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard(props: TaskCardProps) {
  const history = useHistory<TaskHistory>();
  const [deleted, setDeleted] = useState(false);
  const [deleteTaskApi] = useDeleteTaskMutation();

  // TODO: should centralise logic to manage tasks
  // e.g. react custom hooks?
  function handleInfoClick(taskId: string) {
    history.push(`tasks/${taskId}`);
  }

  function handleEditClick(task: Task) {
    const { id, name, description, completed, labels } = task;
    history.push({
      pathname: `/edit-task/${id}`,
      state: {
        name: name,
        description: description,
        completed: completed,
        labels: labels,
      },
    });
  }

  async function deleteTask(taskId: string) {
    const res = await deleteTaskApi(taskId);
    if ("data" in res) {
      setDeleted(true);
    }
  }

  if (deleted) {
    return <></>;
  }

  return (
    <Col>
      <Card className="mt-3">
        <Card.Body>
          <b>{props.task.name}</b>
          <div className="float-right">
            <Button className="ml-1 mr-1" onClick={() => handleInfoClick(props.task.id)}>
              <i className="bi bi-info-circle"></i>
            </Button>
            <Button className="ml-1 mr-1" onClick={() => handleEditClick(props.task)}>
              <i className="bi bi-pencil"></i>
            </Button>
            <Button
              className="ml-1 mr-1"
              variant="danger"
              onClick={async () => await deleteTask(props.task.id)}
            >
              <i className="bi bi-trash"></i>
            </Button>
          </div>
          <p style={{ whiteSpace: "pre-line" }}>{props.task.description}</p>
          <LabelIconList labels={props.task.labels} />
        </Card.Body>
      </Card>
    </Col>
  );
}
