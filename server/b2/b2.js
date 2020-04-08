const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const axios = require("axios");
const crypto = require("crypto");
const fs = require("fs");
const { Readable, Writable } = require("stream");

async function getAuth() {
  try {
    const authString = `${process.env.B2_KEY_ID}:${process.env.B2_APPLICATION_KEY}`;
    const authStringBase64 = new Buffer.alloc(
      authString.length,
      authString
    ).toString("base64");

    const res = await axios.post(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      {},
      {
        headers: { Authorization: `Basic ${authStringBase64}` },
      }
    );

    return {
      accountId: process.env.B2_KEY_ID,
      applicationKey: process.env.B2_APPLICATION_KEY,
      apiUrl: res.data.apiUrl,
      token: res.data.authorizationToken,
      downloadUrl: res.data.downloadUrl,
      recommendedPartSize: res.data.recommendedPartSize,
    };
  } catch (err) {
    console.error(err);
  }
}

getAuth();

async function createKey(keyName) {
  try {
    const auth = await getAuth();

    const res = await axios.post(
      `${auth.apiUrl}/b2api/v2/b2_create_key`,
      {
        accountId: auth.accountId,
        capabilities: [
          "listBuckets",
          "listFiles",
          "readFiles",
          "deleteFiles",
          "writeFiles",
        ],
        keyName,
        validDurationInSeconds: 43200,
      },
      {
        headers: { Authorization: auth.token },
      }
    );

    return res.data;
  } catch (err) {
    console.error(err);
  }
}

async function getClientAuth(b2Key) {
  try {
    if (b2Key) {
      const authString = `${b2Key.applicationKeyId}:${b2Key.applicationKey}`;
      const authStringBase64 = new Buffer.alloc(
        authString.length,
        authString
      ).toString("base64");

      const res = await axios.post(
        "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
        {},
        {
          headers: { Authorization: `Basic ${authStringBase64}` },
        }
      );

      return {
        accountId: process.env.B2_KEY_ID,
        applicationKey: b2Key.applicationKey,
        apiUrl: res.data.apiUrl,
        token: res.data.authorizationToken,
        downloadUrl: res.data.downloadUrl,
        recommendedPartSize: res.data.recommendedPartSize,
        absoluteMinimumPartSize: res.data.absoluteMinimumPartSize,
      };
    }
  } catch (err) {
    console.error(err);
  }
}

async function createBucket(auth, bucketName) {
  try {
    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_create_bucket?accountId=${auth.accountId}&bucketName=${bucketName}&bucketType=allPrivate`,
      {
        headers: { Authorization: auth.token },
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function getBucketId(auth) {
  try {
    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_list_buckets?accountId=${auth.accountId}`,
      {
        headers: { Authorization: auth.token },
      }
    );

    const bucketData = res.data.buckets[0];

    const { bucketId, bucketName } = bucketData;

    return {
      id: bucketId,
      name: bucketName,
    };
  } catch (err) {
    console.error(err);
  }
}

async function getUploadUrl(auth) {
  try {
    const bucket = await getBucketId(auth);

    const res = await axios.post(
      `${auth.apiUrl}/b2api/v2/b2_get_upload_url`,
      { bucketId: bucket.id },
      {
        headers: { Authorization: auth.token },
      }
    );

    const { authorizationToken, uploadUrl } = res.data;

    return {
      token: authorizationToken,
      url: uploadUrl,
    };
  } catch (err) {
    console.error(err);
  }
}

async function uploadFile(auth) {
  const fileData =
    "Each thing (a mirror's face, let us say) was infinite things";
  const fileName = "aleph.txt";
  const contentType = "text/plain";
  const sha1 = crypto.createHash("sha1").update(fileData).digest("hex");

  try {
    const uploadUrl = await getUploadUrl(auth);
    const res = await axios.post(uploadUrl.url, fileData, {
      headers: {
        Authorization: uploadUrl.token,
        "Content-Type": contentType,
        "Content-Length": fileData.length,
        "X-Bz-File-name": fileName,
        "X-Bz-Content-Sha1": sha1,
        "X-Bz-Info-Author": "John-Doe",
      },
    });

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function downloadFile(auth, fileName) {
  try {
    const bucket = await getBucketId(auth);

    const res = await axios.get(
      `${auth.downloadUrl}/file/${bucket.name}/${fileName}`,
      {
        headers: { Authorization: auth.token },
      }
    );

    const savePath = `/downloads/${fileName}`;

    let source = new Readable();
    source._read = () => {};
    source.push(res.data);
    // source.push(null);

    let destination = fs.createWriteStream(savePath);

    source.on("end", () => {
      console.log("File successfully downloaded.");
    });

    source.pipe(destination);
  } catch (err) {
    console.error(err);
  }
}

async function downloadFileById(auth, fileName) {
  try {
    const fileId = await getFileId(auth, fileName);

    const res = await axios.get(
      `${auth.apiUrl}/b2api/v2/b2_download_file_by_id?fileId=${fileId}`,
      {
        headers: { Authorization: auth.token },
      }
    );

    const savePath = `/downloads/${fileName}`;

    let source = new Readable();
    source._read = () => {};
    source.push(res.data);

    let destination = fs.createWriteStream(savePath);

    source.pipe(destination);
  } catch (err) {
    console.error(err);
  }
}

async function listFiles(auth) {
  try {
    const bucket = await getBucketId(auth);

    let startFileName = null;
    let allFiles = [];

    while (true) {
      let res = await axios.post(
        `${auth.apiUrl}/b2api/v2/b2_list_file_names`,
        {
          bucketId: bucket.id,
          startFileName,
        },
        {
          headers: { Authorization: auth.token },
        }
      );

      res.data.files.forEach((file) => {
        allFiles.push(file);
      });

      startFileName = res.data.nextFileName;
      if (res.data.nextFileName === null) break;
    }

    return allFiles;
  } catch (err) {
    console.error(err);
  }
}

async function deleteFile(auth, fileNameToDelete) {
  try {
    let fileName, fileId;
    let allFiles = await listFiles(auth);

    allFiles.forEach((file) => {
      if (file.fileName === fileNameToDelete) {
        fileId = file.fileId;
        fileName = file.fileName;
      }
    });

    const res = await axios.post(
      `${auth.apiUrl}/b2api/v2/b2_delete_file_version`,
      {
        fileName,
        fileId,
      },
      {
        headers: { Authorization: auth.token },
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
  }
}

async function getFileId(auth, fileName) {
  try {
    const files = await listFiles(auth);
    let fileId;

    files.forEach((file) => {
      if (file.fileName === fileName) {
        fileId = file.fileId;
      }
    });

    return fileId;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAuth,
  getClientAuth,
  createBucket,
  getBucketId,
  getUploadUrl,
  uploadFile,
  downloadFile,
  downloadFileById,
  listFiles,
  deleteFile,
  getFileId,
  createKey,
};
