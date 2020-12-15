import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import './Teacher-card.css'
import FavButton from '../../shared/FavButton/FavButton'


const TeacherCard = props => {

    const isTeacherFavBtn = true

    return (
        <Col lg={4}>
            <Card className="teacher-card">
                <Card.Img variant="top" src={props.imageUrl} alt={`${props.name} ${props.surname}`} />
                <Card.Body>
                    <Card.Title>{props.name} {props.surname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{props.jobOccupation}</Card.Subtitle>

                    <Card.Text></Card.Text>

                    <Link className="btn btn-dark" to={`/teachers/${ props._id }`}>View details</Link>
                    
                    {props.userInfo ? 
                        <FavButton isTeacherFavBtn={isTeacherFavBtn} updateFavTeachers={props.updateFavTeachers} userInfo={props.userInfo} teacher={props.teacherInfo} itemInfo={props} />
                        : null
                    }

                    {/* { props.userInfo && props.user === props.userInfo._id
                            ?
                            <>
                                <Link to={`/teachers/editTeacher/${props._id}`} className="btn btn-info mr-3">Edit</Link>
                                <Link to={`/teachers/deleteTeacher/${props._id}`} className="btn btn-danger">Delete</Link>
                            </>
                            : null
                    } */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TeacherCard