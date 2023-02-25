const passport = require("passport");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).send({ message: "works fine" });
});

router.get(
  "/auth",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send({ message: "auth works fine" });
  }
);

// TODO task for now
// router.delete("/delete", testRoutesMw.deleteMw);

module.exports = router;
