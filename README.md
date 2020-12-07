# project-3

## Here's the route we will be using:


SERVER 

API COURSES

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/api/courses/getAllCourses` |    GET    | show all Courses |
| `api/courses/getTeacherCourses/:teacher_id` |    GET    | show all Teacher Courses |
| `/api/courses/getOneCourse/:course_id` |    GET    | show one Course |
| `/api/courses/newCourse` |    POST    | Create new Course |
| `/api/courses/editCourse/:course_id` |    PUT    | Edit Course |
| `/api/courses/deleteCourse/:course_id` |    DELETE   | Delete Course |





API TEACHERS

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/api/teachers/getAllTeachers` |    GET    | show all Teachers |
| `/api/getOneTeacher/:user_id` |    GET    | show one Teacher card (User Profile) |
| `/api/teachers/newTeacher` |    POST    | Create new Teacher |
| `/api/teachers/editTeacher/:teacher_id` |    PUT    | Edit Teacher |
| `/api/courses/deleteTeacher/:teacher_id` |    DELETE   | Delete Teacher |

API AUTH

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/api/login` |    POST   | manage log in form |
| `/api/signup` |    POST   | manage sign up form |
| `/api/logout` |    POST   | manage log out |
| `/api/loggedin` |    GET   | manage session |

CLIENT


