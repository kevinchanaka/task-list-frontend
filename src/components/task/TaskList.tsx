import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import TaskCard from "components/task/TaskCard";
import { useGetTasksQuery } from "redux/api";
import LoadingSpinner from "components/common/LoadingSpinner";

export default function TaskList() {
  const { data, isLoading } = useGetTasksQuery();
  let component = <></>;

  if (isLoading) component = <LoadingSpinner />;

  if (data) {
    component = (
      <>
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
      </>
    );
  }

  return (
    <>
      <h3>Task List</h3>
      {component}
    </>
  );
}
