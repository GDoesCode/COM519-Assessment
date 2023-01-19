const Employee = require("../Models/Employee");

exports.list = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.render("employees", { employees: employees, message: req.query?.message });
    } catch (e) {
        return res.status(404).send({ message: "Could not find employee" });
    }
}

exports.create = async (req, res) => {
    let employee = new Employee({ Name: req.body.name, FM: req.body.fm, GG: req.body.gg, Last_Update: req.body.last_update })
    try {
        await employee.save();
        res.redirect(`/employees/?message=${req.body.name} has been created.`);
    } catch (e) {
        if (e.errors) {
            res.render("addEmployee", { errors: e.errors });
            return;
        }
        return res.status(404).send({ message: JSON.parse(e) });
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Employee.findByIdAndDelete(id);
        res.redirect("/employees");
    } catch (e) {
        return res.status(404).send({ message: "Could not delete employee" });
    }
}