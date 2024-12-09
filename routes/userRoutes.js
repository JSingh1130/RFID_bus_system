
const express = require("express");
const session = require("express-session");
const auth = require("../middleware/auth");
const userRoute = express();
const path = require("path");
const userController = require("../controllers/userController");
const bodyParser = require("body-parser");

// Firebase integration


//--------------------------------------------------------------------
userRoute.use(session({ secret: "myecret", resave: false, saveUninitialized: true }));
userRoute.use(express.static(path.join(__dirname, "../public")));
userRoute.set("view engine", "ejs");

//---------------------------------------------------------------------
userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));

//---------------------------GET----------------------------------------
userRoute.get("/", userController.loadLandingPage);

userRoute.get("/login", auth.isLogout, userController.loadLogin);

userRoute.get("/logout", auth.isLogin, userController.userLogout);

userRoute.get("/register", auth.isLogout, userController.loadRegister);

userRoute.get("/create", auth.isLogin, userController.loadCreate);

userRoute.get("/update", auth.isLogin, userController.loadUpdate);

userRoute.get("/find", auth.isLogin, userController.loadFind);

userRoute.get("/pass", auth.isLogin, userController.loadPass);

userRoute.get("/recharge", auth.isLogin, userController.loadRecharge);

userRoute.get("/card", auth.isLogin, userController.loadCard);

//---------------------------POST-----------------------------------------
userRoute.post("/", userController.verifyLogin);

// POST route to handle SmartPass registration with Firebase Realtime Database
//userRoute.post("/registerWithFirebase", userController.registerWithFirebase); // This now uses the Firebase registration function

//------------------------------------------------------------------------
module.exports = userRoute;
