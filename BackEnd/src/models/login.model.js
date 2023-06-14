const db = require('../common/connect');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = function (login) {
    this.TK = login.TK;
    this.MK = login.Mk;
}

// User.Register = (data, result) => {
//     db.query("select * from To_Chuc where TK_ToChuc = ? AND MK_ToChuc = ?",
//     [data.TK, data.MK], (err, user) => {
//       if (user.length == 0) {
//         db.query(
//           "INSERT INTO user ( User_Name, User_Password,Email,Phone_Number) VALUES (?,?,?,?);",
//           [data.username, data.password, data.email, data.phone],
//           function (err, user) {
//             if (err) {
//               result(403, "Registration failed");
//             } else {
//               result(200, "Registration successfuly");
//             }
//           }
//         );
//       } else {
//         result(400, "Email have already!");
//       }
//     });
//   };
Login.generateAccessToken = (user) => {
    return jwt.sign(
      {
        id: user.ID,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "30s",
      }
    );
  };
Login.generateRefreshToken = (user) => {
    return jwt.sign(
      {
        id: user.ID,
      },
      process.env.JWT_REFRESH_KEY,
      {
        expiresIn: "30d",
      }
    );
  };
  //check refresToken
  Login.checkRefreshToken = (refreshToken, result) => {
    db.query(
      "select * from refreshtoken where token = ?",
      refreshToken,
      (err, token) => {
        if (err) {
          console.log(err);
        } else {
          if (token.length == 0) {
            result(403, "Refresh token is not valid!");
          }
        }
      }
    );
  };
  //deleterefreshtoken
  Login.deleteRefreshToken = (refreshToken, result) => {
    db.query(
      "delete from refreshtoken where token = ?",
      refreshToken,
      (err, token) => {
        if (err) {
          console.log(err);
        } else {
          console.log("ok");
        }
      }
    );
  };
  Login.deleteAllRefreshToken = () => {
    db.query("delete from refreshtoken", (err, token) => {
      if (err) {
        console.log(err);
      }
    });
  };
  //add refreshToken vao CSDL
  Login.addRefreshToken = (refreshtoken) => {
    console.log("refresh token nek", refreshtoken);
    db.query(
      "INSERT INTO refreshtoken (token) VALUES (?)",
      refreshtoken,
      (err, token) => {
        if (err) {
          console.log(err);
        } else {
          console.log("da add refresh token");
        }
      }
    );
  };
  Login.Login = (TK, MK, result) => {
    console.log("loni", TK);
    db.query("Select * from To_Chuc where TK_ToChuc = ? And MK_ToChuc = ?", [TK, MK], (err, user) => {
      console.log(MK);
      console.log("user nek", user);
      if (err || user.length == 0) {
        result(400, "Wrong TK!");
      } else {
        // bcrypt.compare(MK, user[0].MK_ToChuc, async (err, data) => {
        //   if (data == true) {
            const accessToken = Login.generateAccessToken(user[0]);
            const refreshToken = Login.generateRefreshToken(user[0]);
            Login.addRefreshToken(refreshToken);
  
            result(200, ...user, accessToken, refreshToken);
        //   } else {
        //     result(400, "Wrong password!");
        //     console.log(data);
        //   }
        // });
      }
    });
  };
  Login.get_all = function (result) {
    db.query("select * from To_Chuc", function (err, user) {
      if (err) {
        result(err);
      } else {
        result(user);
      }
    });
  };
  
//   User.UpdateUser = (id, username, phone, result) => {
//     db.query(
//       "update user set User_Name = ? , Phone_Number = ? where ID_User = ?",
//       [username, phone, id],
//       (err, user) => {
//         if (err) {
//           return result(400, "Error when update user!");
//         } else {
//           db.query("select * from user where ID_User = ?", id, (err, user) => {
//             if (err) {
//               console.log(err);
//             } else {
//               return result(200, ...user);
//             }
//           });
//         }
//       }
//     );
//   };
//   User.UpdatePassWord = async (id, oldpass, password, result) => {
//     console.log(id, password);
//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password.toString(), salt);
//     db.query("select * from user where ID_User = ?", id, (err, user) => {
//       if (err) {
//         return result(400, "Error when update Password!");
//       } else {
//         console.log(oldpass);
//         bcrypt.compare(oldpass, user[0].User_Password, (err, data) => {
//           console.log(data);
//           if (data == true) {
//             db.query(
//               "update user set User_Password = ? where ID_User = ?",
//               [hashed, id],
//               (err, user) => {
//                 if (err) {
//                   return result(400, "Error when update Password!");
//                 } else {
//                   return result(200, "Update Password Success!");
//                 }
//               }
//             );
//           } else {
//             return result(400, "wrong old password!");
//           }
//         });
//       }
//     });
//   };
  ///cua nghia
//   User.get_all = function (result) {
//     db.query("select * from user", function (err, user) {
//       if (err) {
//         result(err);
//       } else {
//         result(user);
//       }
//     });
//   };
  
//   User.getById = function (id, result) {
//     db.query("select * from user where Id_User = ?", id, function (err, user) {
//       if (err || user.length == 0) {
//         result(err);
//       } else {
//         result(user);
//       }
//     });
//   };
  
//   User.add = function (data, result) {
//     db.query(
//       "INSERT INTO user (ID_User, User_Name, User_Password,Email,Phone_Number) VALUES (?,?,?,?,?);",
//       [
//         data.ID_User,
//         data.User_Name,
//         data.User_Password,
//         data.Email,
//         data.Phone_Number,
//       ],
//       function (err, user) {
//         console.log(err, data);
//         if (err) {
//           result(null);
//         } else {
//           result(data);
//         }
//       }
//     );
//   };
  
//   User.remove_user = function (id, result) {
//     db.query("delete from user where Id_User = ?", id, function (err, user) {
//       if (err) {
//         result(null);
//       } else {
//         result(user);
//       }
//     });
//   };
  
//   User.update = function (u, result) {
//     db.query(
//       "update user set User_Name=?,User_Password=?,Email=?,Phone_Number=? where Id_User = ?",
//       [u.User_Name, u.User_Password, u.Email, u.Phone_Number, u.ID_User],
//       function (err, u) {
//         console.log(err);
//         if (err) {
//           console.log(err);
//           result(err);
//         } else {
//           result(u);
//         }
//       }
//     );
//   };

module.exports = Login;