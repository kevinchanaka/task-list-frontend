import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import LabelCard from "components/label/LabelCard";
import { useGetLabelsQuery } from "redux/api";

export default function LabelList() {
  const { data, isLoading, error } = useGetLabelsQuery();

  if (isLoading) return <Spinner animation="border" />;

  if (error) return <div>{error.message}</div>;

  if (data) {
    return (
      <div className="ml-5 mr-5 mt-3">
        <h3>Labels</h3>
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
      </div>
    );
  }

  return <div></div>;
}
