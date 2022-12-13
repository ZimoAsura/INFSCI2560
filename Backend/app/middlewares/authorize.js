const { roleAccessControl } = require('../roleAccessControl')

exports.grantAccess = function (action, resource) {
    return async (req, res, next) => {
     try {
      const permission = roleAccessControl.can(req.user.role)[action](resource);
      console.log(req.user.role)
      if (!permission.granted) {
       return res.status(401).json({
        error: "You don't have enough permission to perform this action"
       });
      }
      next()
     } catch (error) {
      next(error)
     }
    }
}
   
exports.allowIfLoggedin = async (req, res, next) => {
    try {
     const user = res.locals.loggedInUser;
     console.log("logged in", user.username)
     if (!user)
      return res.status(401).json({
       error: "You need to be logged in to access this route"
      });
      req.user = user;
      next();
     } catch (error) {
      next(error);
     }
}