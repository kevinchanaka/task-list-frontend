import TaskEditForm from "components/forms/TaskEditForm";
import { TaskHistory } from "api/interfaces";
import { useHistory, useParams } from "react-router-dom";
import LoadingSpinner from "components/common/LoadingSpinner";
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
  let component = <></>;

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

  if (isLoading) {
    component = <LoadingSpinner />;
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
    <>
      <h3>Edit Task</h3>
      {component}
    </>
  );
}
