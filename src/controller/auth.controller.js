import { User } from "../models/user.model.js"; // User

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    //checks if user already exists
    const user = await User.findOne({ clerkId: id });

    if (!user) {
      //sign up user
      await User.create({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl: imageUrl,
      });
    }

    res.status(200).json({ message: "User created!", success: true });
  } catch (error) {
    console.log("Error in auth callback: ", error);
    next(error);
  }
};
