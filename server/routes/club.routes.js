const router = require("express").Router();
const Club = require("../models/PadelClub.model");
const User = require("../models/User.model");
const Reservation = require("../models/Reservation.model");

// Create a new club
router.post("/clubs", async (req, res) => {
  try {
    const newClub = await Club.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      req.body.owner,
      { $push: { ownedClubs: newClub._id } },
      { new: true },
    );
    res.status(201).json(newClub, updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to get all clubs
router.get("/clubs", async (req, res) => {
  try {
    const clubs = await Club.find().populate("owner", "-password");
    res.status(200).json(clubs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to find a club by id
router.get("/clubs/:clubId", async (req, res) => {
  const { clubId } = req.params;
  try {
    const foundClub = await Club.findById(clubId).populate(
      "owner",
      "-password",
    );
    res.status(200).json(foundClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to update a club by id
router.put("/clubs/:clubId", async (req, res) => {
  const { clubId } = req.params;
  try {
    const updatedClub = await Club.findByIdAndUpdate(clubId, req.body, {
      new: true,
    });
    res.status(200).json(updatedClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to delete a club by id
router.delete("/clubs/:clubId", async (req, res) => {
  const { clubId } = req.params;
  try {
    await Club.findByIdAndDelete(clubId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to get all reservations for a specific club
router.get("/clubs/:clubId/reservations", async (req, res) => {
  const { clubId } = req.params;
  try {
    const reservations = await Reservation.find({ club: clubId }).populate(
      "user",
      "-password",
    );
    res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to create a reservation for a specific club
router.post("/clubs/:clubId/reservations", async (req, res) => {
  const { clubId } = req.params;
  try {
    const newReservation = await Reservation.create({
      ...req.body,
      club: clubId,
    });
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Route to delete a reservation by id for a specific club
router.delete(
  "/clubs/:clubId/reservations/:reservationId",
  async (req, res) => {
    const { reservationId } = req.params;
    try {
      await Reservation.findByIdAndDelete(reservationId);
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ errorMessage: "Internal Server Error" });
    }
  },
);

// Route to update a reservation by id for a specific club
router.put("/clubs/:clubId/reservations/:reservationId", async (req, res) => {
  const { reservationId } = req.params;
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
});

// Export the router
module.exports = router;
