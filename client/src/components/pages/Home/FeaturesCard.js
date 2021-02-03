import { Card } from 'react-bootstrap'

const FeaturesCard = ({ imgSrc, alt, title, text }) => {
  return (

    <Card className="home-card">
      <Card.Img variant="top" src={imgSrc} alt={alt} style={{ height: '40px' }} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="features-text">{text}</Card.Text>
      </Card.Body>
    </Card>

  )
}

export default FeaturesCard