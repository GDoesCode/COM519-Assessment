const Employee = require("../Models/Employee");
const Skill = require("../Models/Skill");

exports.list = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.render("employees", { employees: employees, message: req.query?.message });
    } catch (e) {
        return res.status(404).send({ message: "Could not find employee" });
    }
}

exports.create = async (req, res) => {
    let employee = new Employee({ Name: req.body.name, FM: req.body.fm, GG: req.body.gg, Last_Update: Date.now("DD/MM/YYYY") })
    try {
        await employee.save();
        res.redirect(`/employees/?message=${req.body.name} has been created.`);
    } catch (e) {
        if (e.errors) {
            res.render("addEmployee", { errors: e.errors });
            console.log(e.errors);
            return;
        }
        return res.status(404).send({ message: JSON.parse(e) });
    }
}

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findById(id);
        res.render("editEmployee", { employee: employee, id: id, errors: {} });
    } catch (e) {
        return res.status(404).send({ message: `Could not find employee ${id}` });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        await Employee.updateOne({ _id: id, Name: req.body.name, FM: req.body.fm, GG: req.body.gg, Last_Update: Date.now("DD/MM/YYYY") });
        const employee = await Employee.findById(id);
        res.redirect(`/employees/?message=${employee.Name} has been updated.`);
    } catch (e) {
        if (e.errors) {
            return res.render("editEmployee", { errors: e.errors });
        }
        return res.status(404).send({ message: `Could not update employee: ${id}` });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Employee.findByIdAndDelete(id);
        res.redirect("/employees");
    } catch (e) {
        return res.status(404).send({ message: `Could not delete employee: ${id}` });
    }
}

exports.addSkill = async (req, res) => {
    const skillId = req.params.skillId;
    const employeeId = req.params.employeeId;
    try {
        const skill = await Skill.findById(skillId);
        const competency = req.body.competency;
        await Employee.updateOne({ _id: employeeId, Skills: skill, Competency: competency });
        const employee = await Employee.findById(employeeId);
        res.redirect(`/employees/?message=${skill.Name} added to ${employee.Name}`);
    } catch (e) {
        return res.status(404).send({ message: `Could not add skill: ${skillId} to employee: ${employeeId}` });
    }
}