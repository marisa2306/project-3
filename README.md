# project-3

## Here's the route we will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/` |    GET    | show index with Google Map |
| `/api/farms` |    GET   | json farm list |
| `/farms` |    GET   | show farms list |
| `/farms/:farm_id`|    GET   | show farm details|
| `/products` |    GET   | show products list |
| `/products/:product_id`|    GET   | show product details|
| `/auth/log-in` |    GET   | show log in form|
| `/auth/log-in` |    POST   | manage log in form |
| `/auth/sign-up` |    GET   | show sign up form|
| `/auth/sign-up` |    POST   | manage sign up form |
|  Role : Student                          |
| `/profile` |    GET    | show user profile data |
| `/profile/edit-user` |    GET    | show edit user form|
| `/profile/edit-user` |    POST    | manage edit user form|
|  Role : Teacher                           |
| `/profile` |    GET    | show user profile data |
| `/profile/edit-user` |    GET    | show edit user form|
| `/profile/edit-user` |    POST    | manage edit user form|
| `/profile/create-farm?id=XXX` |    GET    | show create farm form |
| `/profile/create-farm?id=XXX` |    POST   | manage create farm form|
| `/profile/myfarm/:id` |    GET    | show farm data |
| `/profile/myfarm/:id/create-product` |    GET    | show create new product form|
| `/profile/myfarm/:id/create-product` |    POST   | manage create new product form|
| `/profile/myfarm/:id/edit-product?id=XXX` |    GET    | show edit product form|
| `/profile/myfarm/:id/edit-product?id=XXX` |    POST   | manage edit product form|
| `/profile/myfarm/:id/delete-product?id=XXX` |    GET    | delete product|
