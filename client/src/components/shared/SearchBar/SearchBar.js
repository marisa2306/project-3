import React, { Component } from 'react'
import { Col, Form } from 'react-bootstrap'
import './SearchBar.css'
class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            sortBy: '',
            categoryFilter: 'default',
            levelFilter: 'default'
        }
    }

    handleInputChange = e => this.setState({ search: e.target.value }, () => this.props.filterBySearch(this.state.search))

    handleSortChange = e => this.setState({ sortBy: e.target.value }, () => this.props.sortBy(this.state.sortBy))

    handleCategoryChange = e => this.setState({ categoryFilter: e.target.value }, () => this.props.filterByCategory(this.state.categoryFilter))

    handleLevelChange = e => this.setState({ levelFilter: e.target.value }, () => this.props.filterByLevel(this.state.levelFilter))

    render() {
        return (
            <Form className="mb-5 mt-5 filter-bar" >
                <Form.Row>
                    <Form.Group as={Col} md={this.props.filterByCategory && this.props.filterByLevel ? '4' : '6'} controlId="search">
                        <Form.Control type="text" name="search" placeholder='Search...' value={this.state.search} onChange={this.handleInputChange} />
                    </Form.Group>

                    {this.props.filterByCategory && this.props.filterByLevel ?
                        <>
                            <Form.Group as={Col} md='3' controlId="categoryFilter">
                                <Form.Control as='select' name='categoryFilter' value={this.state.categoryFilter} onChange={this.handleCategoryChange}>
                                    <option value='default' >Filter by category</option>
                                    <option value='Design' >Design</option>
                                    <option value='Development' >Development</option>
                                    <option value='Marketing' >Marketing</option>
                                    <option value='Music' >Music</option>
                                    <option value='Other' >Other</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='3' controlId="levelFilter">
                                <Form.Control as='select' name='levelFilter' value={this.state.levelFilter} onChange={this.handleLevelChange}>
                                    <option value='default' >Filter by level</option>
                                    <option value='Beginner' >Beginner</option>
                                    <option value='Intermidiate' >Intermidiate</option>
                                    <option value='Advanced' >Advanced</option>
                                    <option value='All levels' >All levels</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md='2' controlId="sortBy">
                                <Form.Control as='select' name='sortBy' value={this.state.sortBy} onChange={this.handleSortChange}>
                                    <option>Sort by...</option>
                                    <option value='Name-A' >Name A-Z</option>
                                    <option value='Name-Z' >Name Z-A</option>
                                    <option value='Price-desc' >Price descending</option>
                                    <option value='Price-asc' >Price ascending</option>
                                </Form.Control>
                            </Form.Group>
                        </>
                        :
                        <Form.Group as={Col} md='6' controlId="sortBy">
                            <Form.Control as='select' name='sortBy' value={this.state.sortBy} onChange={this.handleSortChange}>
                                <option>Sort by...</option>
                                <option value='Name-A' >Name A-Z</option>
                                <option value='Name-Z' >Name Z-A</option>
                            </Form.Control>
                        </Form.Group>
                    }

                </Form.Row>
            </Form>
        )
    }
}

export default SearchBar 