const bcrypt = require("bcrypt");
const saltRounds = 10;
const db = require("../models");
const { User } = db;

const userController = {
  signup: (req, res) => {
    res.render("user/signup");
  },

  handleSignup: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }

    try {
      let user = await User.findOne({
        where: {
          username,
        },
      });
      if (user) {
        req.flash("errorMessage", "user exists");
        return next();
      }
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }

    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        req.flash("errorMsg", "please try again");
        return next();
      }

      try {
        const userData = await User.create({
          username,
          password: hash,
        });

        req.session.username = userData.username;
        res.redirect("/");
      } catch (err) {
        if (err.parent.errno === 1062) {
          req.flash("errorMsg", "user exits");
          return next();
        }
        req.flash("errorMsg", "something went wrong");
        return next();
      }
    });
  },

  login: (req, res) => {
    res.render("user/login");
  },

  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("errorMessage", "Please fill in all the required fields.");
      return next();
    }

    try {
      const user = await User.findOne({
        where: {
          username,
        },
      });
      if (!user) {
        req.flash("errorMessage", "invalid username or password");
        return next();
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash("errorMessage", "invalid username or password");
          return next();
        }
        req.session.username = user.username;
        req.session.userId = user.id;
        return res.redirect("/");
      });
    } catch (err) {
      req.flash("errorMessage", err.toString());
      return next();
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    return res.redirect("/");
  },

  cms: (req, res) => {
    res.render("cms/cms");
  },
};

module.exports = userController;
