import React, { Component } from 'react'
import CoursesService from './../../../service/courses.service'
import FilesService from './../../../service/upload.service'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Loader from './../../shared/Spinner/Loader'
class EditCourseForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            course: {
                title: '',
                description: '',
                category: '',
                difficultyLevel: '',
                whatYouWillLearn: [],
                price: '',
                duration: '',
                requirements: [],
                imageUrl: '',
                owner: this.props.teacherInfo ? this.props.teacherInfo._id : ''
            },
            uploadingActive: false
        }
        this.coursesService = new CoursesService()
        this.filesService = new FilesService()
    }


    // get the ID from the URL
    componentDidMount = () => {
        const course_id = this.props.match.params.course_id

        this.coursesService
            //find item by ID
            .getCourse(course_id)
            //set the component state to the course found
            .then(res => this.setState({ course: res.data }))
            .catch(err => console.log(err))
    }


    //handleInputChange = e => this.setState({ [e.target.name]: e.target.value })
    handleInputChange = e => {
        e.persist()

        this.setState(prevState => ({
            course: { ...prevState.course, [e.target.name]: e.target.value }
        }))
    }

    handleSubmit = e => {
        e.preventDefault()
        const course_id = this.props.match.params.course_id
        this.coursesService
            .editCourse(course_id, this.state.course)
            .then(() => this.props.history.push('/profile-teacher'))    // Cambiar a ruta de detalle profesor
            .catch(err => console.log(err))
    }

    handleImageUpload = e => {
        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    course: { ...this.state.course, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => console.log('ERRORRR!', err))
    }


    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }}>
                            <h1>Edit Course</h1>
                            <hr />
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="title">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" name="title" value={this.state.course.title} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as='textarea' name="description" value={this.state.course.description} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as='select' name='category' value={this.state.course.category} onChange={this.handleInputChange}>
                                        <option>Choose one option</option>
                                        <option value='Design' >Design</option>
                                        <option value='Development' >Development</option>
                                        <option value='Marketing' >Marketing</option>
                                        <option value='Music' >Music</option>
                                        <option value='Other' >Other</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='difficultyLevel'>
                                    <Form.Label>Level</Form.Label>
                                    <Form.Control as='select' name='difficultyLevel' value={this.state.course.difficultyLevel} onChange={this.handleInputChange}>
                                        <option>Choose one option</option>
                                        <option value='Beginner' >Beginner</option>
                                        <option value='Intermidiate' >Intermidiate</option>
                                        <option value='Advanced' >Advanced</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="whatYouWillLearn">
                                    <Form.Label>Main Topics</Form.Label>
                                    <Form.Control type="text" name="whatYouWillLearn" value={this.state.course.whatYouWillLearn} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="number" name="price" value={this.state.course.price} onChange={this.handleInputChange} min='0' />
                                </Form.Group>
                                <Form.Group controlId="duration">
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="number" name="duration" value={this.state.course.duration} onChange={this.handleInputChange} min='0' />
                                </Form.Group>
                                <Form.Group controlId="requirements">
                                    <Form.Label>Requirements</Form.Label>
                                    <Form.Control type="text" name="requirements" value={this.state.course.requirements} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Imagen (file) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>

                                <Button variant="dark" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Image loading...' : 'Create course'}</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default EditCourseForm