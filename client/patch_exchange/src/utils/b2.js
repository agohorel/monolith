import axios from "axios";

const getUploadUrl = async (auth) => {
  try {
    const bucket = await getBucketId(auth);

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

const getBucketId = async (auth) => {
  try {
    const res = await axios.get(
      `https://cors-anywhere.herokuapp.com/${auth.apiUrl}/b2api/v2/b2_list_buckets?accountId=${auth.accountId}`,
      {
        headers: { Authorization: auth.token },
      }
    );

    const bucketData = res.data.buckets[1];

    const { bucketId, bucketName } = bucketData;

    return {
      id: bucketId,
      name: bucketName,
    };
  } catch (err) {
    console.error(err);
  }
};

const uploadFile = async (user, file, hash) => {
  try {
    const uploadUrl = await getUploadUrl(user.b2Auth);
    const data = new FormData();
    data.append("file", file);

    console.log(file, data.get("file"));

    const res = await axios.post(
      `https://cors-anywhere.herokuapp.com/${uploadUrl.url}`,
      file,
      {
        headers: {
          Authorization: uploadUrl.token,
          "Content-Type": file.type,
          "X-Bz-File-Name": file.name,
          "X-Bz-Content-Sha1": hash,
          "X-Bz-Info-Author": user.username,
        },
      }
    );

    console.log(res);
  } catch (err) {
    console.error(err);
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

export { getUploadUrl, getBucketId, uploadFile, generateSha1 };
