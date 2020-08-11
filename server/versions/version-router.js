const db = require("./version-model.js");
const router = require("express").Router();

//// * PATCH VERSION CRUD ROUTES * ////

router.get("/:versionID", async (req, res) => {
  try {
    const patch = await db.getPatchVersionById(req.params.versionID);
    res.status(200).json(patch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to retrieve patch version" });
  }
});

router.post("/:patchID", async (req, res) => {
  try {
    await db.createPatchVersion(req.params.patchID, req.body);
    res.status(201).json({ msg: "Successfully created patch version" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to create patch version" });
  }
});

router.put("/:versionID", async (req, res) => {
  try {
    await db.updatePatchVersion(req.params.versionID, req.body);
    res.status(200).json({ msg: "Successfully updated patch version" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to update patch version" });
  }
});

router.delete("/:versionID", async (req, res) => {
  try {
    await db.deletePatchVersion(req.params.versionID);
    res.status(200).json({ msg: "Successfully deleted patch version" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to delete patch version" });
  }
});

module.exports = router;
