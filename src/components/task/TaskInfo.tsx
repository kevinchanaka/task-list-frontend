import { useParams } from "react-router-dom";
import LoadingSpinner from "components/common/LoadingSpinner";
import LabelIconList from "components/label/LabelIconList";
import TaskDeleteButton from "components/task/TaskDeleteButton";
import TaskEditButton from "components/task/TaskEditButton";
import { useGetTaskQuery } from "redux/api";

export default function TaskInfo() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetTaskQuery(id);
  let component = <></>;

  if (isLoading) {
    component = <LoadingSpinner />;
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
        <TaskEditButton task={data.task}>Edit Task</TaskEditButton>
        <TaskDeleteButton id={id} redirect="/">
          Delete Task
        </TaskDeleteButton>
      </>
    );
  }

  return (
    <>
      <h3>Task Information</h3>
      {component}
    </>
  );
}
