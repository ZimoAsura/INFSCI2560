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
    .updateAny("user")
    .updateAny("post")
    .deleteAny("user")

    return accessControl;
})();