const Skill = require("../Models/Skill");

exports.list = async (req, res) => {
    try {
        const skills = await Skill.find({});
        res.render("skills", { skills: skills });
    } catch (e) {
        res.status(404).send( { message: "Could not find skill" } );
    }
}

exports.delete = async (req, res) => {
    const id = req.param.id;
    try {
        Employee.findByIdAndDelete(id);
        res.redirect("/skills");
    } catch (e) {
        res.status(404).send( { message: "Could not delete skill" } );
    }
}