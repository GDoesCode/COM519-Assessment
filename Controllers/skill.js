const Skill = require("../Models/Skill");

exports.list = async (req, res) => {
    try {
        const skills = await Skill.find({});
        if (req.params.employeeId) {
            res.render("skillsToEmployee", { skills: skills, employeeId: req.params.employeeId, message: req.query?.message });
        }
        else {
            res.render("skills", { skills: skills, message: req.query?.message });
        }
    } catch (e) {
        res.status(404).send({ message: "Could not find skill" });
    }
}

exports.create = async (req, res) => {
    let skill = new Skill({ Name: req.body.name, Description: req.body.description});
    try {
        await skill.save();
        res.redirect(`/skills/?message=${req.body.name} has been created.`);
    } catch (e) {
        if (e.errors) {
            res.render("addSkill", { errors: e.errors });
            return;
        }
        return res.status(404).send({ message: JSON.parse(e) });
    }
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const skill = await Skill.findById(id);
        res.render("editSkill", { skill: skill, id: id, errors: {} });
    } catch (e) {
        return res.status(404).send({ message: `Could not find skill ${id}` });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        await Skill.updateOne({ _id: id, Name: req.body.name, Description: req.body.description });
        const skill = await Skill.findById(id);
        res.redirect(`/skills/?message=${skill.Name} has been updated.`);
    } catch (e) {
        if (e.errors) {
            return res.render("editSkill", { errors: e.errors });
        }
        return res.status(404).send({ message: `Could not update skill: ${id}` });
    }
}

exports.delete = async (req, res) => {
    const id = req.param.id;
    try {
        await Employee.findByIdAndDelete(id);
        res.redirect("/skills");
    } catch (e) {
        res.status(404).send({ message: `Could not delete skill: ${id}` });
    }
}
