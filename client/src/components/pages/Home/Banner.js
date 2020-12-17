import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'

const Banner = ({ title, text }) => {
  return (
    <section className="banner text-center mt-5">
      <Container fluid>
        <Container>
          <h2>{title}</h2>
          <p>{text}</p>
          <Link className="btn btn-dark btn-lg mt-3" to="/courses">Explore Resources</Link>
        </Container>
      </Container>
    </section>
  )
}

export default Banner