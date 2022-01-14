const USER_ROLE = { ADMIN: 0, MEMBER: 1 };
const ACCESS_TYPE = { PRIVATE: 0, PASSWORD_PROTECTED: 1, PUBLIC: 2 };
const ACTION_TYPE = { EDIT: "editableBy", READ: "visibleTo" };
const ALLOWED_FOLDER_FIELDS = ["title"];
const ALLOWED_CARD_FIELDS = ["content", "starred", "deckId"];
const ALLOWED_USER_FIELDS = ["email", "username"];
const ALLOWED_DECK_FIELDS = [
  "editableBy",
  "visibleTo",
  "password",
  "title",
  "description",
];

module.exports = {
  USER_ROLE,
  ACCESS_TYPE,
  ACTION_TYPE,
  ALLOWED_DECK_FIELDS,
  ALLOWED_CARD_FIELDS,
  ALLOWED_USER_FIELDS,
  ALLOWED_FOLDER_FIELDS,
};
