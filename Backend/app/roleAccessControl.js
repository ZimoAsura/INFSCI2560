const AccessControl = require("accesscontrol");
const accessControl = new AccessControl();
const Role = require('./middlewares/role')

exports.roleAccessControl = (function() {
    accessControl.grant(Role.User)
    .readOwn("profile")
    .updateOwn("profile")

    accessControl.grant(Role.Admin)
    .extend(Role.User)
    .readAny("profile")
    .updateAny("profile")
    .deleteAny("profile")

    return accessControl;
})();