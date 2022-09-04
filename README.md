# Quizlet Clone Back-end

### How it works
- Unlike Quizlet, you can create markdown flashcards with code or fancy math equations.
- Folders contain Decks. A Deck can be added to multiple Folders.
- Decks contain cards that are written in markdown.
  
### Features
- User authentication with JWT
- CRUD Folders
- CRUD Decks
- Decks can be private, public, or password-protected
- CRUD Cards with abilty to star/unstar card

### Built With
- Node.js with Express.js Framework
- MongoDB

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
```

```

