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

// GET patch by ID
router.get("/:patchID", async (req, res) => {
  try {
    const patch = await db.getPatchById(req.params.patchID);
    res.status(200).json(patch);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ err: "Error retrieving patch, please try again in a moment" });
  }
});

// SEARCH patch by NAME
router.get("/:patchName/search", async (req, res) => {
  try {
    const patch = await db.searchPatches(req.params.patchName);
    res.status(200).json(patch);
  } catch (error) {
    res
      .status(500)
      .json({ err: "Error searching for patch, please try again in a moment" });
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

router.put("/:patchID", async (req, res) => {
  try {
    await db.updatePatch(req.params.patchID, req.body);
    res.status(204).json({ msg: "Successfully updated patch" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to update patch" });
  }
});

router.delete("/:patchName", async (req, res) => {
  try {
    await db.deletePatch(req.params.patchName);
    res.status(200).json({ msg: "Successfully deleted patch" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to delete patch" });
  }
});

//// * PATCH VERSION CRUD ROUTES * ////

// router.get("/:patchName/versions", async (req, res) => {
//   try {
//     const patch = await db.getPatchVersions(req.params.patchName);
//     res.status(200).json(patch);
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to retrieve patch version" });
//   }
// });

// router.post("/:patchName/versions", async (req, res) => {
//   try {
//     await db.addPatchVersion(req.params.patchName, req.body);
//     res.status(201).json({ msg: "Successfully created patch version" });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to create patch version" });
//   }
// });

// router.put("/:patchName/versions", async (req, res) => {
//   try {
//     await db.updatePatchVersion(req.params.patchName, req.body);
//     res.status(201).json({ msg: "Successfully updated patch version" });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to update patch version" });
//   }
// });

// router.delete("/:patchName/versions", async (req, res) => {
//   try {
//     await db.deletePatchVersion(req.params.patchName);
//     res.status(200).json({ msg: "Successfully deleted patch version" });
//   } catch (error) {
//     res.status(500).json({ msg: "Failed to delete patch version" });
//   }
// });

//// * GET USER PATCHES * ////
// accepts querystring ?userID=id
router.get("/", async (req, res) => {
  try {
    const patches = await db.getUserPatches(req.query.userID);

    res.status(200).json({ msg: "Fetched your patches successfully", patches });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ err: "Error retrieving your patches, try again in a moment" });
  }
});

module.exports = router;
