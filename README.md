# Campboy web application

## 🏀Description

Campboy is for finding campsite and sharing experience by blog content. Allows users to search and filter campsite options showing results by Google Maps and allow users toperform CRUD operations on blog posts with reaction (Like,Comment).

The project used with backend project as following :
https://github.com/Tathapong/back_campboy

#### Technologies used

- Front-end : React-JS, Redux, Draft-JS, Sass
- Back-end : Node-JS, Express-JS, Sequelize-JS, Bcrypt-JS, JWT, Google API

## 🏀Features

### 1. Authentication

| Feature         | Content                                     |
| --------------- | ------------------------------------------- |
| Sign up         | register to member and verify by email      |
| Log in          | authenticate with system for member feature |
| Forgot password | change password in forgot password case     |
| Change password | change password in knowing password case    |

### 2. Home page

| Feature        | Content                              |
| -------------- | ------------------------------------ |
| Random camp    | Random campsite for users            |
| Top camps      | Show top scores campsite             |
| More blogs     | Show top scores blog and recent blog |
| Recent reviews | Show recent reviews in campsite      |

### 3. Finding campsite page

| Feature     | Content                                                                          |
| ----------- | -------------------------------------------------------------------------------- |
| Filter camp | Search and filter camp by options (rating, province, type, activities, services) |
| Result camp | Show number and result campsite from filtering                                   |
| Map         | Show markup on the map for each filtered campsite                                |

### 4. Camp page

| Feature     | Content                                        | Remark                       |
| ----------- | ---------------------------------------------- | ---------------------------- |
| Image       | Show image slide of campsite                   | -                            |
| Information | Show information of campsite                   | -                            |
| Contact     | Show contact of campsite                       | -                            |
| Map         | Show markup on the map                         | -                            |
| Review      | Show recent reviews and enable to write review | Only member can write review |

### 5. All blogs page

| Feature           | Content                                                          | Remark                                               |
| ----------------- | ---------------------------------------------------------------- | ---------------------------------------------------- |
| Blog              | Show blog lsit by sorting (Recents, Top pick, *Following, *Save) | Only member show more for Following and save sorting |
| Writer suggestion | Show top writer (member) by follower descending                  | -                                                    |
| Create blog       | Create blog                                                      | Only member                                          |

### 6. Blog page

| Feature        | Content                                      | Remark      |
| -------------- | -------------------------------------------- | ----------- |
| Blog content   | Show all blog content                        | -           |
| Blog operation | Update and delete blog                       | Only member |
| Like & Save    | Member can like and save the blog to my list | Only member |
| Comment        | Member can write comment on the blog         | Only member |

### 7. Profile page

| Feature              | Content                                                         | Remark      |
| -------------------- | --------------------------------------------------------------- | ----------- |
| Profile              | Show information of the profile                                 | -           |
| Edit profile         | Update profile                                                  | Only member |
| Following & Follower | Show account list what is following or follower of the profile. | -           |
| Follow profile       | Member can follow the profile to get content from them          | Only member |
| Blog of profile      | Show the blog that writed by the profile                        | -           |

### 8. Join camp page

| Feature        | Content                                                                | Remark |
| -------------- | ---------------------------------------------------------------------- | ------ |
| Join camp form | Users can send the information about new campsite to the admin by form | -      |

## 🏀How to Install and Run the project

- use git clone
- open project and change directory to the project

---

### 1. Front-end project

- /src/config/env - change API_ENDPOINT_URL as back-end project IP address and port (default : http://192.168.1.33:8000 )
- use "npm install" in terminal
- use "npm start" to run project

### 2. Back-end project

- create env file at root directory of project and create variable as following

        //Server
        - MY_IP (example : http://192.168.1.1)
        - PORT (example : 8000)

        //Cloudinary
        - CLOUDINARY_NAME - cloud_name of cloudinary
        - CLOUDINARY_API_KEY - api_key of cloudinary
        - CLOUDINARY_API_SECRET - api_secret of cloudinary
        - CLOUDINARY_BLOG_FOLDER - folder path for blog image (example : /Campboy/blogs)
        - CLOUDINARY_PROFILE_FOLDER - folder path for profile image (example : /Campboy/users/profile)
        - CLOUDINARY_COVER_FOLDER - folder path for cover image (example : /Campboy/users/cover)
        - CLOUDINARY_DEFAULT_PROFILE_IMAGE - default profile image url for new member
        - CLOUDINARY_DEFAULT_COVER_IMAGE - default cover image url for new member

        //JSON web token
        - JWT_SECRET_KEY - key for jwt (example : password)
        - JWT_EXPIRES - expires condition of jwt (example : 7d or 30d )

        //Google API
        - EMAIL - email for using to admin email
        - PASS  - password for google api
        - REFRESH_TOKEN - refresh_token for google api
        - CLIENT_SECRET - client_secret for google api
        - CLIENT_ID - client_id for google api

- /src/config/config.json - change arguments as your database environment
- /src/app.js - un-comment the line number 14 - 15

- use "npm install" in terminal
- use "npm start" to run first project
- /src/app.js - delete or comment on the line number 14 - 15
- use "npm start" to run project

can see sample video on >>> https://www.youtube.com/watch?v=6bJIOshedlE
---
