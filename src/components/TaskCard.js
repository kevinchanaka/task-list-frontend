import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useHistory} from 'react-router-dom';

function TaskCard(props) {
  const history = useHistory();

  function handleClick(taskId) {
    history.push(`/tasks/${taskId}`);
  }

  return (
    <Col>
      <Card className="mt-3">
        <Card.Body>
          <b>Name: {props.task.name}</b><br />
        Description: {props.task.description}
          <Button className="float-right"
            onClick={() => handleClick(props.task.id)}>
            <i className="bi bi-info-circle"></i>
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default TaskCard;
