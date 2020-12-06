import { Container } from 'react-bootstrap'

const UserProfile = ({ loggedUser }) => {
  return (
    <Container>
      <h1>Welcome back, { loggedUser.username } !</h1>
    </Container>
  )
}

export default UserProfile