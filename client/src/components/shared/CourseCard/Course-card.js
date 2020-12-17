import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './Course-card.css'
// import mine from './mine.ico'
import FavButton from '../../shared/FavButton/FavButton'
import Popup from '../Popup/Popup'
import DeleteMessage from '../Delete-message/DeleteMessage'

const CourseCard = props => {

    const [showModal, modalState] = useState(false)

    function handleModal(visible) { modalState(visible) }
    return (

        <Col sm={6} md={4} lg={3} >
            <Card className="course-card">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 150, duration: 1.2 }}
                >
                    <Link className="course-card-link" to={`/courses/${props._id}`}>
                        <Card.Img variant="top" src={props.imageUrl} alt={props.title} />
                    </Link>
                </motion.div>
                <Card.Body>
                    <Card.Title className="course-title mb-2">{props.title}</Card.Title>
                    <Card.Text className="details  mb-2">{props.category} - {props.difficultyLevel} - {props.price} € - {props.duration} hrs.</Card.Text>
                    <Row as='div' className="d-flex justify-content-around align-items-center">
                        <Col md={8} as='div' className="d-flex justify-content-between">
                            {props.teacher && props.owner === props.teacher._id
                                ?
                                <>
                                    <Link to={`/profile-teacher/edit-course/${props._id}`} className="btn btn-info mx-2">Edit</Link>
                                    <Button onClick={() => handleModal(true)} className="btn btn-danger">Delete</Button>
                                    {/* <Button to={`/profile-teacher/delete-course/${props._id}`} onClick={() => props.deleteCourse(props._id)} className="btn btn-danger">Delete</Button> */}
                                    {/* <span><img src={mine} style={{ width: 20, height: 20 }} alt={props.title} /></span> */}
                                </>
                                : null
                            }
                        </Col>
                        <Col md={{ span: 3, offset: 1 }} >
                            {props.userInfo ?
                                <FavButton updateFavCourses={props.updateFavCourses} userInfo={props.userInfo} itemInfo={props} />
                                : null
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            <Popup show={showModal} handleModal={handleModal} color={'#f8d7da'}>
                <DeleteMessage />
                <Row className='justify-content-center'>
                    <Col xs='auto'>
                        <Button variant='secondary' onClick={() => handleModal(false)}>Close</Button>
                    </Col>
                    <Col xs='auto'>
                        <Button variant='danger' onClick={() => props.deleteCourse(props._id)}>Delete</Button>
                    </Col>
                </Row>
            </Popup>
        </Col>
    )
}

export default CourseCard