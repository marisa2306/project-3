import { Col, Card } from 'react-bootstrap'

const FeaturesCard = ({ imgSrc, alt, title, text}) => {
  return (
    <Col lg={3}>
      <Card className="home-card">
        <Card.Img variant="top" src={imgSrc} alt={ alt } />
        <Card.Body>
          <Card.Title>{ title }</Card.Title>
          <Card.Text className="features-text">{ text }</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default FeaturesCard