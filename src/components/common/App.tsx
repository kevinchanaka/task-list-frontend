import NotificationBar from "components/common/NotificationBar";
import Header from "components/common/Header";
import AppRouter from "components/common/AppRouter";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Container
        fluid={true}
        className="d-flex justify-content-center"
        style={{ minHeight: "100vh", minWidth: "100vw" }}
      >
        <div style={{ minWidth: "100vw" }}>
          <Header />
          <NotificationBar />
          <div className="ml-5 mr-5 mt-3">
            <AppRouter />
          </div>
        </div>
      </Container>
    </Router>
  );
}
