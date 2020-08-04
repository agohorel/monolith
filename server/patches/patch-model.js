const db = require("../db/connections.js");

////////////////////////////////
///    PATCH CRUD ROUTES     ///
////////////////////////////////

async function createPatch(patch) {
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

async function getPatchById(patchID) {
  const [details] = await getPatchDetails({ "p.id": patchID });
  const operatingSystems = await getPatchOperatingSystems(patchID);
  const platforms = await getPatchPlatforms(patchID);
  const categories = await getPatchCategories(patchID);
  const tags = await getPatchTags(patchID);
  const versions = await getPatchVersions(patchID);

  const patchDetails = {
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

  return patchDetails;
}

async function searchPatches(patchName) {
  const searchResults = [];
  const patches = await getPatchDetails({ "p.name": patchName });

  for (const patch of patches) {
    const operatingSystems = await getPatchOperatingSystems(patch.id);
    const platforms = await getPatchPlatforms(patch.id);
    const categories = await getPatchCategories(patch.id);
    const tags = await getPatchTags(patch.id);
    const versions = await getPatchVersions(patch.id);

    const patchDetails = {
      id: patch.id,
      name: patch.name,
      authorId: patch.author_id,
      authorName: patch.author_name,
      imageId: patch.image_id,
      previewUrl: patch.preview_url,
      repoUrl: patch.repo_url,
      homepageUrl: patch.homepage_url,
      description: patch.description,
      operatingSystems,
      platforms,
      categories,
      tags,
      versions,
    };

    searchResults.push(patchDetails);
  }

  return searchResults;
}

async function updatePatch(id, patch) {
  try {
    await db.transaction(async (trx) => {
      const [patchID] = await db("patches")
        .update({
          name: patch.name,
          image_id: patch.image_file,
          preview_url: patch.preview_url,
          repo_url: patch.repo_url,
          homepage_url: patch.homepage_url,
          description: patch.description,
          author_id: patch.user_id,
          author_name: patch.user_name,
        })
        .where({ id: Number(id) })
        .returning("id")
        .transacting(trx);

      await updatePatchMetadataList(
        "patch_os",
        patchID,
        { patch_fk: patchID },
        trx,
        patch.operatingSystems,
        "os_fk"
      );

      await updatePatchMetadataList(
        "patch_category",
        patchID,
        {
          patch_fk: patchID,
        },
        trx,
        patch.categories,
        "category_fk"
      );

      await updatePatchMetadataList(
        "patch_tags",
        patchID,
        { patch_fk: patchID },
        trx,
        patch.tags,
        "tag_fk"
      );

      await updatePatchMetadataList(
        "patch_platform",
        patchID,
        { patch_fk: patchID },
        trx,
        patch.platforms,
        "platform_fk"
      );
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

async function deletePatch(patchID) {
  try {
    patchID = Number(patchID);
    const versions = await getPatchVersions(patchID);

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

      await db("patch_os")
        .where({ patch_fk: patchID })
        .delete()
        .transacting(trx);
      await db("patch_platform")
        .where({ patch_fk: patchID })
        .delete()
        .transacting(trx);
      await db("patch_category")
        .where({ patch_fk: patchID })
        .delete()
        .transacting(trx);
      await db("patch_tags")
        .where({ patch_fk: patchID })
        .delete()
        .transacting(trx);
      await db("user_patches")
        .where({ patch_fk: patchID })
        .delete()
        .transacting(trx);
      await db("patches").where({ id: patchID }).delete().transacting(trx);
    });
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

////////////////////////////////
///PATCH VERSION CRUD ROUTES ///
////////////////////////////////

async function createPatchVersion(patchID, patchVersion) {
  await db.transaction(async (trx) => {
    const [versionID] = await db("versions")
      .insert({
        patch_fk: Number(patchID),
        version_name: patchVersion.version,
        description: patchVersion.version_description,
      })
      .returning("id")
      .transacting(trx);

    await db("version_files")
      .insert({
        version_fk: Number(versionID),
        linux_file_id: patchVersion.linux_file,
        mac_file_id: patchVersion.macOS_file,
        windows_file_id: patchVersion.windows_file,
        android_file_id: patchVersion.android_file,
        ios_file_id: patchVersion.iOS_file,
      })
      .transacting(trx);

    await db("version_status")
      .insert({
        version_fk: Number(versionID),
        status_fk: Number(patchVersion.releaseStatuses),
      })
      .transacting(trx);
  });
}

async function getPatchVersionById(versionID) {
  const [data] = await db("versions as v")
    .select("*")
    .join("version_files as vf", {
      "vf.version_fk": "v.id",
    })
    .join("version_status as vs", {
      "vs.version_fk": "v.id",
    })
    .join("release_statuses as rs", { "rs.id": "vs.status_fk" })
    .where({
      "v.id": versionID,
    });

  const result = {
    version: data.version_name,
    status: data.release_status,
    description: data.description,
    linuxId: data.linux_file_id,
    macId: data.mac_file_id,
    windowsId: data.windows_file_id,
    androidId: data.android_file_id,
    iosId: data.ios_file_id,
    id: data.version_fk,
  };

  return result;
}

async function updatePatchVersion(versionID, patchVersion) {
  versionID = Number(versionID);
  await db.transaction(async (trx) => {
    await db("versions")
      .update({
        version_name: patchVersion.version,
        description: patchVersion.version_description,
      })
      .where({ id: versionID })
      .transacting(trx);

    await db("version_files")
      .update({
        version_fk: versionID,
        linux_file_id: patchVersion.linux_file,
        mac_file_id: patchVersion.macOS_file,
        windows_file_id: patchVersion.windows_file,
        android_file_id: patchVersion.android_file,
        ios_file_id: patchVersion.iOS_file,
      })
      .where({ version_fk: versionID })
      .transacting(trx);

    await db("version_status")
      .update({
        version_fk: versionID,
        status_fk: Number(patchVersion.releaseStatuses),
      })
      .where({ version_fk: versionID })
      .transacting(trx);
  });
}

async function deletePatchVersion(versionID) {
  await db.transaction(async (trx) => {
    await db("version_status")
      .delete()
      .where({ version_fk: versionID })
      .transacting(trx);

    await db("version_files")
      .delete()
      .where({ version_fk: versionID })
      .transacting(trx);

    await db("versions").delete().where({ id: versionID }).transacting(trx);
  });
}

////////////////////////////////
///          UTILS           ///
////////////////////////////////

async function getPatchDetails(filter) {
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
    .where(filter);
}

async function getPatchOperatingSystems(patchID) {
  const arr = [];
  const data = await db("patches as p")
    .select("os.os_name as os")
    .join("patch_os as pos", { "pos.patch_fk": "p.id" })
    .join("operating_systems as os", { "os.id": "pos.os_fk" })
    .where({ "p.id": patchID });

  data.forEach((item) => arr.push(item.os));

  return arr;
}

async function getPatchPlatforms(patchID) {
  const arr = [];
  const data = await db("patches as p")
    .select("platforms.platform_name as platform")
    .join("patch_platform as pp", { "pp.patch_fk": "p.id" })
    .join("platforms", { "platforms.id": "pp.platform_fk" })
    .where({ "p.id": patchID });

  data.forEach((item) => arr.push(item.platform));

  return arr;
}

async function getPatchCategories(patchID) {
  const arr = [];
  const data = await db("patches as p")
    .select("c.category_name as category")
    .join("patch_category as pc", { "pc.patch_fk": "p.id" })
    .join("categories as c", { "c.id": "pc.category_fk" })
    .where({ "p.id": patchID });

  data.forEach((item) => arr.push(item.category));

  return arr;
}

async function getPatchTags(patchID) {
  const arr = [];
  const data = await db("patches as p")
    .select("t.tag as tag")
    .join("patch_tags as pt", { "pt.patch_fk": "p.id" })
    .join("tags as t", { "t.id": "pt.tag_fk" })
    .where({ "p.id": patchID });

  data.forEach((item) => arr.push(item.tag));

  return arr;
}

async function getPatchVersions(patchID) {
  const arr = [];

  const data = await db("versions as v")
    .select("*")
    .join("version_files as vf", {
      "vf.version_fk": "v.id",
    })
    .join("version_status as vs", {
      "vs.version_fk": "v.id",
    })
    .join("release_statuses as rs", { "rs.id": "vs.status_fk" })
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
      id: item.version_fk,
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

async function updatePatchMetadataList(
  table,
  patchID,
  filter,
  transaction,
  metadataList,
  foreignKeyName
) {
  await db(table).delete().where(filter).transacting(transaction);

  for (const listItem of metadataList) {
    await db(table)
      .insert({
        patch_fk: patchID,
        [foreignKeyName]: Number(listItem),
      })
      .transacting(transaction);
  }
}

async function listPatchMetadata(table, ...selection) {
  return await db(table).select(...selection);
}

module.exports = {
  searchPatches,
  getPatchById,
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
  updatePatch,
  createPatchVersion,
  getPatchVersionById,
  updatePatchVersion,
  deletePatchVersion,
};
