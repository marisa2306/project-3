import { Image } from 'react-bootstrap'
import './FavButton.css'

const FavButton = props => {
  const favCoursesCopy = [...props.userInfo.favCourses]
  const favTeachersCopy = [...props.userInfo.favTeachers]

  return (
    <>

      {props.isTeacherFavBtn ?
        favTeachersCopy.some(elm => elm === props.itemInfo._id) ?
          <Image style={{ width: '25px', height: '25px' }} onClick={() => props.updateFavTeachers(props.itemInfo._id)} className='alreadyFav-btn' src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart_zpo3ko.png" />
          :
          <Image style={{ width: '25px', height: '25px' }} onClick={() => props.updateFavTeachers(props.itemInfo._id)} className='noFav-btn' src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart-outline_lrjilf.png" />

        :
        favCoursesCopy.some(elm => elm === props.itemInfo._id) ?
          <Image style={{ width: '25px', height: '25px' }} onClick={() => props.updateFavCourses(props.itemInfo._id)} className='alreadyFav-btn' src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart_zpo3ko.png" />
          :
          <Image style={{ width: '25px', height: '25px' }} onClick={() => props.updateFavCourses(props.itemInfo._id)} className='noFav-btn' src="https://res.cloudinary.com/dodneiokm/image/upload/v1607984276/project3-ironhack/heart-outline_lrjilf.png" />
      }
    </>
  )
}

export default FavButton