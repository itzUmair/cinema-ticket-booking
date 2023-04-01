const express = require("express");
const {
  home,
  adminLogin,
  userLogin,
  userSignup,
  verifyToken,
  adminUpdate,
} = require("../controllers");

const router = express.Router();

router.route("/").get(home);
router.route("/user/auth").post(userLogin);
router.route("/admin/auth").post(adminLogin);
router.route("/user/auth/signup").post(userSignup);
router.route("/verifyToken").post(verifyToken);
router.route("/admin/update-profile").post(adminUpdate);

module.exports = router;
