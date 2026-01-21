const router = require("express").Router();
// ℹ️ Handles password encryption
const bcryptjs = require("bcryptjs");

// ℹ️ Handles password encryption
const jwt = require("jsonwebtoken");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//route to /signup a new user
router.post("/signup", async (req, res) => {
  //destructuring  the req.body
  const { email, password } = req.body;
  try {
    const userAlreadyInDB = await User.findOne({ email });
    if (userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      const theSalt = bcryptjs.genSaltSync(12);
      const theHashedPassword = bcryptjs.hashSync(password, theSalt);
      const hashedUser = {
        ...req.body,
        password: theHashedPassword,
      };
      const createdUser = await User.create(hashedUser);
      res.status(201).json(createdUser);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMesage: error });
  }
});

//route to /login an existing user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAlreadyInDB = await User.findOne({ email });
    if (!userAlreadyInDB) {
      res.status(403).json({ errorMessage: "Invalid Credentials" });
    } else {
      const doesPasswordsMatch = bcryptjs.compareSync(
        password,
        userAlreadyInDB.password,
      );
      if (!doesPasswordsMatch) {
        res.status(403).json({ errorMessage: "Invalid Credentials" });
      } else {
        const payload = { _id: userAlreadyInDB._id };
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
          algorithm: "HS256",
          expiresIn: "6h",
        });

        res
          .status(200)
          .json({ message: "you are now logged in, nice work", authToken });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: error });
  }
});

//this route verifies the auth token
router.get("/verify", isAuthenticated, async (req, res) => {
  const currentLoggedInUser = await User.findById(req.payload._id)
    .select("-password")
    .populate("padelClub");
  res.status(200).json({ message: "Token is valid :) ", currentLoggedInUser });
});

//route to update user profile
router.put("/profile", isAuthenticated, async (req, res) => {
  try {
    const userId = req.payload._id;
    const { username, profilePicture, padelClub } = req.body;

    const updateData = { username, profilePicture };

    // Handle padelClub - convert to array if provided
    if (padelClub) {
      updateData.padelClub = [padelClub];
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .populate("padelClub");

    res.status(200).json({
      message: "Profile updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Error updating profile" });
  }
});

module.exports = router;
