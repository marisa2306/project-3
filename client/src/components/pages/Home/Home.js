import { useState } from 'react'
import { motion } from 'framer-motion'
import CoursesService from '../../../service/courses.service'
import { Container, Row, Carousel } from 'react-bootstrap'
import './Home.css'
import CourseCard from './../../shared/CourseCard/Course-card'
import Loader from '../../shared/Spinner/Loader'

import Hero from './Hero'
import Features from './Features'
import Banner from './Banner'



const Home = props => {
  const coursesService = new CoursesService()

  const [courses, setCourses] = useState(() => {
    coursesService.getRandomCourses()
      .then(response => setCourses(response.data))
      .catch(() => {
        props.history.push('/courses')
        props.handleToast(true, 'An error has occurred, please try again later', 'red')
      })
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      
      <Hero title='Aspire for more' p1='Learning keeps you in the lead.' p2='Get in-demand skills to impress anyone.' />

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
                    <CourseCard key={elm._id} {...elm} />
                  )}
                </Row>
              </Carousel.Item>
              <Carousel.Item >
                <Row>
                  {[...courses].slice(4, 8).map(elm =>
                    <CourseCard key={elm._id} {...elm} />
                  )}
                </Row>
              </Carousel.Item>
            </Carousel>
            : <Loader />
          }

        </section>

        {/* Features */}
        <Features />

      </Container>
      
      <Banner title='Make the most of your online learning experience' text='Our teachers will help you learn while staying home.' />

    </motion.div>
  )
}

export default Home