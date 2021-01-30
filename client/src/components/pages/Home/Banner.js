import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'

const Banner = ({ title, text }) => {
  return (
    <section className="banner text-center mt-5 container-fluid">
      <Container>
        <Row>
          <Col>
            <h2>{title}</h2>
            <p>{text}</p>
            <Link className="btn btn-dark btn-lg mt-3" to="/courses">Explore Resources</Link>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Banner