import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from './../../../service/auth.service'
import logo from './logo.png'
import { Navbar, Nav } from 'react-bootstrap'
import Popup from '../../shared/Popup/Popup'
import LoginForm from '../../pages/Login-form/LoginForm'

import './Navigation.css'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false
        }
        this.authService = new AuthService()
    }

    logOut = () => {
        this.authService
            .logout()
            .then(() => {
                this.props.storeUser(undefined)
                this.props.handleToast(true, 'Logout successful!', 'green')
            })
            .catch(err => this.props.handleToast(true, err, 'red'))   // TO-DO ¿o mejor así?
    }

    handleModal = visible => this.setState({ showModal: visible })

    render() {
        return (
            <>
                <Popup show={this.state.showModal} handleModal={this.handleModal}>
                    <LoginForm handleToast={this.props.handleToast} closeModal={() => this.handleModal(false)} storeUser={this.props.storeUser} />
                </Popup>

                <Navbar bg="dark" variant="dark" expand="md" className="menu">
                    <Link to="/">
                        <Navbar.Brand >
                            <img
                                alt="logo"
                                src={logo}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            /> freeDemy_</Navbar.Brand>
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
                            <Link to="/teachers">
                                <Nav.Link as="div">Teachers</Nav.Link>
                            </Link>
                            {
                                this.props.loggedUser
                                    ?
                                    <>
                                        <Nav.Link as="div" onClick={this.logOut}>Log out</Nav.Link>

                                        <Link to="/profile">
                                            <Nav.Link as="div">{`Welcome back, ${this.props.loggedUser.username}`}</Nav.Link>
                                        </Link>
                                    </>
                                    :
                                    <>
                                        <Nav.Link as="div" onClick={() => this.handleModal(true)}>Log in</Nav.Link>

                                        <Link to="/signup">
                                            <Nav.Link as="div">Sign up</Nav.Link>
                                        </Link>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}


export default Navigation