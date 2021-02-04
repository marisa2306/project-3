import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import CoursesService from './../../../service/courses.service'
import CommentsService from './../../../service/comments.service'
import AddComments from './../../shared/AddComments/AddComments'
import Loader from './../../shared/Spinner/Loader'

import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap'
import './Course-details.css'


class CourseDetails extends Component {
    constructor() {
        super()
        this.state = {
            course: undefined,
            comments: undefined,
            videoUrl: undefined,
            showModal: false
        }
        this.coursesService = new CoursesService()
        this.commentsService = new CommentsService()
    }

    componentDidMount = () => this.refreshCourse()

    refreshCourse = () => {
        const course_id = this.props.match.params.course_id
        const getCourse = this.coursesService.getCourse(course_id)
        const getComments = this.commentsService.getCourseComments(course_id)

        Promise.all([getCourse, getComments])
            .then(res => this.setState({ course: res[0].data, videoUrl: res[0].data.videos[0], comments: res[1].data }))
            .catch(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'An error has occurred, please try again later', '#f8d7da')
            })
    }

    deleteComment = commentId => {
        this.commentsService
            .deleteComment(commentId)
            .then(() => {
                this.refreshCourse()
                this.props.handleToast(true, 'Delete successful!', '#d4edda')
            })
            .catch(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'An error has occurred while deleting, please try again later', '#f8d7da')
            })
    }

    toggleInput = () => this.setState({ showInput: !this.state.showInput })

    setVideoUrl = url => this.setState({ videoUrl: url })

    render() {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                <Container className="course-details ">
                    {this.state.course
                        ?
                        <>
                            <section className="header">
                                <Row>
                                    <Col md={{ span: 8 }} >
                                        <h1>{this.state.course.title}</h1>
                                        <p><em> {this.state.course.lead}</em></p>

                                        {this.state.course.owner && <p style={{ color: '#73726c', fontWeight: 700 }}>Created by <Link to={`/teachers/${this.state.course.owner._id}`}>{this.state.course.owner.name} {this.state.course.owner.surname}</Link></p>}
                                        <p><strong>Category:</strong> {this.state.course.category} | <strong>Difficulty Level:</strong>  {this.state.course.difficultyLevel} | <strong>Price:</strong>  {this.state.course.price} € | <strong>Duration:</strong>  {this.state.course.duration} hrs.</p>
                                    </Col>
                                    <Col md={{ span: 4 }} >
                                        <img className="mb-3 course-img" src={this.state.course.imageUrl} alt={this.state.course.title} />
                                    </Col>
                                </Row>
                            </section>

                            <section className="course-bckg">
                                <Row>
                                    <Col>
                                        <h3 className="mt-5 mb-3">Description</h3>
                                        <p>{this.state.course.description}</p>

                                        <h3 className="mt-5 mb-4">What you will learn:</h3>
                                        <ul className="whatYouWillLearn">
                                            {this.state.course.whatYouWillLearn.map((elm, idx) => <li key={idx}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607883391/project3-ironhack/checked_ib75gx.png" alt='Checked icon' /><p>{elm}</p></li>)}
                                        </ul>
                                        <h3 className="mt-4 mb-4">Requirements:</h3>
                                        <ul className="requirements mb-4">
                                            {this.state.course.requirements.map((elm, idx) => <li key={idx}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607887317/project3-ironhack/double-check_tm7qmy.png" alt='Double-Checked icon' /><p>{elm}</p></li>)}
                                        </ul>

                                        {this.props.loggedUser ?
                                            <Button onClick={this.toggleInput} className="mt-3 mb-3 start-course" >{this.state.showInput ? 'Close media' : 'See course media'}</Button>
                                            :
                                            <Button onClick={this.toggleInput} disabled className="mt-3 mb-3 start-course" >Log In to see media</Button>
                                        }

                                        {/* Videos */}
                                        {this.state.showInput &&
                                            <motion.div transition={{ type: 'spring', stiffness: 300, duration: 1.2 }}>
                                                <Row>
                                                    <Col md={12} lg={8}>
                                                        <ReactPlayer
                                                            width='100%'
                                                            url={this.state.videoUrl}
                                                            controls
                                                        />
                                                    </Col>

                                                    <Col md={12} lg={4}>
                                                        {this.state.course.videos.map((elm, idx) =>
                                                            <Card.Header className="video-card" key={elm._id}>
                                                                <img
                                                                    src="https://res.cloudinary.com/dodneiokm/image/upload/v1607893554/project3-ironhack/play_u6mma0.png"
                                                                    alt="play icon"
                                                                    onClick={() => this.setVideoUrl(elm)}
                                                                />
                                                                <p style={{ display: 'inline-flex' }} >Lesson {idx + 1}</p>
                                                            </Card.Header>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </motion.div>}

                                    </Col>
                                </Row>
                            </section>


                            {/* Comments */}

                            <h3 className="mt-5 mb-3">Comments</h3>

                            {this.state.comments.length > 0 ?
                                this.state.comments.map(elm =>
                                    <div className="mb-2" key={elm._id}{...elm}>
                                        {elm.user &&
                                            <div className="comments-card">
                                                <div className="comment-body" style={{ width: '90%' }}>
                                                    <Image className="avatar" roundedCircle src={elm.user.imageUrl} alt={elm.user.username} />
                                                    <div className="comment-text" style={{ width: '80%' }}>
                                                        <p className="mb-0"><strong>{elm.user.username} {elm.timestamps}</strong></p>
                                                        <p className="mb-0"><em>" {elm.content} "</em></p>
                                                        <small>{elm.createdAt}</small>
                                                    </div>
                                                </div>
                                                {this.props.loggedUser && this.props.loggedUser._id === elm.user._id ?

                                                    <Button onClick={() => this.deleteComment(elm._id)} variant="outline-danger" size="sm">Delete</Button>

                                                    : null
                                                }

                                            </div>
                                        }
                                    </div>
                                )
                                : <p className="mb-3 ml-3">No comments yet</p>
                            }

                            {this.props.loggedUser &&
                                <section >
                                    <AddComments refreshCourse={this.refreshCourse} courseId={this.state.course._id} loggedUser={this.props.loggedUser} history={this.props.history} handleToast={this.props.handleToast} />
                                </section>
                            }

                            <Link to="/courses" className="btn btn-sm btn-outline-dark mt-5">Go back</Link>
                        </>
                        :
                        <Loader />
                    }
                </Container>
            </motion.div>
        )
    }
}

export default CourseDetails


