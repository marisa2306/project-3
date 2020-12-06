import { Col, Card } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const TeacherCard = (props) => {
    console.log(props)
    return (
        <Col lg={6}>
            <Card className="course-card">
                <Card.Body>
                    <Card.Title>{props.teacherInfo.jobOccupation}</Card.Title>
                    <Card.Text></Card.Text>
                </Card.Body>
                <Link to='/teacher-profile' className="btn btn-success" >View more</Link>
            </Card>

        </Col>
    )
}

export default TeacherCard