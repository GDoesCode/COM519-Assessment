const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema(
    {
        Name: { type: String, required: [true, "Name of skill is required"] },
        Description: { type: String, required: [true, "Description is required"] }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Skill", skillSchema);