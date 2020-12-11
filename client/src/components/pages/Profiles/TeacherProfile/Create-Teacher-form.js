import React, { Component } from 'react'
import TeachersService from '../../../../service/teachers.service'
import FilesService from '../../../../service/upload.service'
import Loader from '../../../shared/Spinner/Loader'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class NewTeacherForm extends Component {
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

    handleInputChange = e => this.setState({ teacher: { ...this.state.teacher, [e.target.name]: e.target.value } })

    // handleLinksChange = e => this.setState({ links:  [{...this.state.links, [ e.target.name ]: e.target.value }] })


    handleSubmit = e => {
        e.preventDefault()

        this.teachersService
            .saveTeacher(this.state.teacher)
            .then(() => {
                this.props.storeUser(this.props.loggedUser)
                this.props.history.push('/profile')
                this.props.handleToast(true, 'Congratulations!, now you have a teacher\'s profile', 'green')
            })
            .catch(() => this.props.handleToast(true, 'An error has occurred while creating your teacher profile, please try again later', 'red')) //  TO-DO -- ¿está bien así?
        
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
                        <h1>Create your teacher Profile</h1>
                        <hr />

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="surname">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control type="text" name="surname" value={this.state.surname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="jobOccupation">
                                <Form.Label>Job Occupation</Form.Label>
                                <Form.Control type="text" name="jobOccupation" value={this.state.jobOccupation} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" value={this.state.description} onChange={this.handleInputChange} />
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

                            <Button variant="dark" type="submit" disabled={this.state.uploadingActive}> {this.state.uploadingActive ? 'Image loading...' : 'Create Teacher profile'}</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default NewTeacherForm