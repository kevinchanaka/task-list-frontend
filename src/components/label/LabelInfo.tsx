import { useParams } from "react-router-dom";
import LabelBox from "components/label/LabelBox";
import { useGetLabelQuery } from "redux/api";
import LabelDeleteButton from "components/label/LabelDeleteButton";
import LabelEditButton from "components/label/LabelEditButton";
import LoadingSpinner from "components/common/LoadingSpinner";

export default function LabelInfo() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetLabelQuery(id);
  let component = <></>;

  if (isLoading) component = <LoadingSpinner />;

  if (data) {
    component = (
      <>
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
        <LabelEditButton label={data.label}>Edit Label</LabelEditButton>
        <LabelDeleteButton id={data.label.id} redirect="/labels">
          Delete Label
        </LabelDeleteButton>
      </>
    );
  }

  return (
    <>
      <h2>Label Information</h2>
      {component}
    </>
  );
}
