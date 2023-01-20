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
    let employee = new Employee({ Name: req.body.name, FM: req.body.fm, GG: req.body.gg, Last_Update: Date.now("DD/MM/YYYY") })
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

exports.edit = async (req, res) => {
    const id = req.params.id;
    try {
        const employee = await Employee.findById(id);
        res.render("editEmployee", { employee: employee, id: id, errors: {} });
    } catch (e) {
        return res.status(404).send({ message: `Could not find record ${id}` });
    }
}

exports.update = async (req, res) => {
    const id = req.params.id;
    try {
        await Employee.updateOne({ _id: id, Name: req.body.name, FM: req.body.fm, GG: req.body.gg, Last_Update: Date.now("DD/MM/YYYY") });
        const employee = await Employee.findById(id);
        res.redirect(`/employees/?message= ${employee.Name} has been updated.`);
    } catch (e) {
        if (e.errors) {
            console.log(e.errors);
            return res.render("editEmployee", { errors: e.errors });
        }
        return res.status(404).send({ message: `Could not update employee: ${id}`})
    }
}

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        await Employee.findByIdAndDelete(id);
        res.redirect("/employees");
    } catch (e) {
        return res.status(404).send({ message: `Could not delete record ${id}` });
    }
}