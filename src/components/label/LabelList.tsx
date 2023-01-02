import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import LoadingSpinner from "components/common/LoadingSpinner";
import LabelCard from "components/label/LabelCard";
import { useGetLabelsQuery } from "redux/api";

export default function LabelList() {
  const { data, isLoading } = useGetLabelsQuery();
  let component = <></>;

  if (isLoading) component = <LoadingSpinner />;

  if (data) {
    component = (
      <>
        {data.labels.length > 0 ? (
          <Row xs={1} md={2} className="g-4">
            {data.labels.map((data) => {
              return <LabelCard key={data.id} label={data} />;
            })}
          </Row>
        ) : (
          <div>
            No labels have been added, click <Link to="/add-label">here</Link> to add a new label
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <h3>Labels</h3>
      {component}
    </>
  );
}
