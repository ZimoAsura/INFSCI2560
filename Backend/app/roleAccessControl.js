const AccessControl = require("accesscontrol");
const accessControl = new AccessControl();
const Role = require('./middlewares/role')

exports.roleAccessControl = (function() {
    accessControl.grant(Role.User)
    .readAny("post")
    .createOwn("post")
    .updateAny("post")
    .deleteOwn("post")

    accessControl.grant(Role.Admin)
    .extend(Role.User)
    .readAny("post")
    .readAny("user")
    .updateAny("post")
    .deleteAny("post")

    return accessControl;
})();