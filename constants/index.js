const USER_ROLE = { ADMIN: 0, MEMBER: 1 };
const ACCESS_TYPE = { PRIVATE: 0, PASSWORD_PROTECTED: 1, PUBLIC: 2 };
const ACTION_TYPE = { EDIT: "editableBy", READ: "visibleTo" };

const REQUIRED_FIELDS = {
  decks: ["title"],
  cards: ["content", "deckId"],
  folders: ["title"],
  register: ["email", "password", "username"],
  login: ["password", "username"],
};

const EDITABLE_FIELDS = {
  decksAdmin: ["editableBy", "visibleTo", "password", "title", "description"],
  decks: ["title", "description"],
  cards: ["content", "starred", "deckId"],
  folders: ["decks", "title", "description"],
  users: ["email", "username"],
};


module.exports = {
  USER_ROLE,
  ACCESS_TYPE,
  ACTION_TYPE,
  REQUIRED_FIELDS,
  EDITABLE_FIELDS,
};
