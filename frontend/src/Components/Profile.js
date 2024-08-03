import StudentRegistrationForm from "./StudentRegistrationForm";
import { Container } from "react-bootstrap";

const Profile = () => {
  return (
    <Container>
      <h2 className="student-profile mb-5 mt-5">Student Profile</h2>
      <hr />
      <StudentRegistrationForm />
    </Container>
  );
};

export default Profile;
