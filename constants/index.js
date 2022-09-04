const USER_ROLE = { ADMIN: 0, MEMBER: 1 };
const ACCESS_TYPE = { PRIVATE: 0, PASSWORD_PROTECTED: 1, PUBLIC: 2 };
const ACTION_TYPE = { EDIT: "editableBy", READ: "visibleTo" };


module.exports = {
  USER_ROLE,
  ACCESS_TYPE,
  ACTION_TYPE
};
