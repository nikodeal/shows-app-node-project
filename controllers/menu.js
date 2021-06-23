const express = require("express");
const router = express.Router();
const menuBuisnessLogic = require("../BL/menuBL");


router.get("/:id", async (req, res, next) => {
  if(req.session.authenticated){
    
     res.render("menu", { title: "Menu", user: req.params.id, trans: req.session.transaction });
  let bl = await menuBuisnessLogic.loadTvShows();
  !bl ? console.log('shows exist') : console.log('loading shows');
  }
  else{
    res.redirect('/')
  }

});
module.exports = router;
