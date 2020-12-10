import { Link } from 'react-router-dom'
import './FavButton.css'
import heart from './heart.png'

const FavButton = props => {
  return(
    <Link className='fav-btn'>&#9829;</Link>
  )
}

export default FavButton