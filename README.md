# GameOn API

Back-end support for the GameOn iOS app.

## Features

- User registration
- User login
- List all users
- Create a game
- View detailed game information
- Join an existing game
- Find games near X,Y location
- Delete a game
- Post a comment
- Delete a comment
- Retrieve all comments for a specific user

## How to use

### Creating a new user
*Creates a new MongoDB document*

**POST** /users/create
- name: `String`
- email: `String`
- password: `String`
- avatar: `String`
- bio: `String`

**Return** User Object

    {
      "__v": 0,
      "name": "Sahat",
      "email": "sahat@msn.com",
      "password": "$2a$10$SlwV26HWLaRSxGDwy.pT6uJrAthjHFIuYkEer6WQ19EEiWHyEpcoC",
      "avatar": "avatar.jpeg",
      "bio": "my_biography_block",
      "_id": "50b2410f5d33a21209000002",
      "created_on": "2012-11-25T16:02:23.264Z"
    }

### User sign-in
*Allows a user to login into the system*

**POST** /login
- email: `String`
- password: `String`

**Return** void

### Get all users
*Queries MongoDB for all user objects, excluding the password field*

**GET** /users
- No params

**Return** All user objects


