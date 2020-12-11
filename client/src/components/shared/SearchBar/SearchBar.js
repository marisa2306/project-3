import './SearchBar.css'
import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: ''
        }
    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value }, () => this.props.filterCourse(this.state.search))

    render() {
        return (
            <Form className="mb-5 mt-5" >
                <Form.Group controlId="title">
                    <Form.Control type="text" name="search" placeholder='Search...' value={this.state.search} onChange={this.handleInputChange} />
                </Form.Group>
            </Form>
        )
    }
}

export default SearchBar 