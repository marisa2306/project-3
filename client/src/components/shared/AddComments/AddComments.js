import React, { Component } from 'react'
import CommentsService from './../../../service/comments.service'
import Loader from '../../shared/Spinner/Loader'
import { Link } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'


class AddComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                content: '',
                user: this.props.loggedUser._id || '',
                course: this.props.courseId || ''
            }

            // upvotes: 0,
            // downvotes: 0
        }
        this.commentsService = new CommentsService()

    }

    handleInputChange = e => this.setState({ comment: { ...this.state.comment, [e.target.name]: e.target.value } })



    handleSubmit = e => {
        e.preventDefault()

        this.commentsService
            .saveComment(this.state.comment)
            .then(() => {
                this.props.history.push('/courses')
                // this.props.handleToast(true, 'New comment created!', 'green')
            })
            // .catch(err => this.props.handleToast(true, err.response.data.message[0].msg, 'red')) 
            .catch(err => console.log(err)) // TO-DO Configurar en servidor con validator
    }



    render() {
        return (
            <>
                <Container>
                    <Row>
                        <Col lg={6}>
                            <h2 className="mt-5 mb-3">Add a Comment</h2>

                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="content">
                                    <Form.Control as='textarea' name="content" value={this.state.content} onChange={this.handleInputChange} placeholder="Write your comment..." />
                                </Form.Group>
                                <Button className="mt-3 btn" type="submit"> Submit</Button>
                            </Form>

                        </Col>
                    </Row>

                </Container>
            </>
        )
    }
}

export default AddComments