const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema(
    {
        Name: { type: String, required: [true, "Name is required"] },
        FM: { type: String, required: [true, "Functional Manager is required"] },
        GG: { type: Number, required: [true, "Global Grade is required"] },
        Last_Update: { type: String, required: [true, "Last update is required"], default: Date.now },
        Skills: { type: Object }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);