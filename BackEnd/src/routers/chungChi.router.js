module.exports = function (router) {
    var chungChiController = require('../controller/chungChi.controller');

    router.get("/chungchi/list", chungChiController.get_list);
}