![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Freedemy

Ironhack Web Development Bootcamp 9th week project: MERN Stack SPA e-learning platform.
This is an E-learning Web App was bootstrapped with Create React App and other libraries. The UI framework used was React-Bootstrap.


## Here's the route we will be using:


SERVER 

API COURSES

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/courses/sampleCourses` |    `GET`    | Show random Courses |
| `/api/courses/getAllCourses` |    `GET`    | Show all Courses |
| `/api/courses/getTeacherCourses/:id` |    `GET`    | Show all Teacher Courses |
| `/api/courses/getOneCourse/:id` |    `GET`    | Show one Course |
| `/api/courses/newCourse` |    `POST`    | Create new Course |
| `/api/courses/editCourse/:id` |    `PUT`    | Edit Course |
| `/api/courses/deleteCourse/:id` |    `DELETE`   | Delete Course |
| `/api/courses/deleteTeacherCourses/:id` |    `DELETE`   | Delete Courses created by Teacher |

API TEACHERS

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/teachers/getAllTeachers` |    `GET`    | Show all Teachers |
| `/api/teachers/getTheTeacher/:id` |    `GET`    | Show Teacher Details |
| `/api/teachers/getOneTeacher/:id` |    `GET`    | Validate Teacher role |
| `/api/teachers/newTeacher` |    `POST`    | Create new Teacher |
| `/api/teachers/editTeacher/:id` |    `PUT`    | Edit Teacher |
| `/api/teachers/deleteTeacher/:id` |    `DELETE`   | Delete Teacher |

API USERS

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/users/getOneUser/:id` |    `GET`    | Get User Details |
| `/api/users/editUser/:id` |    `PUT`    | Edit User |
| `/api/users/deleteUser/:id` |    `DELETE`   | Delete User |
| `/api/users/userFavCourses/:id` |    `GET`   | Show User Favorites Courses List |
| `/api/users/userFavTeachers/:id` |    `GET`   | Show User Favorites Teachers List |
| `/api/users/editUser/updateFavCourses/:id` |    `PUT`   | Update User Favorites Courses List |
| `/api/users/editUser/updateFavTeachers/:id` |    `PUT`   | Update User Favorites Teachers List |

API COMMENTS

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/comments/getCourseComments/:id` |    `GET`    | Get Course Comments |
| `/api/comments/newComment` |    `POST`    | Create Comment |
| `/api/comments/deleteComment/:id` |    `DELETE`   | Delete Comment |

API AUTH

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/login` |    `POST`   | Manage log in form |
| `/api/signup` |    `POST`   | Manage sign up form |
| `/api/logout` |    `POST`   | Manage log out |
| `/api/loggedin` |    `GET`   | Manage session persist |

API FILES

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/upload` |    `POST`   | Upload files |

CLIENT

|   Route   |   Description   |
| :--- | :--- |
| `/` | Home Page |
| `/courses` | Show All Courses |
| `/courses/:course_id` | Show One Course |
| `/teachers` | Show All Teachers |
| `/teachers/:teacher_id` | Show Teacher Details |
| `/signup` | Show Signup Form |
| `/profile` | Show User Profile |
| `/profile/edit-user` | Show Edit Form |
| `/profile/create-teacher` | Show Create Teacher Profile Form |
| `/profile-teacher/edit-teacher` | Show Edit Teacher Form |
| `/profile-teacher/create-course` | Show Create Course Form |
| `/profile-teacher/edit-course/:course_id` | Show Edit Course Form |