const { Schema, model } = require("mongoose");

const reservationSchema = new Schema(
  {
    dateTimeStart: { type: Date, required: true },
    dateTimeEnd: { type: Date, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    padelClub: {
      type: Schema.Types.ObjectId,
      ref: "PadelClub",
      required: true,
    },
    padelCourt: {
      type: Schema.Types.ObjectId,
      ref: "PadelCourt",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);


module.exports = model("Reservation", reservationSchema);
