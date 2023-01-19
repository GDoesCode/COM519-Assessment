const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema(
    {
        Name: { type: String, required: [true, "Name of skill is required"] },
        Proficiency: {type: Number, required: [true, "Proficiency is required"] }
    },
    { timestamps: true }
);