import TaskEditForm from "components/forms/TaskEditForm";
import { TaskHistory } from "api/interfaces";
import { useHistory, useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import {
  useUpdateTaskMutation,
  useAddLabelsMutation,
  useRemoveLabelsMutation,
  useGetLabelsQuery,
} from "redux/api";

interface Task {
  name: string;
  description: string;
  completed: boolean;
}

export default function TaskEdit() {
  const history = useHistory<TaskHistory>();
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetLabelsQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [addLabels] = useAddLabelsMutation();
  const [removeLabels] = useRemoveLabelsMutation();

  async function handleModifyTask(task: Task, labelsToAdd: string[], labelsToRemove: string[]) {
    const taskRes = await updateTask({ id, ...task });
    if ("error" in taskRes) {
      return;
    }

    if (labelsToAdd.length > 0) {
      await addLabels({ id, labels: labelsToAdd });
    }
    if (labelsToRemove.length > 0) {
      await removeLabels({ id, labels: labelsToRemove });
    }
    history.push("/");
  }

  let component = <></>;

  if (isLoading) {
    component = <Spinner animation="border" />;
  } else if (data) {
    component = (
      <TaskEditForm
        onSubmit={handleModifyTask}
        labels={data.labels}
        task={history.location.state ? { ...history.location.state } : undefined}
      />
    );
  }

  return (
    <div className="ml-5 mr-5 mt-3">
      <h3>Edit Task</h3>
      {component}
    </div>
  );
}
