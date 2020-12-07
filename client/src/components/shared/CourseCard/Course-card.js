import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import './Course-card.css'
import mine from './mine.ico'

const CourseCard = props => {
    return (
        <Col lg={4}>
            <Card className="course-card">
                <Card.Img variant="top" src={props.courseImg} alt={props.title} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">by {props.userInfo.name}{props.userInfo.surname}</Card.Subtitle> */}
                    <Card.Text>{props.category} | {props.difficultyLevel} | {props.priceRanges.max} {props.priceRanges.currency}  | {props.duration}{'h'}
                    </Card.Text>

                    <Link className="btn btn-dark btn-sm mr-5" to={`/courses/${props._id}`}>View details</Link>

                    {
                        props.teacher && props.owner === props.teacher._id
                            ?
                            <>
                                <Link to={`/courses/editCourse/${props._id}`} className="btn btn-info mr-3">Edit</Link>
                                <Link to={`/courses/deleteCourse/${props._id}`} className="btn btn-danger">Delete</Link>
                                <span><img src={mine} style={{ width: 20, height: 20 }} alt={props.title}/></span>
                            </>

                            : null
                    }

                </Card.Body>
            </Card>
        </Col>
    )
}

export default CourseCard