# project-3

## Here's the route we will be using:


SERVER 

API COURSES

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/courses/getAllCourses` |    `GET`    | Show all Courses |
| `/api/courses/getTeacherCourses/:teacher_id` |    `GET`    | Show all Teacher Courses |
| `/api/courses/getOneCourse/:course_id` |    `GET`    | Show one Course |
| `/api/courses/newCourse` |    `POST`    | Create new Course |
| `/api/courses/editCourse/:course_id` |    `PUT`    | Edit Course |
| `/api/courses/deleteCourse/:course_id` |    `DELETE`   | Delete Course |

API TEACHERS

|   Route   | HTTP Verb |   Description   |
| :--- | :---: | :--- |
| `/api/teachers/getAllTeachers` |    `GET`    | show all Teachers |
| `/api/teachers/getTheTeacher/:teacher_id` |    `GET`    | show one Teacher |
| `/api/teachers/getOneTeacher/:user_id` |    `GET`    | show one Teacher (validation only) |
| `/api/teachers/newTeacher` |    `POST`    | Create new Teacher |
| `/api/teachers/editTeacher/:teacher_id` |    `PUT`    | Edit Teacher |
| `/api/teachers/deleteTeacher/:teacher_id` |    `DELETE`   | Delete Teacher |

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
| `/` | Home page |
| `/courses` | Show all Courses |
| `/courses/:course_id` | Show one Course |
| `/teachers` | Show all Teachers |
| `/teachers/:teacher_id` | Show one Teacher |
| `/signup` | Show signup form |
| `/profile` | Show student profile |
| `/profile/create-teacher` | Show create teacher profile form |
| `/profile-teacher` | Show teacher profile |
| `/profile-teacher/edit-teacher` | Show edit teacher form |
| `/profile-teacher/create-course` | Show create course form |
