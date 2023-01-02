import LabelForm from "components/forms/LabelForm";
import { useHistory, useParams } from "react-router-dom";
import { CreateLabelReq } from "api/interfaces";
import { useUpdateLabelMutation } from "redux/api";

export default function LabelEdit() {
  const history = useHistory<CreateLabelReq>();
  const { id } = useParams<{ id: string }>();
  const [updateLabel] = useUpdateLabelMutation();

  async function handleLabelSubmit(label: CreateLabelReq) {
    const res = await updateLabel({ id: id, ...label });
    if ("data" in res) {
      history.push("/labels");
    }
  }

  return (
    <>
      <h3>Edit Label</h3>
      <LabelForm
        onSubmit={handleLabelSubmit}
        label={history.location.state ? { ...history.location.state } : undefined}
      />
    </>
  );
}
