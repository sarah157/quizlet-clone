# Quizlet Clone Back-end

### Features
- User authentication with JWT
- CRUD Folders
- CRUD Decks
- Decks can be private, public, or password-protected
- CRUD Cards with abilty to star/unstar card

### Built With
- Node.js with Express.js Framework
- MongoDB
- Mongoose
- JSON Web Token
- Bcrypt.js

## Usage
### Env variables
Create a .env file in the root directory and add the following:
```
MONGO_URI=mongouri
JWT_SECRET=jwtsecret
JWT_LIFETIME=jwtlifetime
```

### Run 
```
$ npm install
$ nodemon start
