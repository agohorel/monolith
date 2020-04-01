const db = require("./patch-model.js");
const router = require("express").Router();

router.get("/:patchName", async (req, res) => {
  try {
    const patch = await db.getPatch(req.params.patchName);
    res.status(200).json(patch);
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

module.exports = router;
