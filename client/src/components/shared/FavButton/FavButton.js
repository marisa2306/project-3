import { Button } from 'react-bootstrap'
import './FavButton.css'

const FavButton = props => {
  const favListCopy = [...props.userInfo.favorites]
  return (
    <>
      { favListCopy.some(elm => elm === props.itemInfo._id) ?
        // <Button onClick={() => props.updateFavs(props.itemInfo._id)} className='alreadyFav-btn'  ><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart_zpo3ko.png" /></Button>
        <img style={{ width: '25px', height: '25px' }} onClick={() => props.updateFavs(props.itemInfo._id)} className='alreadyFav-btn' src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart_zpo3ko.png" />
        // :
        :
        // <Button onClick={() => props.updateFavs(props.itemInfo._id)} className='' ><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart-outline_lrjilf.png" /></Button>
        <img style={{ width: '25px', height: '25px' }} onClick={() => props.updateFavs(props.itemInfo._id)} className='noFav-btn' src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart-outline_lrjilf.png" />

      }
    </>
  )
}

export default FavButton