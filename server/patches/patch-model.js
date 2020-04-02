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

  data.forEach(item => arr.push(item.os));

  return arr;
}

async function getPatchPlatforms(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("platforms.platform_name as platform")
    .join("patch_platform as pp", { "pp.patch_fk": "p.id" })
    .join("platforms", { "platforms.id": "pp.platform_fk" })
    .where({ "p.name": patchName });

  data.forEach(item => arr.push(item.platform));

  return arr;
}

async function getPatchCategories(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("c.category_name as category")
    .join("patch_category as pc", { "pc.patch_fk": "p.id" })
    .join("categories as c", { "c.id": "pc.category_fk" })
    .where({ "p.name": patchName });

  data.forEach(item => arr.push(item.category));

  return arr;
}

async function getPatchTags(patchName) {
  const arr = [];
  const data = await db("patches as p")
    .select("t.tag as tag")
    .join("patch_tags as pt", { "pt.patch_fk": "p.id" })
    .join("tags as t", { "t.id": "pt.tag_fk" })
    .where({ "p.name": patchName });

  data.forEach(item => arr.push(item.tag));

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
    .join("versions as v", { "v.patch_fk": "p.id" })
    .join("version_status as vs", { "vs.version_fk": "v.id" })
    .join("version_files as vf", { "vf.version_fk": "v.id" })
    .join("release_statuses as rs", { "rs.id": "vs.version_fk" })
    .where({ "p.name": patchName });

  data.forEach(item =>
    arr.push({
      [item.version]: {
        status: item.releaseStatus,
        description: item.description,
        linuxUrl: item.linux_file_url,
        macUrl: item.mac_file_url,
        windowsUrl: item.windows_file_url,
        androidUrl: item.android_file_url,
        iosUrl: item.ios_file_url
      }
    })
  );

  return arr;
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
    versions
  };
}

// async function createPatch(patch) {
//   try {
//     await db.transaction(async trx => {
//       const id = await knex("patches")
//         .insert({
//           name: patch.name,
//           image_url: patch.image_url,
//           preview_url: patch.preview_url,
//           repo_url: patch.repo_url
//         })
//         .returning("id")
//         .transacting(trx);

//       const versionID = await knex("versions")
//         .insert({
//           patch_fk: id,
//           name: patch.version,
//           file_url: patch.version_url,
//           description: patch.version_description
//         })
//         .returning("id")
//         .transacting(trx);

//       await knex("version_status").insert({
//         version_fk: versionID,
//         status_fk: gotta_get_this_somehow
//       });
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

async function listPatchMetadata(table, selection) {
  const columnName = selection.substring(
    selection.indexOf(".") + 1,
    selection.length
  );

  const data = await db(table).select(selection);

  return data.map(item => item[columnName]);
}

module.exports = {
  getPatch,
  getPatchDetails,
  getPatchOperatingSystems,
  getPatchPlatforms,
  getPatchCategories,
  getPatchTags,
  getPatchVersions,
  listPatchMetadata
};