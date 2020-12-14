import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button } from 'react-bootstrap'
import './Course-card.css'
import mine from './mine.ico'
import FavButton from '../../shared/FavButton/FavButton'
import Popup from '../Popup/Popup'
import DeleteMessage from '../Delete-message/DeleteMessage'

const CourseCard = props => {

    const [ showModal, modalState ] = useState(false)
    
    function handleModal(visible) { modalState(visible) }

    return (
        <Col lg={4}>
            <Card className="course-card">
                <Card.Img variant="top" src={props.imageUrl} alt={props.title} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>

                    <Card.Text className="details"><strong>Category:</strong> {props.category} | <strong>Level:</strong> {props.difficultyLevel} </Card.Text>
                    <Card.Text><strong>Price:</strong> {props.price} € | <strong>Duration:</strong> {props.duration} h</Card.Text>

                    <Link className="btn btn-dark" to={`/courses/${props._id}`}>View more</Link>

                    {props.teacher && props.owner === props.teacher._id
                        ?
                        <>
                            <Link to={`/profile-teacher/edit-course/${ props._id }`} className="btn btn-info mx-2">Edit</Link>
                            <Button onClick={() => handleModal(true)} className="btn btn-danger">Delete</Button>
                            {/* <Button to={`/profile-teacher/delete-course/${props._id}`} onClick={() => props.deleteCourse(props._id)} className="btn btn-danger">Delete</Button> */}
                            {/* <span><img src={mine} style={{ width: 20, height: 20 }} alt={props.title} /></span> */}
                        </>
                        : null
                    }
                    {props.userInfo ?
                        <FavButton updateFavs={props.updateFavs} userInfo={props.userInfo} itemInfo={props} />
                        : null
                    }

                </Card.Body>
            </Card>

            <Popup show={showModal} handleModal={handleModal} color={'maroon'}>
                <DeleteMessage />
                <Row className='justify-content-center'>
                    <Col xs='auto'>
                        <Button variant='secondary' onClick={() => handleModal(false)}>Close</Button>
                    </Col>
                    <Col xs='auto'>
                        <Button variant='light' to={`/profile-teacher/delete-course/${props._id}`} onClick={() => props.deleteCourse(props._id)}>Delete</Button>
                    </Col>
                </Row>
            </Popup>
        </Col>
    )
}

export default CourseCard