import { Row } from 'react-bootstrap'
import FeaturesCard from './FeaturesCard'

const Features = () => {
  return (
    <section className="features text-center mt-5">
      <h2>Don't waste your valuable time or money</h2>
      <p className="mb-5">Only Freedemy has all the critical factors to deliver real results</p>
      <Row>
        <FeaturesCard
          imgSrc='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6pk4riNMII7w6COla8glF4/8c8655c3e7f185537eec5ee9ed118e83/EmployeableSkills__1_.svg'
          alt='Employeable skills icon'
          title='Get real employable skills'
          text='Our quality curriculum is designed with top-tier industry partners, not academics, so you learn the high-impact skills that top companies want.'
        />

        <FeaturesCard
          imgSrc='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/6oOXJEvILWWE2x4mUiRnwH/fc4d17a755c4e78b11bb24775458fcc2/ActiveLearning__1_.svg'
          alt='ActiveLearning icon'
          title='Project-based, active learning'
          text='Learn by doing with real-world projects and other hands-on exercises that lead to real skills mastery.'
        />
        
        <FeaturesCard
          imgSrc='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/1lUt0ObnFgoXsVtDTRaiIB/ba0d0f3d6e84f6f0740234ccb474ed28/Schedule__1_.svg'
          alt='Schedule icon'
          title='Learn on your schedule'
          text='Self-paced learning - whenever and wherever you want. Graduate while learning part-time for 10 hrs/week.'
        />
        
        <FeaturesCard
          imgSrc='//www.udacity.com/www-proxy/contentful/assets/2y9b3o528xhq/7mYegAlCmb6Zmh4fvWlAxK/e036c865aff3c5b1f9f816d08ab2a545/HelpYouNeed__1_.svg'
          alt='Help you need icon'
          title='Learn on your schedule'
          text='Self-paced learning - whenever and wherever you want. Graduate while learning part-time for 10 hrs/week.'
        />
        
      </Row>
    </section>
  )
}

export default Features