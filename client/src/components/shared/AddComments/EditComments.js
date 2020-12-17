import React, { Component } from 'react'
import CommentsService from './../../../service/comments.service'
import Loader from '../../shared/Spinner/Loader'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'



class EditComments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: {
                content: '',
                user: this.props.loggedUser._id || '',
                course: this.props.courseId || ''
            }
        }
        this.commentsService = new CommentsService()

    }


    handleInputChange = e => this.setState({ comment: { ...this.state.comment, [e.target.name]: e.target.value } })


    handleSubmit = e => {
        e.preventDefault()
        const comment_id = this.props.match.params.comment_id
        this.commentsService
            .editComment(comment_id, this.state.comment)
            .then(() => {
                this.props.refreshComments()
                // this.setState({ content: '' })
                this.props.handleToast(true, 'Edit successful!', 'green')
            })
            .catch(err => this.props.handleToast(true, err.response.data.message[0].msg, 'red'))

    }


    render() {
        console.log(this.props)
        return (
            <Row>
                <Col>
                    <h2 className="mt-4 mb-3">Edit Comment</h2>
                    <Form className="comment-form" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="content">
                            <Form.Control as='textarea' name="content" value={this.state.content} onChange={this.handleInputChange} placeholder="Write your comment..." />
                        </Form.Group>
                        <Button className="btn start-course" type="submit"> Submit</Button>
                    </Form>
                </Col>
            </Row>
        )
    }
}

export default EditComments