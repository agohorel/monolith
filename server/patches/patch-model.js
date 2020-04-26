const db = require("../db/connections.js");

async function getPatchDetails(patchName) {
  return db("patches as p")
    .select(
      "p.name",
      "p.image_url",
      "p.preview_url",
      "p.repo_url",
      "p.homepage_url"
    )
    .where({ "p.name": patchName })
    .first();
}

async function getPatchOperatingSystems(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("os.os_name as os")
    .join("patch_os as pos", { "pos.patch_fk": "p.id" })
    .join("operating_systems as os", { "os.id": "pos.os_fk" })
    .where({ "p.name": patchName });

  data.forEach((item) => arr.push(item.os));

  return arr;
}

async function getPatchPlatforms(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("platforms.platform_name as platform")
    .join("patch_platform as pp", { "pp.patch_fk": "p.id" })
    .join("platforms", { "platforms.id": "pp.platform_fk" })
    .where({ "p.name": patchName });

  data.forEach((item) => arr.push(item.platform));

  return arr;
}

async function getPatchCategories(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("c.category_name as category")
    .join("patch_category as pc", { "pc.patch_fk": "p.id" })
    .join("categories as c", { "c.id": "pc.category_fk" })
    .where({ "p.name": patchName });

  data.forEach((item) => arr.push(item.category));

  return arr;
}

async function getPatchTags(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("t.tag as tag")
    .join("patch_tags as pt", { "pt.patch_fk": "p.id" })
    .join("tags as t", { "t.id": "pt.tag_fk" })
    .where({ "p.name": patchName });

  data.forEach((item) => arr.push(item.tag));

  return arr;
}

async function getPatchVersions(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select(
      "v.version_name as version",
      "v.description",
      "vf.*",
      "rs.release_status as releaseStatus"
    )
    .join("versions as v", { "p.id": "v.patch_fk" })
    .join("version_status as vs", { "v.id": "vs.version_fk" })
    .join("version_files as vf", { "v.id": "vf.version_fk" })
    .join("release_statuses as rs", { "vs.status_fk": "rs.id" })
    .where({ "p.name": patchName });

  data.forEach((item) =>
    arr.push({
      [item.version]: {
        status: item.releaseStatus,
        description: item.description,
        linuxUrl: item.linux_file_url,
        macUrl: item.mac_file_url,
        windowsUrl: item.windows_file_url,
        androidUrl: item.android_file_url,
        iosUrl: item.ios_file_url,
      },
    })
  );

  return arr;
}

async function getUserPatches(userID) {
  return db("users as u")
    .select("p.name", "p.image_url")
    .join("user_patches as up", { "u.id": "up.user_fk" })
    .join("patches as p", { "up.patch_fk": "p.id" })
    .where({ "u.id": userID });
}

async function getPatch(patchName) {
  const details = await getPatchDetails(patchName);
  const operatingSystems = await getPatchOperatingSystems(patchName);
  const platforms = await getPatchPlatforms(patchName);
  const categories = await getPatchCategories(patchName);
  const tags = await getPatchTags(patchName);
  const versions = await getPatchVersions(patchName);

  return {
    name: details.name,
    imageUrl: details.image_url,
    previewUrl: details.preview_url,
    repoUrl: details.repo_url,
    homepageUrl: details.homepage_url,
    operatingSystems,
    platforms,
    categories,
    tags,
    versions,
  };
}

async function createPatch(patch) {
  console.log(patch);

  try {
    await db.transaction(async (trx) => {
      const patchID = await db("patches")
        .insert({
          name: patch.name,
          image_url: patch.image_file,
          preview_url: patch.preview_url,
          repo_url: patch.repo_url,
          homepage_url: patch.homepage_url,
        })
        .returning("id")
        .transacting(trx);

      await db("user_patches")
        .insert({
          user_fk: Number(patch.user_id),
          patch_fk: Number(patchID),
        })
        .transacting(trx);

      const versionID = await db("versions")
        .insert({
          patch_fk: Number(patchID),
          version_name: patch.version,
          description: patch.description,
        })
        .returning("id")
        .transacting(trx);

      await db("version_files")
        .insert({
          version_fk: Number(versionID),
          linux_file_url: patch.linux_file,
          mac_file_url: patch.macOS_file,
          windows_file_url: patch.windows_file,
          android_file_url: patch.android_file,
          ios_file_url: patch.iOS_file,
        })
        .transacting(trx);

      await db("patch_os")
        .insert(
          patch.operatingSystems.map((os) => ({
            patch_fk: Number(patchID),
            os_fk: Number(os),
          }))
        )
        .transacting(trx);

      await db("patch_category")
        .insert(
          patch.categories.map((category) => ({
            patch_fk: Number(patchID),
            category_fk: Number(category),
          }))
        )
        .transacting(trx);

      await db("patch_tags")
        .insert(
          patch.tags.map((tag) => ({
            patch_fk: Number(patchID),
            tag_fk: Number(tag),
          }))
        )
        .transacting(trx);

      await db("patch_platform")
        .insert(
          patch.platforms.map((platform) => ({
            patch_fk: Number(patchID),
            platform_fk: Number(platform),
          }))
        )
        .transacting(trx);

      await db("version_status")
        .insert({
          version_fk: Number(versionID),
          status_fk: Number(patch.releaseStatuses),
        })
        .transacting(trx);
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function listPatchMetadata(table, ...selection) {
  return await db(table).select(...selection);
}

module.exports = {
  getPatch,
  getPatchDetails,
  getPatchOperatingSystems,
  getPatchPlatforms,
  getPatchCategories,
  getPatchTags,
  getPatchVersions,
  listPatchMetadata,
  createPatch,
  getUserPatches,
};
