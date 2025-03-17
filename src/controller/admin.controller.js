import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

//helper function for Cloudinary upload
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader(file.tempFilePath, {
      resource_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary: ", error);
    throw new Error("Error uploading to Cloudinary!");
  }
};

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFilee || !req.files.imageFile) {
      return res.status(400).json({ message: "Please upload all files!" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.filesss.imageFile;

    const imageUrl = await uploadToCloudinary(imageFile);
    const audioUrl = await uploadToCloudinary(audioFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });

    await song.save();

    // update album's song list if provided albumId exists
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log("Error in createSong: ", error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params; // extracting id from url/params

    const song = await Song.findById(id);

    //if song belongs to an album, remove it from album's song list; update album's song list
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    await song.findByIdAndDelete(id);
    res.status(200).json({ message: "Song deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteSong: ", error);
    next(error);
  }
};

export const createAlbum = async (req, res, next) => {
  try {
    const { title, artist, releaseYear } = req.body;
    const { imageFile } = req.files;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
    });

    await album.save();
    res.status(201).json(album);
  } catch (error) {
    console.log("Error in createAlbum: ", error);
    next(error);
  }
};

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Song.deleteMany({ albumId: id });
    const album = await Album.findById(id);
    await album.findByIdAndDelete(id);
    res.status(200).json({ message: "Album deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteAlbum: ", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true, success: true });
};
