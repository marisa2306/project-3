import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './Course-card.css'
import FavButton from '../../shared/FavButton/FavButton'
import Popup from '../Popup/Popup'
import DeleteMessage from '../Delete-message/DeleteMessage'

const CourseCard = props => {

    const [showModal, modalState] = useState(false)

    function handleModal(visible) { modalState(visible) }
    return (

        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 0 }} md={4} lg={3}>
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
                    <Card.Title className="course-title mb-2">{props.title.substring(0, 35)}...</Card.Title>
                    <Card.Text className="details  mb-2">{props.category} - {props.difficultyLevel} - {props.price} € - {props.duration} hrs.</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-around align-items-center">
                            {props.teacher && props.owner === props.teacher._id
                                ?
                                <>
                                    <Link to={`/profile-teacher/edit-course/${props._id}`} className="btn btn-info mr-2">Edit</Link>
                                    <Button onClick={() => handleModal(true)} className="btn btn-danger">Delete</Button>
                                </>
                                : null
                            }
                        </div>
                        <div>
                            {props.userInfo && <FavButton updateFavCourses={props.updateFavCourses} userInfo={props.userInfo} itemInfo={props} />}
                        </div>
                    </div>
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