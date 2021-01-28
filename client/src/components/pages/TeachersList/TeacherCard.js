import { Link } from 'react-router-dom'
import { Col, Card, Image, Row } from 'react-bootstrap'
import { motion } from 'framer-motion'
import './Teacher-card.css'
import FavButton from '../../shared/FavButton/FavButton'

const TeacherCard = props => {

    const isTeacherFavBtn = true

    return (
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 0 }} md={4} lg={3}>
            <Card className="teacher-card">
                <motion.div
                    key='teacher-card'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 150, duration: 1.2 }}
                >
                    <Link className="teacher-card-link d-flex justify-content-center" to={`/teachers/${props._id}`}>
                        <Image className="teacher-card-img mt-4" roundedCircle src={props.imageUrl} alt={`${props.name} ${props.surname}`} />
                    </Link>
                </motion.div>

                <Card.Body>
                    <Card.Title className="teacher-title mb-2">{props.name} {props.surname}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted details">{props.jobOccupation.substring(0, 25)}...</Card.Subtitle>

                    <Card.Text></Card.Text>
                    <Row>
                        <Col className="d-flex align-items-center justify-content-between">
                            <Link className="btn btn-outline-secondary teacher-view-more" to={`/teachers/${props._id}`}>View details</Link>
                            {props.userInfo &&
                                <FavButton isTeacherFavBtn={isTeacherFavBtn} updateFavTeachers={props.updateFavTeachers} userInfo={props.userInfo} teacher={props.teacherInfo} itemInfo={props} />}
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default TeacherCard

