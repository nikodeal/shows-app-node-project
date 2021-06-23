const express = require("express");
const router = express.Router();
const showsBuisnesLogic = require("../BL/showsBL");

router.get("/search/:userId/single_show/:showId", async (req, res, next) => {
  if (req.session.authenticated) {
    const bl = await showsBuisnesLogic.getSingleTvShow(req.params.showId);
    res.render("show", {
      title: "Show",
      msg: "",
      user: req.params.userId,
      show: bl,
    });
  } else {
    res.redirect("/");
  }
});

router.get("/create/:userId", async (req, res, next) => {
  if (req.session.authenticated) {
    if (req.params.userId === 1) {
      req.session.transaction = "unlimited";
    } else {
      if (req.session.transaction === 0) {
        req.session.transaction = 0;
      } else {
        req.session.transaction = req.session.transaction-1;
      }
    }
    res.render("createshow", {
      title: "Create Show",
      msg: "",
      user: req.params.userId,
    });
  } else {
    res.redirect("/");
  }
});

router.post("/create/:userId", async (req, res, next) => {
  try {
    if (req.session.authenticated) {
        await showsBuisnesLogic.AddTvShow(req.body, req.params.userId);
      res.redirect("/menu" + "/" + req.params.userId);
    
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.msg);
  }
});

router.get("/search/:userId", async (req, res, next) => {
  try {
    if (req.session.authenticated) {
      if (req.params.userId == 1) {
        req.session.transaction = "unlimited";
      } else {
        if (req.session.transaction === 0) {
          req.session.transaction = 0;
        } else {
          req.session.transaction = req.session.transaction-1;
        }
      }
      res.render("search", {
        title: "Search Show",
        msg: "",
        user: req.params.userId,
      });
    } else {
      res.redirect("/");
    }
  } catch (err) {
    console.log(err.msg);
  }
});

router.post("/search/:userId", async (req, res, next) => {
  try {
    const bl = await showsBuisnesLogic.searchTvShows(req.body);
    if (bl.filteredArr.length <= 0) {
      res.render("searchResult", {
        title: "Search Result",
        user: req.params.userId,
        genres: bl.genre,
        shows: bl.filteredArr,
        msg: "Sorry, no TV shows found.",
        id: req.params.userId,
      });
    } else {
      res.render("searchResult", {
        title: "Search Result",
        user: req.params.userId,
        genres: bl.genre,
        shows: bl.filteredArr,
        msg: "",
        id: req.params.userId,
      });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
