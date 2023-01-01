import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import TaskCard from "components/task/TaskCard";
import { useGetTasksQuery } from "redux/api";
import Spinner from "react-bootstrap/Spinner";

export default function TaskList() {
  const { data, isLoading } = useGetTasksQuery();

  if (isLoading) return <Spinner animation="border" />;

  if (data) {
    return (
      <div className="ml-5 mr-5 mt-3">
        <h3>Task List</h3>
        {data.tasks.length > 0 ? (
          <Row xs={1} md={2} className="g-4">
            {data.tasks.map((task) => {
              return <TaskCard key={task.id} task={task} />;
            })}
          </Row>
        ) : (
          <div>
            No tasks have been added, click <Link to="/add-task">here</Link> to add a new task
          </div>
        )}
      </div>
    );
  }

  return <div></div>;
}
