import React, { Component } from 'react'
import TeachersService from '../../../../service/teachers.service'
import FilesService from '../../../../service/upload.service'
import Loader from '../../../shared/Spinner/Loader'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class EditTeacherForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            teacher: {
                name: '',
                surname: '',
                jobOccupation: '',
                description: '',
                // links: [{
                //     linkName: '',
                //     url: ''
                // }],
                user: this.props.loggedUser ? this.props.loggedUser._id : ''
            },
            uploadingActive: false
        }
        this.teachersService = new TeachersService()
        this.filesService = new FilesService()
    }

    componentDidMount = () => this.setState({ teacher: this.props.teacherInfo })

    handleInputChange = e => this.setState({ teacher: { ...this.state.teacher, [e.target.name]: e.target.value } })

    // handleLinksChange = e => this.setState({ links:  [{...this.state.links, [ e.target.name ]: e.target.value }] })

    handleSubmit = e => {
        e.preventDefault()

        this.teachersService
            .editTeacher(this.props.teacherInfo._id, this.state.teacher)
            .then(() => {
                this.props.storeUser(this.props.loggedUser)
                this.props.history.push('/profile-teacher')
                this.props.handleToast(true, 'Edit successful!', 'green')
            })
            .catch(err => this.props.handleToast(true, err.response.data.message, 'red'))   // TO-DO ¿o mejor así?
    }

    handleImageUpload = e => {
        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    teacher: { ...this.state.teacher, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => this.props.handleToast(true, err.response.data.message, 'red'))   // TO-DO ¿o mejor así?
    }


    render() {
        return (
            <Container>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <h1>Edit your teacher Profile</h1>
                        <hr />

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.teacher.name} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="surname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" name="surname" value={this.state.teacher.surname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="jobOccupation">
                                <Form.Label>Job Occupation</Form.Label>
                                <Form.Control type="text" name="jobOccupation" value={this.state.teacher.jobOccupation} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>About me</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.teacher.description} onChange={this.handleInputChange} />
                            </Form.Group>

                            {/* <Form.Label><strong>Links</strong></Form.Label> 
                        <Form.Row>
                            <Form.Group as={Col} md='6' controlId="linkName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="linkName" value={this.state.links.linkName} onChange={this.handleLinksChange} />
                            </Form.Group>
                            <Form.Group as={Col} md='6' controlId="linkUrl">
                                <Form.Label>Url</Form.Label>
                                <Form.Control type="text" name="url" value={this.state.links.url} onChange={this.handleLinksChange} />
                            </Form.Group>
                        </Form.Row> */}

                            <Form.Group>
                                <Form.Label>Imagen (file) {this.state.uploadingActive && <Loader />}</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>

                            <Button variant="info" type="submit" disabled={this.state.uploadingActive}> {this.state.uploadingActive ? 'Image loading...' : 'Edit Teacher profile'}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditTeacherForm