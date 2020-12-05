import React, { Component } from 'react'
import AuthService from '../../../service/auth.service'

import { Container, Form, Button } from 'react-bootstrap'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.authService = new AuthService()
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {
        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
              this.props.storeUser(theLoggedInUser.data)
              this.props.closeModal()
            })
            .catch(err => console.log({ err }))
    }


    render() {

        return (

          <Container>
            <h1>Log In</h1>
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
                <Button variant="dark" type="submit">Enter</Button>
            </Form>
          </Container>
        )
    }
}

export default LoginForm