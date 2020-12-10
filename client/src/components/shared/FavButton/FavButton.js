import { Button } from 'react-bootstrap' 
import './FavButton.css'

const FavButton = props => {
  const favListCopy = [...props.userInfo.favorites]
  return (
  <>
    { favListCopy.some(elm => elm == props.itemInfo._id) ? 
        <Button onClick={() => props.updateFavs(props.itemInfo._id)} className='alreadyFav-btn' variant='danger' >&#9829;</Button>
        :
        <Button onClick={() => props.updateFavs(props.itemInfo._id)} className='noFav-btn' variant='outline-danger' >&#9829;</Button>
      }
  </>
  )
}

export default FavButton