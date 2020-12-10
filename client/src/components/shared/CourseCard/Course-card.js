import { Link } from 'react-router-dom'
import { Col, Card, Button } from 'react-bootstrap'
import './Course-card.css'
import mine from './mine.ico'
import FavButton from '../../shared/FavButton/FavButton'

const CourseCard = props => {
    return (
        <Col lg={4}>
            <Card className="course-card">
                <Card.Img variant="top" src={props.imageUrl} alt={props.title} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    {props.owner ? <Card.Subtitle className="mb-2 text-muted">by {props.owner.name} {props.owner.surname}</Card.Subtitle> : null}

                    <Card.Text>{props.category} | {props.difficultyLevel} | {props.price} € | {props.duration} h </Card.Text>

                    <Link className="btn btn-dark btn-sm mr-5" to={`/courses/${props._id}`}>View details</Link>

                    {props.teacher && props.owner === props.teacher._id
                        ?
                        <>

                            <Link to={`/profile-teacher/edit-course/${props._id}`} className="btn btn-info mr-3">Edit</Link>
                            <Button to={`/profile-teacher/delete-course/${props._id}`} onClick={() => props.deleteCourse(props._id)} className="btn btn-danger">Delete</Button>
                            <span><img src={mine} style={{ width: 20, height: 20 }} alt={props.title} /></span>
                        </>

                        : null
                    }
                    {props.userInfo ? 
                        <FavButton addToFavs={props.addToFavs} item_id={props._id} />
                        : null
                    }
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CourseCard