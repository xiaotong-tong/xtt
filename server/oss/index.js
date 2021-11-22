let OSS = require('ali-oss');
require('dotenv').config();

let client = new OSS({
  region: process.env.OSS_REGION,
  endpoint: process.env.OSS_ENDPOINT,
  accessKeyId: process.env.OSS_ACCESSKEY_ID,
  accessKeySecret: process.env.OSS_ACCESSKEY_SECRET,
//   internal: true,
  cname: true,
  bucket: process.env.OSS_BUCKET
});

client.useBucket(process.env.OSS_BUCKET);
async function list () {
  try {
    let result = await client.list({
      'max-keys': 5
    })
    console.log(result)
  } catch (err) {
    console.log (err)
  }
}
list();


// module.exports = client;

