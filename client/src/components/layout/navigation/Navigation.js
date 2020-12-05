import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from './logo.png'
import './Navigation.css'
import AuthService from './../../../service/auth.service'


class Navigation extends Component {


    constructor() {
        super()
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }

    render() {

        return (
            <Navbar bg="dark" variant="dark" expand="md" className="menu">
                <Link to="/">
                    <Navbar.Brand >
                        <img
                            alt="logo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}eLearning_</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/">
                            <Nav.Link as="div">Home</Nav.Link>
                        </Link>
                        <Link to="/courses">
                            <Nav.Link as="div">Courses</Nav.Link>
                        </Link>
                        {
                            this.props.loggedUser
                                ?
                                <Nav.Link as="div" onClick={this.logOut}>Log out</Nav.Link>
                                :
                                <>
                                    <Link to="/signup">
                                        <Nav.Link as="div">Sign up</Nav.Link>
                                    </Link>
                                    <Link to="/login">
                                        <Nav.Link as="div">Log in</Nav.Link>
                                    </Link>
                                </>

                        }
                        <Link to="/profile">
                            <Nav.Link as="div">Hi, {this.props.loggedUser ? this.props.loggedUser.username : 'guest'}</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}


export default Navigation