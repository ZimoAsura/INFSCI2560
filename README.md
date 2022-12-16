# INFSCI 2560 Final Project Report

## Project Introduction

This project is a social media platform that allows users to register, view and like other users’ posts and make their own posts. The website also supports the admin user to manage the registered user.

**Team Member**
Zimo Zhang (ziz91@pitt.edu)

## Objective

Here is the objectives of this project:
Front-End:

- Create login/register form using Angular template-driven form.
- Create social media timeline page.
- Create the write-post sidebar component.
- Create the personal profile page.
- Create the admin page to manage the normal users.
  Back-End:
- Configure the Mongodb database setting.
- create the data model for user, post and like.
- Create the Restful CRUD APIs for the social media pproject.
- Create the authencation and accessControl middleware.
  For the out-of-scope features, I explored the Angular data-binding syntax, and use it to implement iteration and if
  clause in the html page.

## Team member’s contributions

**Project Design:** Zimo Zhang  
**Front-End Development:** Zimo Zhang  
**Back-End Development:** Zimo Zhang  
**Presentation:** Zimo Zhang  
**Report:** Zimo Zhang

## Technical Architecture

Here is the libraries and frameworks the I used to develop this project:  
**Front-End:** Angular, Bootstrap  
**Session management:** Angular.localStorage  
**Back-End:** Node.js, Express  
**Authentication and Encryption:** jwt, bcrypt  
**AccessControl:** accessControl  
**DataBase:** MongoDB

For backend, the project devides into four parts: controllers, models, routes
and middlewares.  
For routes, it defines the API path and authentication and access for each API.  
For models, it defines the mongoose models for my application, which includes three models:
user, post and likes, the **user** model stores the user related information,
the **post** model stores the post data. The **like** model stores the like that users make on the posts.  
For middlewares, the authentication and accessControl function are devloped in this part.
The authentcation function will check whether the cache stores the logged-in user's information,
if it doesn't, the user will not be allowed to use the API with the authentication middleware attached.
The accessControl function will define the access of the some specific APIs like deleteuser. Only the Admin user
is allowed to use those APIs.
Here are the APIs that I devloped for this project:

**User API**  
Register new user
`POST /api/register`  
User login
`POST /api/login`  
Get user
`GET /api/user/:userId`  
Delete user
`DELETE /api/deleteUser/:id`  
Get all users
`GET /api/users`  
Update user information
`PUT /api/update-user/:id`

**Post API**  
Get all posts `POST /api/posts`  
Create post `POST /api/createpost`  
Get user's post number given user id `GET /api/counters/:id?`  
Get user posts given user id `GET /api/posts-user/:id?`  
Delete post given post id `DELETE /api/delete-post/:id?`

**Like API**  
Add like `POST /api/addlike`
Remove like given like id `DELETE /api/dislike/:id`
Get like numbers given post id `GET /api/post-like/:postid`

## Challenge

Database design - When I want to add new feature which is conflicting with the current model.
I have to redesign my model and modify my model data.

## Future Work

For project, I plan to add the picture upload feature and comment feature for my social media.
For the technologies, I would like to learn more about the async programming since I am still not very
good at it. And I also want to learn how to use OAuth to do user authentication.

## Conclusion

Reflect upon the web technologies and standards that I learned in this course.
I really like the module session provided before each lecture. Those resource links provide very detailed
and useful introdction of different concepts in the field of web development. I have saved all the posts
in my bookmark in case I need to read them in the future.

## Resources

[Angular 11 + MongoDB example with Node.js Express: CRUD App](https://www.bezkoder.com/angular-11-mongodb-node-js-express/#Setup_Angular_11_Project)  
[Social Network Developed using MEAN stack](https://github.com/GuilleAngulo/social-network-mean)  
[Node.js - Role Based Authorization Tutorial with Example API](https://jasonwatmore.com/post/2018/11/28/nodejs-role-based-authorization-tutorial-with-example-api)  
[Mongoose Populate() Method](https://www.geeksforgeeks.org/mongoose-populate-method/)
[How are parameters sent in an HTTP POST request?](https://stackoverflow.com/questions/14551194/how-are-parameters-sent-in-an-http-post-request).
[Angular - Building a template-driven form](https://angular.io/guide/forms)  
[Bootstrap Tutorial](https://www.tutorialrepublic.com/twitter-bootstrap-tutorial/)

## Code Instruction

Here is the Github link for this project: [https://github.com/ZimoAsura/INFSCI2560](https://github.com/ZimoAsura/INFSCI2560)
To run the project, run the following commands:  
For backend:  
``` 
  cd Frontend 
  npm install 
  ng serve
```
For frontend:    
``` 
  cd Backend 
  npm install 
  node server.js
```
