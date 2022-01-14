const USER_ROLE = { ADMIN: 0, MEMBER: 1 };
const ACCESS_TYPE = { PRIVATE: 0, PASSWORD_PROTECTED: 1, PUBLIC: 2 };
const ACTION_TYPE = {EDIT: "editableBy", READ: "visibleTo"}
const ALLOWED_DECK_FIELDS = ["editableBy", "visibleTo", "password", "title", "description"]
const ALLOWED_CARD_FIELDS = ["content", "starred", "deckId"]

module.exports = { USER_ROLE, ACCESS_TYPE, ACTION_TYPE, ALLOWED_DECK_FIELDS, ALLOWED_CARD_FIELDS };