const express = require("express");
const {
  home,
  adminLogin,
  userLogin,
  userSignup,
  verifyToken,
  adminUpdate,
  getAllAdmins,
  addNewAdmin,
} = require("../controllers");

const router = express.Router();

router.route("/").get(home);
router.route("/user/auth").post(userLogin);
router.route("/admin/auth").post(adminLogin);
router.route("/user/auth/signup").post(userSignup);
router.route("/verifyToken").post(verifyToken);
router.route("/admin/update-profile").post(adminUpdate);
router.route("/admin/all-admins").get(getAllAdmins);
router.route("/admin/add-admin").post(addNewAdmin);

module.exports = router;
