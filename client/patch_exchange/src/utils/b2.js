import axios from "axios";
import store from "../store";
import { updateFileUploadProgress } from "../actions/b2Actions";

const getUploadUrl = async (auth, bucketType) => {
  try {
    const bucket = await getBucketId(auth, bucketType);

    const res = await axios.post(
      `https://cors-anywhere.herokuapp.com/${auth.apiUrl}/b2api/v2/b2_get_upload_url`,
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
};

const getBucketId = async (auth, bucketType) => {
  let bucketData = {};

  try {
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/${auth.apiUrl}/b2api/v2/b2_list_buckets?accountId=${auth.accountId}`,
      {
        headers: { Authorization: auth.token },
      }
    );

    if (bucketType === "image") {
      bucketData = res.data.buckets.filter(
        (b) => b.bucketName === "patchex-images"
      );
    } else {
      bucketData = res.data.buckets.filter(
        (b) => b.bucketName === "patchex-patches"
      );
    }

    const { bucketId, bucketName } = bucketData[0];

    return {
      id: bucketId,
      name: bucketName,
    };
  } catch (err) {
    console.error(err);
  }
};

const uploadFile = async (user, os, file, hash) => {
  try {
    const uploadUrl = await getUploadUrl(user.b2Auth, os);

    const options = {
      headers: {
        Authorization: uploadUrl.token,
        "Content-Type": file.type,
        "X-Bz-File-Name": `${user.username.replace(
          / /g,
          "_"
        )}/${file.name.replace(/ /g, "_")}`,
        "X-Bz-Content-Sha1": hash,
        "X-Bz-Info-Author": user.username.replace(/ /g, "_"),
        "X-Bz-Info-Os": os,
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        store.dispatch(updateFileUploadProgress(file.name, percentCompleted));
      },
    };

    const res = await axios.post(
      `https://cors-anywhere.herokuapp.com/${uploadUrl.url}`,
      file,
      options
    );

    return res;
  } catch (err) {
    throw err;
  }
};

const generateSha1 = async (file) => {
  // encode file as arrayBuffer
  const buffer = await file.arrayBuffer();
  // hash the arrayBuffer, returns another buffer
  const hashBuffer = await crypto.subtle.digest("SHA-1", buffer);
  // convert buffer to byte array
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  // convert bytes to hex string
  const hash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return hash;
};

const uploadFileWithRetries = async (user, os, file, hash, attempts) => {
  try {
    return await uploadFile(user, os, file, hash);
  } catch (err) {
    if (attempts === 1) throw err;
    return uploadFileWithRetries(user, os, file, hash, attempts - 1);
  }
};

export {
  getUploadUrl,
  getBucketId,
  uploadFile,
  generateSha1,
  uploadFileWithRetries,
};
