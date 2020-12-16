import React, { Component } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import CoursesService from './../../../service/courses.service'
import CommentsService from './../../../service/comments.service'
import AddComments from './../../shared/AddComments/AddComments'
import { Container, Row, Col, Card, Button, Image } from 'react-bootstrap'
import './Course-details.css'

import Loader from './../../shared/Spinner/Loader'


class CourseDetails extends Component {
    constructor() {
        super()
        this.state = {
            course: undefined,
            showModal: false,
            comments: undefined,
            videoUrl: undefined
        }
        this.coursesService = new CoursesService()
        this.commentsService = new CommentsService()

    }

    componentDidMount = () => {
        const course_id = this.props.match.params.course_id

        this.coursesService
            .getCourse(course_id)
            .then(res => this.setState({ course: res.data, videoUrl: res.data.videos[0] }))
            .catch(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
            })

        this.commentsService
            .getComments()
            .then(res => this.setState({ comments: res.data }))
            .catch(() => {
                this.props.history.push('/courses')
                this.props.handleToast(true, 'An error has occurred, please try again later', 'red')
            })


    }

    toggleInput = () => {
        //alert('funoncia!!!')
        //this.setState({ showInput: true })
        this.setState({ showInput: !this.state.showInput })
    }

    setVideoUrl = url => this.setState({ videoUrl: url })

    render() {


        console.log(this.state.comments)
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

                                        {this.state.course.owner ?
                                            <p style={{ color: '#73726c', fontWeight: 700 }}>Created by {this.state.course.owner.name} {this.state.course.owner.surname}</p>
                                            :
                                            null
                                        }
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
                                            {this.state.course.whatYouWillLearn.map(elm => <li key={elm._id}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607883391/project3-ironhack/checked_ib75gx.png" alt='Checked icon' /><p>{elm}</p></li>)}
                                        </ul>
                                        <h3 className="mt-4 mb-4">Requirements:</h3>
                                        <ul className="requirements mb-4">
                                            {this.state.course.requirements.map(elm => <li key={elm._id}><img src="https://res.cloudinary.com/dodneiokm/image/upload/v1607887317/project3-ironhack/double-check_tm7qmy.png" alt='Double-Checked icon' /><p>{elm}</p></li>)}
                                        </ul>

                                        <Button onClick={this.toggleInput} className="mt-3 mb-3 start-course" >{this.state.showInput ? 'Close media' : 'See course media'}</Button>

                                        {/* Videos */}
                                        {this.state.showInput ?
                                            <motion.div transition={{ type: 'spring', stiffness: 300, duration: 1.2 }}>
                                                <Row>
                                                    <Col md={8}>
                                                        <ReactPlayer
                                                            url={this.state.videoUrl}
                                                            controls
                                                        />
                                                    </Col>

                                                    <Col md={4}>
                                                        {this.state.course.videos.map((elm, idx) =>
                                                            <Card.Header className="video-card" key={elm._id}>
                                                                <img
                                                                    src="https://res.cloudinary.com/dodneiokm/image/upload/v1607893554/project3-ironhack/play_u6mma0.png"
                                                                    alt="play icon"
                                                                    onClick={() => this.setVideoUrl(elm)}
                                                                />
                                                                <p style={{ display: 'inline-flex' }} >Chapter {idx + 1}</p>
                                                            </Card.Header>
                                                        )}
                                                    </Col>
                                                </Row>
                                            </motion.div>
                                            : null
                                        }

                                    </Col>
                                </Row>
                            </section>


                            {/* Comments */}

                            <h2 className="mt-5 mb-3">Comments</h2>

                            {this.state.comments ?

                                this.state.comments.map(elm =>
                                    <section className="d-flex align-items-center mb-2" key={elm._id} userInfo={this.props.loggedUser} {...elm}>
                                        <Image className="avatar mr-2" roundedCircle src={elm.user.imageUrl} alt={elm.user.username} />
                                        <Card style={{ width: '50%' }}  >
                                            <Card.Body >
                                                <p className="mb-1"><strong>{elm.user.username} {elm.timestamps}</strong></p>
                                                <p className="mb-0"><em>" {elm.content} "</em></p>
                                                <small>{elm.createdAt}</small>
                                                {this.props.loggedUser ?
                                                    <Row as="div" className="mt-2">
                                                        <Col>
                                                            <Link to='/edit-comment' className="mr-3">Edit</Link>
                                                            <Button onClick={() => this.handleModal(true)} variant="outline-danger" className="delete-comment" size="sm">Delete</Button>
                                                        </Col>
                                                    </Row>
                                                    : null
                                                }
                                            </Card.Body>
                                        </Card>
                                    </section>
                                )
                                : null
                            }

                            {this.props.loggedUser ?

                                < section >
                                    <AddComments courseId={this.state.course._id} loggedUser={this.props.loggedUser} history={this.props.history} />
                                </section>

                                : null
                            }

                            <Link to="/courses" className="btn btn-sm btn-outline-dark mt-5">Go back</Link>
                        </>
                        :
                        <Loader />
                    }
                </Container>
            </motion.div >
        )
    }
}

export default CourseDetails


