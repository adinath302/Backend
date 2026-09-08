const { ImageKit } = require("@imagekit/nodejs");
const sharp = require("sharp");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(buffer) {

  const optimizedBuffer = await sharp(buffer)
    .resize({
      width: 2000,
      height: 2000,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({
      quality: 80,
    })
    .toBuffer();

  const result = await imagekit.files.upload({
    file: optimizedBuffer.toString("base64"),
    fileName: `image-${Date.now()}.jpg`,
  });

  return result;
}

module.exports = uploadFile;