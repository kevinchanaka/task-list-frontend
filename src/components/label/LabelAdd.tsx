import { CreateLabelReq } from "api/interfaces";
import { useHistory } from "react-router-dom";
import LabelForm from "components/forms/LabelForm";
import { useCreateLabelMutation } from "redux/api";

export default function LabelAdd() {
  const history = useHistory();
  const [createLabel] = useCreateLabelMutation();

  async function handleCreateLabel(label: CreateLabelReq) {
    const res = await createLabel(label);
    if ("data" in res) {
      history.push("/labels");
    }
  }

  return (
    <>
      <h3>Add Label</h3>
      <LabelForm onSubmit={handleCreateLabel} />
    </>
  );
}
