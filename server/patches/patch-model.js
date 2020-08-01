const db = require("../db/connections.js");

async function getPatchDetails(patchName) {
  return db("patches as p")
    .select(
      "p.name",
      "p.author_id",
      "p.author_name",
      "p.image_id",
      "p.preview_url",
      "p.repo_url",
      "p.homepage_url",
      "p.description",
      "p.id"
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

  const [{ id: patchID }] = await db("patches as p")
    .select("id")
    .where({ "p.name": patchName });

  const data = await db("versions as v")
    .select("*")
    .join("version_files as vf", {
      "vf.id": "v.id",
    })
    .join("version_status as vs", {
      "vs.id": "v.id",
    })
    .join("release_statuses as rs", { "rs.id": "vs.id" })
    .where({
      "v.patch_fk": patchID,
    });

  data.forEach((item) =>
    arr.push({
      version: item.version_name,
      status: item.release_status,
      description: item.description,
      linuxId: item.linux_file_id,
      macId: item.mac_file_id,
      windowsId: item.windows_file_id,
      androidId: item.android_file_id,
      iosId: item.ios_file_id,
      id: item.id,
    })
  );

  return arr;
}

async function getUserPatches(userID) {
  return db("users as u")
    .select("p.name", "p.image_id", "p.id")
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
    id: details.id,
    name: details.name,
    authorId: details.author_id,
    authorName: details.author_name,
    imageId: details.image_id,
    previewUrl: details.preview_url,
    repoUrl: details.repo_url,
    homepageUrl: details.homepage_url,
    description: details.description,
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
          image_id: patch.image_file,
          preview_url: patch.preview_url,
          repo_url: patch.repo_url,
          homepage_url: patch.homepage_url,
          description: patch.description,
          author_id: patch.user_id,
          author_name: patch.user_name,
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
          description: patch.version_description,
        })
        .returning("id")
        .transacting(trx);

      await db("version_files")
        .insert({
          version_fk: Number(versionID),
          linux_file_id: patch.linux_file,
          mac_file_id: patch.macOS_file,
          windows_file_id: patch.windows_file,
          android_file_id: patch.android_file,
          ios_file_id: patch.iOS_file,
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

async function deletePatch(patchName) {
  try {
    const { id } = await getPatchDetails(patchName);
    const versions = await getPatchVersions(patchName);

    await db.transaction(async (trx) => {
      for (const version of versions) {
        await db("versions")
          .where({ patch_fk: version.id })
          .delete()
          .transacting(trx);

        await db("version_status")
          .where({ version_fk: version.id })
          .delete()
          .transacting(trx);

        await db("version_files")
          .where({ version_fk: version.id })
          .delete()
          .transacting(trx);
      }

      await db("patch_os").where({ patch_fk: id }).delete().transacting(trx);
      await db("patch_platform")
        .where({ patch_fk: id })
        .delete()
        .transacting(trx);
      await db("patch_category")
        .where({ patch_fk: id })
        .delete()
        .transacting(trx);
      await db("patch_tags").where({ patch_fk: id }).delete().transacting(trx);
      await db("user_patches")
        .where({ patch_fk: id })
        .delete()
        .transacting(trx);
      await db("patches").where({ id }).delete().transacting(trx);
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
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
  deletePatch,
};
