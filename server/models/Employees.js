import mongoose from 'mongoose';

const employeeSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const EmployeeModel = mongoose.model("employees", employeeSchema);

export default EmployeeModel;