const { response } = require('express');
const login = require('../models/login.model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// exports.Register = async (req, res) => {
//     try {
//       if (req.body.password != req.body.confpassword) {
//         return res
//           .status(400)
//           .json({ msg: "Password and ConfirmPassWord not match" });
//       }
//       const salt = await bcrypt.genSalt(10);
//       const hashed = await bcrypt.hash(req.body.password, salt);
//       data = req.body;
//       data.password = hashed;
//       login.Register(data, (sta, msg) => {
//         return res.status(sta).json({ msg });
//       });
//     } catch (err) {
//       return res.status(400).json(err);
//     }
//   };
  exports.Login = async (req, res) => {
    try {
      console.log("email ben ni", req.body.TK);
      login.Login(
        req.body.TK,
        req.body.MK,
        (sta, user, accessToken, refreshToken) => {
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/",
          });
          user.User_Password = "";
          if (sta == 400) {
            return res.status(400).json({ msg: user });
          } else {
            return res.status(sta).json({ ...user, accessToken });
          }
        }
      );
    } catch (err) {
      res.status(500).json(err);
    }
  };
  exports.get_list = (req, res) => {
    login.get_all((data) => {
      res.send({ result: data });
    });
  };
  exports.RefreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json("You're not authenticated trong refresh");
      login.checkRefreshToken(refreshToken, (sta, respon) => {
      return res.status(sta).json(respon);
    });
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) console.log(err);
      login.deleteRefreshToken(refreshToken);
      const newAccessToken = login.generateAccessToken(user);
      const newRefreshToken = login.generateRefreshToken(user);
      login.addRefreshToken(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  };
  exports.LogOut = async (req, res) => {
    res.clearCookie("refreshToken");
    login.deleteAllRefreshToken();
    res.status(200).json("Logged out successfully!");
  };