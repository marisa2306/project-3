import { Container } from 'react-bootstrap'

const TeacherProfile = ({ loggedUser }) => {
  return (
    <Container>
      <h1>Welcome back teacher, { loggedUser.username } !</h1>
    </Container>
  )
}

export default TeacherProfile