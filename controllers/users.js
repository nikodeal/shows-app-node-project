const express = require("express");
const userBL = require("../BL/usersBL");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const bl = await userBL.getUsers();
    console.log("rendered");
    res.render("users", {
      title: "Users",
      msg: "",
      usersArr: bl,
    });
  } catch (err) {
    console.log(err.msg);
  }
});
router.get("/add", (req, res, next) => {
  if (req.session.authenticated) {
    res.render("userForm", {
      title: "Add User",
      msg: "",
      info: "",
      user: "",
      formAction: "add",
      btnInfo: "Submit user",
    });
  } else {
    res.redirect("/");
  }
});
router.post("/add", async (req, res, next) => {
  try {
    const response = await userBL.addUser(req.body, "add");
    res.redirect("/users/");
  } catch (err) {
    console.log(err);
  }
});
router.get("/edit/:editId", async (req, res, next) => {
  try {
    if (req.session.authenticated) {
      const bl = await userBL.getSingleUser(req.params.editId);

      res.render("userForm", {
        title: "Edit User",
        msg: "",
        user: req.params.editId,
        formAction: "edit",
        info: bl.user,
        btnInfo: "Done editing",
      });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const response = await userBL.deleteUser(userId);
    const bl = await userBL.getUsers();
    console.log("rendered");
    res.render("users", {
      title: "Users",
      msg: "",
      usersArr: bl,
    });
  } catch (err) {
    console.log(err);
  }
});
router.post("/edit/:editId", async (req, res, next) => {
  let obj = {
    id: req.params.editId,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    await userBL.addUser(obj, "edit");
    res.redirect("/users/");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
