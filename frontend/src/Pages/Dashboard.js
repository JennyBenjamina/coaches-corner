import Videos from "../Components/Videos";
import InputFiles from "../Components/InputFiles";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <h1>Student's Dashboard</h1>
      <InputFiles />
      <br />
      <Videos />
    </Container>
  );
};

export default Dashboard;
