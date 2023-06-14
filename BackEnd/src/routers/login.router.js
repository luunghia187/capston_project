module.exports = function (router) {
    var loginController = require('../controller/login.controller');

    router.post("/login", loginController.Login);

    router.post("/user/refresh", loginController.RefreshToken);

    // router.post("/user/logout",
    //     middlewareController.verifyToken,
    //     userController.LogOut
    //   );
    //   router.put("/user/update1",
    //     middlewareController.verifyToken,
    //     userController.UpdateUser
    //   );
    
    //   router.put("/user/updatepassword",
    //     middlewareController.verifyToken,
    //     userController.UpdatePassWord
    //   );
}