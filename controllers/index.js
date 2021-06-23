const express = require("express");
const userBL = require("../BL/usersBL");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index", { title: "Login", msg: "" });
});
router.post("/", async (req, res, next) => {
  const userObj = {
    username: req.body.username,
    password: req.body.password,
  };
  let bl = await userBL.logUser(userObj);
  try {
    if (bl.flag == true) {
      req.session["authenticated"] = true;
      
      if (userObj.username == "admin") {
        req.session.transaction = "unlimited";
      } else {
        req.session.transaction = 10;
      }
      res.redirect("/menu" + "/" + bl.id);
    } else {
      res.render("index", {
        title: "Login",
        msg: "The values provided do not match.",
      });
    }
  } catch (err) {
    return res.send(err);
  }
});
module.exports = router;
