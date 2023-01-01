import { useHistory, useParams } from "react-router-dom";
import LabelBox from "components/label/LabelBox";
import Button from "react-bootstrap/Button";
import { useGetLabelQuery, useDeleteLabelMutation } from "redux/api";
import Spinner from "react-bootstrap/Spinner";

export default function LabelInfo() {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { data, isLoading } = useGetLabelQuery(id);
  const [deleteLabel] = useDeleteLabelMutation();

  function handleEditClick() {
    if (data) {
      history.push(`/edit-label/${id}`, {
        name: data.label.name,
        colour: data.label.colour,
      });
    }
  }

  async function handleDeleteClick() {
    const res = await deleteLabel(id);
    if ("data" in res) {
      history.push("/labels");
    }
  }

  if (isLoading) return <Spinner animation="border" />;

  if (data) {
    return (
      <div className="ml-5 mr-5 mt-3">
        <h2>Label Information</h2>
        <p>
          <b>ID: </b>
          {data.label.id}
        </p>
        <p>
          <b>Name: </b>
          {data.label.name}
        </p>
        <b>Colour: </b>
        <LabelBox colour={data.label.colour} />
        <p></p>
        <p>
          <b>Created at: </b>
          {data.label.createdAt}
        </p>
        <p>
          <b>Updated at: </b>
          {data.label.updatedAt}
        </p>
        <Button className="mr-2" onClick={handleEditClick}>
          Edit Label
        </Button>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete Label
        </Button>
      </div>
    );
  }

  return <div></div>;
}
