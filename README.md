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
```

# API Docs

**Possible** **HTTP response status codes**

| Status Code | Description |
| --- | --- |
| 200 | OK |
| 201 | Created |
| 304 | Not Modified |
| 400 | Bad Request, invalid body/query params |
| 401 | Unauthorized, token invalid or not provided |
| 403 | Forbidden, |
| 404 | Not found |

## Auth

### `/auth/login`

`POST`

- **Body Parameters**
    - `username` (string, required)
    - `password` (string, required)

### `/auth/register`

`POST`

- **Body Parameters**
    - `username` (string, required)
    - `email` (string, required)
    - `password` (string, required)

**Sample Request and Response (200)**

```
curl -X POST 'localhost:3005/auth/register' \
-H 'Content-Type: application/json' \
-d '{
    "username": "sarah",
    "email": "sarah@email.com",
    "password": "helloworld"
}'
```

```json
{
    "username": "sarah",
    "email": "sarah@email.com",
    "_id": "65583c97beffd6754e68b3e8",
    "createdAt": "2023-11-18T04:24:55.049Z",
    "updatedAt": "2023-11-18T04:24:55.049Z",
    "__v": 0,
    "token": "your_secret_token"
}
```

## Users

### `/users/:userId`

- User must have admin access or must have user id equal to `userId`

`GET` get user with id `userId`

`PATCH` update user with id `userId`

- **Body Parameters. At least one of:**
    - `username` (string)
    - `email` (string)
- **Example**
    
    ```
    curl -X PATCH 'localhost:3005/users/65583c97beffd6754e68b3e8' \
      -H 'Authorization: Bearer '"$TOKEN"'' \
      -d '{
        "username": "sarah127",
        }'
    ```
    

`DELETE` delete user with id `user`

## Folders

### `/folders`

`GET` get all folders for given user

- **Query Parameters. Required one of:**
    - `username` (string)
    - `userId` (string)
- If both are given, `userId` is used

`POST` create folder

- **Body Parameters:**
    - `title` (string, required, length 1 - 60 chars)
    - `description` (string, optional)

### `/folders/:folderId`

`GET` get folder with id `folderId`

`PATCH` update folder with id `folderId`

- **Body Parameters. At least one of:**
    - title (string, length 1 - 60)
    - description (string)

`DELETE` delete folder with id `folderId`

### `/folders/:folderId/decks`

`POST` add deck to folder

- **Body Parameters:**
    - `deckId` (string, required)

### `/folders/:folderId/decks/:deckId`

`DELETE` delete deck from folder

## Decks

### `/decks`

`GET` get all decks for a user

- **Query Parameters. Required one of:**
    - `username` (string)
    - `userId` (string)
- If both are given, `userId` is used
- Example
    
    ```
    curl 'localhost:3005/decks?username=sarah' \
      -H 'Authorization: Bearer '"$TOKEN"''
    ```
    

`POST` create deck

- **Body Parameters:**
    - `title` (string, required, max length 60 chars)
    - `description` (string, optional, default “”)
    - `editableBy` (number 0, 1 or 2, optional, default 0)
        - (0 = private, 1 = password protected, 2 = public)
    - `visibleTo` (number 0, 1 or 2, optional, default 2)
        - (0 = private, 1 = password protected, 2 = public)
    - `password` (string, required if `editableBy` or `visibleTo` is 1)

### `/decks/:deckId`

`GET` get deck with id `deckId`

`PATCH` update deck with id `deckId`

- See `POST` `/decks` for possible body parameters

`DELETE` delete deck with id `deck`

### `/decks/reorder-card`

`PUT` update card index/position in deck

- **Body Parameters:**
    - `cardId` (string, required)
    - `index` (number, required)
        - If card index is greater than the deck length, card is moved to the end
        - If card index is less than zero, card is moved to the front

## Cards

### `/cards`

`GET` get all cards for given deck
- **Body Parameters:**
    - `deckId` (string, required)
      
`POST` create card

- **Body Parameters:**
    - `content` (string, required)
    - `deckId` (string, required)
    - `index` (number, optional)
        - index the card should be inserted in deck with id of deckId
        - if index is not given, card is inserted at the end of the deck

### `/cards/:cardId`

`GET` get card with id `cardId`

`PATCH` update card with id `cardId`

- **Body Parameters:**
    - `content` (string, required)

`DELETE` delete card with id `card`

### `/cards/:cardId/star`

`GET` check if card with id `cardId` is starred

`PUT` star card with id `cardId`

`DELETE` unstar card with id `cardId`
