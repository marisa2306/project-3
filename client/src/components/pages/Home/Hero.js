import { Container } from 'react-bootstrap'

const Hero = ({ title, p1, p2 }) => {
  return (
    <section className="hero ">
        <Container fluid>
          <Container>
            <h1>{ title }</h1>
            <p className="mb-0"><em>{ p1 }</em></p>
            <p><em>{ p2 }</em></p>
          </Container>
        </Container>
      </section>
  )
}

export default Hero