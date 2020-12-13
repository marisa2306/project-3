import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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


    componentDidMount = () => {
        const course_id = this.props.match.params.course_id

        this.coursesService
            .getCourse(course_id)
            .then(res => this.setState({ course: res.data }))
            .catch(err => console.log(err))
    }

    handleInputChange = e => this.setState({ course: { ...this.state.course, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()
        const course_id = this.props.match.params.course_id
        this.coursesService
            .editCourse(course_id, this.state.course)
            .then(() => {
                this.props.history.push('/profile-teacher')
                this.props.handleToast(true, 'Edit successful!', 'green')
            })
            .catch(err => this.props.handleToast(true, err, 'red'))   // TO-DO ¿o mejor así?
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
            .catch(err => this.props.handleToast(true, err.response.data.message, 'red'))   // TO-DO ¿o mejor así?
    }


    render() {

        return (
            <>
                <Container>
                    <Row>
                        <Col lg={{ span: 6, offset: 3 }}>
                            <h1 className="mt-5">Edit Course</h1>
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
                                <Row>
                                    <Col md={6}>
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
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId='difficultyLevel'>
                                            <Form.Label>Level</Form.Label>
                                            <Form.Control as='select' name='difficultyLevel' value={this.state.course.difficultyLevel} onChange={this.handleInputChange}>
                                                <option>Choose one option</option>
                                                <option value='All levels'>All levels</option>
                                                <option value='Beginner'>Beginner</option>
                                                <option value='Intermidiate'>Intermidiate</option>
                                                <option value='Advanced'>Advanced</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="whatYouWillLearn">
                                    <Form.Label>Main Topics</Form.Label>
                                    <Form.Control as='textarea' name="whatYouWillLearn" value={this.state.course.whatYouWillLearn} onChange={this.handleInputChange} />
                                    <Form.Text id='passwordHelpBlock' muted>Separate with commas</Form.Text>
                                </Form.Group>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="price">
                                            <Form.Label>Price</Form.Label>
                                            <Form.Control type="number" name="price" value={this.state.course.price} onChange={this.handleInputChange} min='0' />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="duration">
                                            <Form.Label>Duration</Form.Label>
                                            <Form.Control type="number" name="duration" value={this.state.course.duration} onChange={this.handleInputChange} min='0' />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="requirements">
                                    <Form.Label>Requirements</Form.Label>
                                    <Form.Control as='textarea' name="requirements" value={this.state.course.requirements} onChange={this.handleInputChange} />
                                    <Form.Text id='passwordHelpBlock' muted>Separate with commas</Form.Text>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Imagen (file) {this.state.uploadingActive && <Loader />}</Form.Label>
                                    <Form.Control type="file" onChange={this.handleImageUpload} />
                                </Form.Group>

                                <Button className="mr-3 mt-3" variant="info" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Image loading...' : 'Confirm Edition'}</Button>
                                <Button className="mt-3" as='a' href='/profile' variant="dark" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Image loading...' : 'Cancel'}</Button>
                            </Form>
                            <Link to="/profile-teacher" className="btn btn-outline-dark mt-5">Go back</Link>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default EditCourseForm