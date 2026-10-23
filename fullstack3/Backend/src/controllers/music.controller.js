const musicModel = require("../model/music.model");
const jwt = require("jsonwebtoken");
const { uploadFile } = require("../services/storage.service");
async function createMusic(req, res) {
  // get the token
  const token = req.cookies.token;

  // verify the token
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // if the token was correct it will give the data of the user though the token was created or catch the error in return
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // if the role is not 'artist' then return with res
    if (decoded.role !== "artist") {
      return res
        .status(403)
        .json({ message: "You don't have access to create an music" });
    }

    const { title } = req.body;
    const file = req.file;

    const result = await uploadFile(file.buffer.toString("base64"));

    const music = await musicModel.create({
      uri: result.url,
      title,
      artist: decoded.imd,
    });

    res.status(201).json({
      message: "Music created successfully",
      music: {
        id: music._id,
        url: music.uri,
        title: music.title,
        artist: music.artist,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
}

module.exports = { createMusic };
