const Employee = require("../Models/Employee");

exports.list = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.render("employees", { employees: employees });
    } catch (e) {
        res.status(404).send( { message: "Could not find employee" } );
    }
}

exports.delete = async (req, res) => {
    const id = req.param.id;
    try {
        Employee.findByIdAndDelete(id);
        res.redirect("/employees");
    } catch (e) {
        res.status(404).send( { message: "Could not delete employee" } );
    }
}