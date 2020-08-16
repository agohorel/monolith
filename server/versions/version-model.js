const db = require("../db/connections.js");

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
        mac_file_id: patchVersion.mac_file,
        windows_file_id: patchVersion.windows_file,
        android_file_id: patchVersion.android_file,
        ios_file_id: patchVersion.ios_file,
      })
      .transacting(trx);

    await db("version_status")
      .insert({
        version_fk: Number(versionID),
        status_fk: Number(patchVersion.release_status),
      })
      .transacting(trx);
  });
}

async function getPatchVersionById(versionID) {
  const [data] = await db("versions as v")
    .select("vf.*", "vs.*")
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

  console.log(data);

  const result = {
    version: data.version_name,
    status: data.release_status,
    description: data.description,
    linuxId: data.linux_file_id,
    macId: data.mac_file_id,
    windowsId: data.windows_file_id,
    androidId: data.android_file_id,
    iosId: data.ios_file_id,
    id: data.id,
    patch_id: data.version_fk,
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
        mac_file_id: patchVersion.mac_file,
        windows_file_id: patchVersion.windows_file,
        android_file_id: patchVersion.android_file,
        ios_file_id: patchVersion.iOS_file,
      })
      .where({ version_fk: versionID })
      .transacting(trx);

    await db("version_status")
      .update({
        version_fk: versionID,
        status_fk: Number(patchVersion.release_status),
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

module.exports = {
  createPatchVersion,
  getPatchVersionById,
  updatePatchVersion,
  deletePatchVersion,
};
