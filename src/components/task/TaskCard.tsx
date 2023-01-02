import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import TaskDeleteButton from "components/task/TaskDeleteButton";
import TaskEditButton from "components/task/TaskEditButton";
import { useHistory } from "react-router-dom";
import { Task, TaskHistory } from "api/interfaces";
import LabelIconList from "components/label/LabelIconList";

interface TaskCardProps {
  task: Task;
}

export default function TaskCard(props: TaskCardProps) {
  const history = useHistory<TaskHistory>();

  return (
    <Col>
      <Card className="mt-3">
        <Card.Body>
          <b>{props.task.name}</b>
          <div className="float-right">
            <Button className="ml-1 mr-1" onClick={() => history.push(`tasks/${props.task.id}`)}>
              <i className="bi bi-info-circle"></i>
            </Button>
            <TaskEditButton task={props.task} />
            <TaskDeleteButton id={props.task.id} />
          </div>
          <p style={{ whiteSpace: "pre-line" }}>{props.task.description}</p>
          <LabelIconList labels={props.task.labels} />
        </Card.Body>
      </Card>
    </Col>
  );
}
