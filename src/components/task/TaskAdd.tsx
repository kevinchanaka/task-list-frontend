import TaskAddForm from "components/forms/TaskAddForm";
import { CreateTaskReq } from "api/interfaces";
import { useHistory } from "react-router-dom";
import { useCreateTaskMutation } from "redux/api";

export default function TaskAdd() {
  const history = useHistory();
  const [createTask] = useCreateTaskMutation();

  async function handleCreateTask(task: CreateTaskReq) {
    const res = await createTask(task);
    if ("data" in res) {
      history.push("/");
    }
  }

  return (
    <>
      <h3>Add Task</h3>
      <TaskAddForm onSubmit={handleCreateTask} />
    </>
  );
}
