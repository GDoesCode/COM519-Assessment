const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const staffSchema = new Schema(
    {
        FM: { type: String, required: [true, "Function Manager is required"] },
        GG: {type: Number, required: [true, "Global Grade is required"] },
        Last_Update: {type: String, required: [true, "Last update is required"] },
        Name: { type: String, required: [true, "Name is required"] },
        Skills: { type: Array }
    },
    { timestamps: true }
);

staffSchema.pre('save', async function (next)
{
    // logging 
    console.log(this.password);
    try
    {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e)
    {
        throw Error('could not hash password');
    }
})

module.exports = mongoose.model("Staff", staffSchema);