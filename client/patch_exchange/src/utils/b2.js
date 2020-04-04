import axios from "axios";

const getUploadUrl = async (auth) => {
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
};

const getBucketId = async (auth) => {
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
};

const uploadFile = async (auth) => {
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
