const db = require("./patch-model.js");
const router = require("express").Router();

//// * PATCH METADATA LIST ROUTES * ////

router.get("/os-list", async (req, res) => {
  try {
    const operating_systems = await db.listPatchMetadata(
      "operating_systems as os",
      "os.os_name"
    );
    res.status(200).json({ operating_systems });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.get("/platform-list", async (req, res) => {
  try {
    const platforms = await db.listPatchMetadata(
      "platforms as p",
      "p.platform_name"
    );
    res.status(200).json({ platforms });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.get("/category-list", async (req, res) => {
  try {
    const categories = await db.listPatchMetadata(
      "categories as c",
      "c.category_name"
    );
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.get("/status-list", async (req, res) => {
  try {
    const release_statuses = await db.listPatchMetadata(
      "release_statuses as rs",
      "rs.release_status"
    );
    res.status(200).json({ release_statuses });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

router.get("/metadata-lists", async (req, res) => {
  try {
    const operatingSystems = await db.listPatchMetadata(
      "operating_systems as os",
      "os.os_name",
      "os.id"
    );

    const platforms = await db.listPatchMetadata(
      "platforms as p",
      "p.platform_name",
      "p.id"
    );
    const categories = await db.listPatchMetadata(
      "categories as c",
      "c.category_name",
      "c.id"
    );
    const releaseStatuses = await db.listPatchMetadata(
      "release_statuses as rs",
      "rs.release_status",
      "rs.id"
    );
    const tags = await db.listPatchMetadata("tags as t", "t.tag", "t.id");

    res.status(200).json({
      operatingSystems,
      platforms,
      categories,
      releaseStatuses,
      tags,
    });
  } catch (error) {
    res.status(500).json({ err: error });
  }
});

//// * PATCH CRUD ROUTES * ////

router.get("/:patchName", async (req, res) => {
  try {
    const patch = await db.getPatch(req.params.patchName);

    res.status(200).json(patch);
  } catch (error) {
    res
      .status(500)
      .json({ err: "Error retrieving patch, please try again in a moment" });
  }
});

router.post("/add-patch", async (req, res) => {
  try {
    await db.createPatch(req.body);
    res.status(201).json({ msg: "Successfully created patch" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ err: "Error adding patch, please try again in a moment" });
  }
});

module.exports = router;
