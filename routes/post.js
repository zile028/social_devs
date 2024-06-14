const {Router} = require("express");
const router = Router();

router.get("/", require("../controllers/post/getAll"));
router.get("/:id", require("../controllers/post/singlePost"));

module.exports = router;