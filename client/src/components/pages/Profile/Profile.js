import { Containe, Container } from 'react-bootstrap'

const Profile = ({ loggedUser }) => {
  return (
    <Container>
      <h1>Welcome back, { loggedUser.username } !</h1>
    </Container>
  )
}

export default Profile