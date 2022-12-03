require("dotenv").config();

const express = require("express");
const session = require("express-session");
// const session = require("cookie-session");
const flash = require("connect-flash");
const app = express();
const port = process.env.PORT || 5001;

const faqController = require("./controllers/faq");
const menuController = require("./controllers/menu");
const prizeController = require("./controllers/prize");
const userController = require("./controllers/user");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(flash());
app.use(express.static(`${__dirname}/public`));

app.use(
  session({
    secret: "process.env.SESSION_SECRET",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

function redirectBack(req, res) {
  res.redirect("back");
}

function isAdmin(req, res, next) {
  if (req.session.username !== "admin") {
    return res.redirect("/");
  }
  return next();
}

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/draw", prizeController.index);
app.get("/menu", menuController.index);
app.get("/faq", faqController.index);

app.get("/api", prizeController.api);

app.get("/signup", userController.signup);
app.post("/signup", userController.handleSignup, redirectBack);
app.get("/login", userController.login);
app.post("/login", userController.handleLogin, redirectBack);
app.get("/logout", userController.logout);

app.get("/cms", isAdmin, userController.cms);
app.get("/cms/prize", isAdmin, prizeController.managePrize);
app.get("/cms/faq", isAdmin, faqController.manageFaq);
app.get("/cms/menu", isAdmin, menuController.manageMenu);

app.get("/cms/add-prize", isAdmin, prizeController.add);
app.post(
  "/cms/add-prize",
  isAdmin,
  prizeController.handleNewPrize,
  redirectBack
);
app.get("/cms/delete-prize/:id", isAdmin, prizeController.delete);
app.get("/cms/edit-prize/:id", isAdmin, prizeController.edit);
app.post(
  "/cms/edit-prize/:id",
  isAdmin,
  prizeController.handleEdit,
  redirectBack
);

app.get("/cms/add-faq", isAdmin, faqController.add);
app.post("/cms/add-faq", isAdmin, faqController.handleNewFaq, redirectBack);
app.get("/cms/delete-faq/:id", isAdmin, faqController.delete);
app.get("/cms/edit-faq/:id", isAdmin, faqController.edit);
app.post("/cms/edit-faq/:id", isAdmin, faqController.handleEdit, redirectBack);

app.get("/cms/add-menu", isAdmin, menuController.add);
app.post("/cms/add-menu", isAdmin, menuController.handleNewMenu, redirectBack);
app.get("/cms/delete-menu/:id", isAdmin, menuController.delete);
app.get("/cms/edit-menu/:id", isAdmin, menuController.edit);
app.post(
  "/cms/edit-menu/:id",
  isAdmin,
  menuController.handleEdit,
  redirectBack
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
