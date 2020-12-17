import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import './Login.css'
import logo from './logo2.png'

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formInfo: {
                username: '',
                password: ''
            }
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.closeModal()
                this.props.handleToast(true, 'Log in successful!', '#d4edda')
            })
            .catch(err => this.props.handleToast(true, err.response.data.message, '#f8d7da'))
    }

    render() {
        return (
            <Container className='login-form pb-3'>
                <Row>
                    <Col>
                        <Row className='justify-content-center mt-3'>
                            <figure className='form-logo'><img src={logo} alt='Freedemy logo' /></figure>
                        </Row>
                        <h1 className='text-center'>Log In</h1>
                        <hr />

                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="username">
                                <Form.Label>Usermane</Form.Label>
                                <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>
                            <div className="d-flex justify-content-between align-items-center">
                                <Button variant="dark" type="submit">Enter</Button>
                                <Form.Text id='loginHelpText' muted>Click outside to cancel</Form.Text>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default LoginForm