import { Button } from 'react-bootstrap' 
import './FavButton.css'

const FavButton = props => {
  return(
    <Button onClick={() => props.addToFavs(props.item_id)} className='fav-btn' variant='outline-danger'>&#9829;</Button>
  )
}

export default FavButton