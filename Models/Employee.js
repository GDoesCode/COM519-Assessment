const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema(
    {
        Name: { type: String, required: [true, "Name is required"] },
        FM: { type: String, required: [true, "Functional Manager is required"] },
        GG: { type: Number, minimum: 0, maximum: 25, required: [true, "Global Grade is required"] },
        Last_Update: { type: Date, required: [true, "Last update is required"], default: Date.now },
        Skills: { type: Object, properties: {
            Skill: { type: Object, properties: {
                Name: { type: String, required: [true, "Skill must have a name"] },
                Description: { type: String }
            } },
            Competency: { type: Number, min: 1, max: 5, required: [true, "Skill must have a competency"] }
        } }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);