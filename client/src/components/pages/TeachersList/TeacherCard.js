import { Link } from 'react-router-dom'
import { Col, Card, Image, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'
import './Teacher-card.css'
import FavButton from '../../shared/FavButton/FavButton'

const TeacherCard = props => {

    const isTeacherFavBtn = true

    return (
        <Col sm={6} md={4} lg={3}>
            <motion.div
                key='teacher-card'
                whileHover={{
                    scale: 1.05,
                    boxShadow: '0px 0px 8px rgb(200, 200, 200)'
                }}
                whileTap={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 150, duration: 1.2 }}
            >
                <Card className="teacher-card">
                    <Link className="teacher-card-link d-flex justify-content-center" to={`/teachers/${props._id}`}>
                        <Card.Img className="teacher-card-header" variant="top" />
                        <Image className="teacher-card-img mt-4" roundedCircle src={props.imageUrl} alt={`${props.name} ${props.surname}`} />
                    </Link>
                    <Card.Body>
                        <Card.Title className="teacher-title mb-2">{props.name} {props.surname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted details">{props.jobOccupation}</Card.Subtitle>

                        <Card.Text></Card.Text>
                        <Row>
                            <Col className="d-flex align-items-center justify-content-between">
                                <Link className="btn btn-outline-secondary" to={`/teachers/${props._id}`}>View details</Link>
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
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </motion.div>
        </Col>
    )
}

export default TeacherCard

