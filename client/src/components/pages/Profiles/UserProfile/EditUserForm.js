import React, { Component } from 'react'
import UsersService from '../../../../service/users.service'
import FilesService from '../../../../service/upload.service'
import Loader from '../../../shared/Spinner/Loader'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

class EditUserForm extends Component {
    constructor() {
        super()
        this.state = {
            user: {
                username: '',
                email: '',
                password: '',
                role: '',
                imageUrl: ''
            },
            uploadingActive: false
        }
        this.usersService = new UsersService()
        this.filesService = new FilesService()
    }


    componentDidMount = () => this.setState({ user: this.props.loggedUser })

    handleInputChange = e => {
        e.persist()
        this.setState(prevState => ({ user: { ...prevState.user, [e.target.name]: e.target.value } }))
    }

    handleSubmit = e => {
        e.preventDefault()

        this.usersService
            .editUser(this.props.loggedUser._id, this.state.user)
            .then(user => {
                this.props.storeUser(user.data)
                this.props.history.push('/profile')
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
                    user: { ...this.state.user, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
            })
            .catch(err => this.props.handleToast(true, err.response.data.message, 'red'))   // TO-DO ¿o mejor así?
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <h1>Edit User Profile</h1>
                        <hr />

                        <Form validated={this.validated} onSubmit={this.handleSubmit}>

                            <Form.Row>
                                <Form.Group as={Col} md='5' controlId='username'>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        required
                                        type='text'
                                        name='username'
                                        placeholder='popinez'
                                        value={this.state.user.username}
                                        onChange={this.handleInputChange} />
                                </Form.Group>

                                {/* <Form.Group as={Col} md='7' controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        required
                                        type='password'
                                        name='password'
                                        placeholder='fantasía caribeña'
                                        value={this.state.user.password}
                                        onChange={this.handleInputChange} />
                                    <Form.Text id='passwordHelpBlock' muted>
                                        Your password must be 8-10 characters long
                                    </Form.Text>
                                </Form.Group> */}
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} md='7' controlId='email'>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        required
                                        type='email'
                                        name='email'
                                        placeholder='pop@ino.dog'
                                        value={this.state.user.email}
                                        onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group as={Col} md='5' controlId='role'>
                                    <Form.Label>Choose role</Form.Label>
                                    <Form.Control as='select' name='role' value={this.state.user.role} onChange={this.handleInputChange}>
                                        <option>Student or Teacher?</option>
                                        <option value='Student' >Student</option>
                                        <option value='Teacher' >Teacher</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>

                            <Form.Group>
                                <Form.Label>Imagen (file) {this.state.uploadingActive && <Loader />}</Form.Label>
                                <Form.Control type="file" onChange={this.handleImageUpload} />
                            </Form.Group>

                            <Form.Group>
                                <Button variant='info' type='submit' disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Image loading...' : 'Edit your user details'}</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default EditUserForm