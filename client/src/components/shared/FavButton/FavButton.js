import { Button } from 'react-bootstrap' 
import './FavButton.css'

const FavButton = props => {
  const favCoursesCopy = [...props.userInfo.favCourses]
  const favTeachersCopy = [ ...props.userInfo.favTeachers ]

  return (
    <>
      {props.isTeacherFavBtn ? 
        favTeachersCopy.some(elm => elm === props.itemInfo._id) ? 
        <Button onClick={() => props.updateFavTeachers(props.itemInfo._id)} className='alreadyFav-btn' variant='danger' >&#9829;</Button>
        :
        <Button onClick={() => props.updateFavTeachers(props.itemInfo._id)} className='noFav-btn' variant='outline-danger' >&#9829;</Button>
        :
         favCoursesCopy.some(elm => elm === props.itemInfo._id) ? 
        <Button onClick={() => props.updateFavCourses(props.itemInfo._id)} className='alreadyFav-btn' variant='danger' >&#9829;</Button>
        :
        <Button onClick={() => props.updateFavCourses(props.itemInfo._id)} className='noFav-btn' variant='outline-danger' >&#9829;</Button>
      }
  </>
  )
}

export default FavButton