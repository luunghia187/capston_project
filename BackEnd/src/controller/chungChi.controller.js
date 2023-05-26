const { response } = require('express');
const chungChi = require('../models/chungChi.model');

exports.get_list = function (req, res) {
    chungChi.get_all(function (data) {
        res.send({ result: data });
    });
}

// exports.detail = function (req, res) {
//     giaoDich.getById(req.params.id, function (response) {
//         res.send({ result: response });
//     });
// }

// //body-parser
// exports.add = function (req, res) {
//     var data = req.body;
//     console.log(req.body);
//     giaoDich.add(data, function (respnse) {
//         res.send({ result: respnse });
//     });
// }

// exports.getByIdUser = function (req, res) {
//     giaoDich.getByIdUser(req.params.id, function (response) {
//         res.send({ result: response });
//     });
// }

// exports.remove = function (req, res) {
//     var id = req.params.id;
//     giaoDich.remove_dg(id, function (response) {
//         res.send({ result: response });
//     })
// }

// exports.update = function (req, res) {
//     var data = req.body;
//     giaoDich.update(data, function (response) {
//         res.send({ result: response });
//     });
// }


