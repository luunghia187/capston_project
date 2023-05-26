const db = require('../common/connect');
const ChungChi= function (chungChi) {
    this.ID_Vanbang = chungChi.ID_Vanbang;
    this.Ten_Vanbang = chungChi.Ten_Vanbang;
    this.Mo_Ta = chungChi.Mo_Ta;
    this.Ngay_Cap = chungChi.Ngay_Cap;
    this.Ngay_Het_Han = chungChi.Ngay_Het_Han;
    this.Noi_Cap = chungChi.Noi_Cap;
    this.Nguoi_Nhan = chungChi.Nguoi_Nhan;
    this.File_Vanbang = chungChi.File_Vanbang;
}

ChungChi.get_all = function (result) {
    db.query("select * from Van_Bang", function (err, tB) {
        if (err) {
            result(err);
        } else {
            result(tB);
        }
    });
};

// DoanhThu.getById = function (id, result) {
//     db.query("select * from doanh_thu where id = ?", id, function (err, tB) {
//         if (err || tB.length == 0) {
//             result(err);
//         } else {
//             result(tB);
//         }
//     });
// };

// DoanhThu.add = function (data, result) {
//     db.query("INSERT INTO doanh_thu (id, ngay, doanh_thu) VALUES (?,?,?);", [data.id, data.ngay, data.doanh_thu], function (err, tB) {
//         console.log(err, data)
//         if (err) {
//             result(null);
//         } else {
//             result(data);
//         }
//     });
// };

// DoanhThu.remove = function (id, result) {
//     db.query("delete from doanh_thu where id = ?", id, function (err, tB) {
//         if (err) {
//             result(null);
//         } else {
//             result(tB);
//         }
//     });
// }

// DoanhThu.update = function (u, result) {
//     db.query("update doanh_thu set ngay=?,doanh_thu=? where id = ?", [u.ngay, u.doanh_thu, u.id], function (err, u) {
//         console.log(err)
//         if (err) {
//             console.log(err);
//             result(err);
//         } else {
//             result(u);
//         }
//     })
// };

module.exports = ChungChi;