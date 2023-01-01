import { useHistory, useParams } from "react-router-dom";
import { TaskHistory } from "api/interfaces";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import LabelIconList from "components/label/LabelIconList";
import { useGetTaskQuery, useDeleteTaskMutation } from "redux/api";

export default function TaskInfo() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory<TaskHistory>();
  const { data, isLoading } = useGetTaskQuery(id);
  const [deleteTaskApi] = useDeleteTaskMutation();

  async function deleteTask() {
    const res = await deleteTaskApi(id);
    if ("data" in res) {
      history.push("/");
    }
  }

  async function editTask() {
    if (data) {
      const { id, name, description, completed, labels } = data.task;
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
  }

  let component = <></>;

  if (isLoading) {
    component = <Spinner animation="border" />;
  } else if (data) {
    component = (
      <>
        <p>
          <span className="font-weight-bold">ID: </span>
          {data.task.id}
        </p>
        <p>
          <span className="font-weight-bold">Name: </span>
          {data.task.name}
        </p>
        <p style={{ whiteSpace: "pre-wrap" }}>
          <span className="font-weight-bold">Description: </span>
          <br />
          {data.task.description}
        </p>
        <p>
          <span className="font-weight-bold">Completed: </span>
          {String(data.task.completed)}
        </p>
        <p>
          <span className="font-weight-bold">Created at: </span>
          {data.task.createdAt}
        </p>
        <p>
          <span className="font-weight-bold">Updated at: </span>
          {data.task.updatedAt}
        </p>
        <p>
          <span className="font-weight-bold">Labels: </span>
        </p>
        <LabelIconList labels={data.task.labels} />
        <br />
        <Button variant="primary" onClick={editTask} className="mr-2">
          Edit Task
        </Button>
        <Button variant="danger" onClick={deleteTask}>
          Delete Task
        </Button>
      </>
    );
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Task Information</h3>
      {component}
    </div>
  );
}
