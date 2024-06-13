const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    firstName: {
        type: String, required: [true, "First name is required!"],
        validate: {
            validator: (field) => {
                return field.length < 5;
            },
            message: "First name must have minimum 5 character"
        }
    },
    lastName: {type: String, required: [true, "Last name is required!"]},
    gender: {type: String, default: null},
    password: {type: String, required: [true, "Password is required!"]},
    email: {type: String, required: [true, "Email is required!"]},
    image: {type: String, default: "avatar.png"},
    birthDate: {type: Date, default: null},
    age: {type: Number, default: null},
    role: {type: String, default: "user"},
    createdAt: {type: Date, default: () => new Date().getTime()}
});

const UserModel = model("users", UserSchema);

module.exports = UserModel;