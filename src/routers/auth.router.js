const router = require("express").Router();
const auth = require("../controller/auth");

router.post("/scholar/signin", auth.scholar_signin);
router.post("/scholar/signup", auth.scholar_signup);
router.post("/faculty/signin", auth.faculty_signin);
router.post("/faculty/signup", auth.faculty_signup);

module.exports = router;
