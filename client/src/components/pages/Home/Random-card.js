import { Link } from 'react-router-dom'
import { Col, Card } from 'react-bootstrap'
import './Random-card.css'

const RandomCard = props => {
    return (
        <Col xs={{ span: 10, offset: 1 }} sm={{ span: 6, offset: 0 }} md={6} lg={3}>
            <Link className="random-card-link" to={`/courses/${props._id}`}>
                <Card className="random-card">
                    <Card.Img src={props.imageUrl} alt={props.title} />
                    <Card.ImgOverlay>
                        <Card.Title className="random-title">{props.title}</Card.Title>
                    </Card.ImgOverlay>
                </Card>
            </Link>
        </Col>
    )
}

export default RandomCard