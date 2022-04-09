# Quizlet Clone/test

### What makes this different?
Unlike Quizlet, you can create markdown flashcards with code or fancy math equations.

### How it works
- Folders contain Decks. A Deck can be added to multiple Folders.
- Decks contain cards that are written in markdown.
  
### Features
- User authentication with JWT
- CRUD Folders
- CRUD Decks
- Decks can be private, public, or password-protected
- CRUD Cards with abilty to star/unstar card

### Built With
**Back-end**
- Node.js with Express.js Framework
- MongoDB

**Front-end**
- React (in-progress)

### To-do
- CRUD Classrooms
  - Admin can add Folders, Decks, and Members to a Classroom.
  - Admin can remove all Folders, Decks, and Members
  - Members can add Decks and Members (if allowed by Admin)
  - Members can only remove their own Decks
