const {Router} = require("express");
const router = Router();


router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.use("/auth", require("./auth"));

router.get("*", (req, res) => {
    res.render("404");
});

module.exports = router;