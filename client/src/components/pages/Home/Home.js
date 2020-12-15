import { useState } from 'react'
import CoursesService from '../../../service/courses.service'
import { Container, Card, Col, Row, Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Home.css'
import CourseCard from './../../shared/CourseCard/Course-card'
import Loader from '../../shared/Spinner/Loader'



const Home = props => {
  const coursesService = new CoursesService

  const [courses, setCourses] = useState(() => {
    coursesService.getRandomCourses()
      .then(response => setCourses(response.data))
      .catch(() => {
        props.history.push('/courses')
        props.handleToast(true, 'An error has occurred, please try again later', 'red')
      })
  })

  return (
    <>
      {/* Hero */}
      <section className="hero ">
        <Container fluid>
          <Container>
            <h1>Aspire for more</h1>
            <p className="mb-0"><em>Learning keeps you in the lead.</em></p>
            <p><em>Get in-demand skills to impress anyone.</em></p>
          </Container>
        </Container>
      </section>

      {/* Carousel */}
      <Container>
        <section className="carousel-section mt-5">
          <h2 className="mt-5 mb-5 text-center ">Explore our schools to find your perfect program</h2>
          {/* {courses ? 
            <Carousel className='carousel'>
              {courses.map(elm => 
                <Carousel.Item key={elm._id}>
                  <img
                    src={elm.imageUrl}
                    alt={elm.title}
                  />
                  <Carousel.Caption>
                    <h3>{ elm.title }</h3>
                    <p>{elm.lead}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              )}
            </Carousel>
            :
            <Loader />} */}

          {courses ?
            <Carousel className='carousel'>

              <Carousel.Item >
                <Row>
                  {[...courses].slice(0, 4).map(elm =>
                    //console.log([...courses])
                    < CourseCard key={elm._id} {...elm} />
                  )}
                </Row>
              </Carousel.Item>
              <Carousel.Item >
                <Row>
                  {[...courses].slice(4, 8).map(elm =>
                    //console.log([...courses])
                    < CourseCard key={elm._id} {...elm} />
                  )}
                </Row>
              </Carousel.Item>
            </Carousel>
            : <Loader />
          }

        </section>

        {/* Features */}
        <section className="features text-center mt-5">
          <h2>Don't waste your valuable time or money</h2>
          <p className="mb-5">Only Freedemy has all the critical factors to deliver real results</p>
          <Row>
            <Col lg={3}>
              <Card className="home-card">
                <Card.Img variant="top" src='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6pk4riNMII7w6COla8glF4/8c8655c3e7f185537eec5ee9ed118e83/EmployeableSkills__1_.svg' alt='' />
                <Card.Body>
                  <Card.Title>Get real employable skills</Card.Title>
                  <Card.Text className="features-text">Our quality curriculum is designed with top-tier industry partners, not academics, so you learn the high-impact skills that top companies want.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="home-card">
                <Card.Img variant="top" src='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6oOXJEvILWWE2x4mUiRnwH/fc4d17a755c4e78b11bb24775458fcc2/ActiveLearning__1_.svg' alt='' />
                <Card.Body>
                  <Card.Title>Project-based, active learning</Card.Title>
                  <Card.Text className="features-text">Learn by doing with real-world projects and other hands-on exercises that lead to real skills mastery.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="home-card">
                <Card.Img variant="top" src='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/1lUt0ObnFgoXsVtDTRaiIB/ba0d0f3d6e84f6f0740234ccb474ed28/Schedule__1_.svg' alt='' />
                <Card.Body>
                  <Card.Title>Learn on your schedule</Card.Title>
                  <Card.Text className="features-text">Self-paced learning - whenever and wherever you want. Graduate while learning part-time for 10 hrs/week.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={3}>
              <Card className="home-card">
                <Card.Img className="icon" variant="top" src='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/7mYegAlCmb6Zmh4fvWlAxK/e036c865aff3c5b1f9f816d08ab2a545/HelpYouNeed__1_.svg' alt='' />
                <Card.Body>
                  <Card.Title>Learn on your schedule</Card.Title>
                  <Card.Text className="features-text">Self-paced learning - whenever and wherever you want. Graduate while learning part-time for 10 hrs/week.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </section>
      </Container>

      {/* Banner */}
      <section className="banner text-center mt-5">
        <Container fluid>
          <Container>
            <h2>Make the most of your online learning experience</h2>
            <p>Our teachers will help you learn while staying home.</p>
            <Link className="btn btn-dark btn-lg mt-3" to="/teachers">Explore Resources</Link>
          </Container>
        </Container>
      </section>

      {/* Footer */}
      <footer className="page-footer mt-5">
        <p className="text-center py-3">Developed by <a href="https://github.com/Joseacasado" target="_blank"> Jose A. Casado</a> and <a href="https://github.com/marisa2306" target="_blank">Marisa Vitale</a> within <strong> Ironack </strong>Web Development
      Bootcamp</p>
      </footer>

    </>
  )
}

export default Home