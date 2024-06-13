const UserModel = require("../../model/UserModel");
const bcrypt = require("bcryptjs");
const SALT = 10;
const register = async (req, res) => {
    const {email, password, confirmPassword} = req.body;
    try {
        const checkUser = await UserModel.findOne({email});
        if (checkUser) {
            res.send("User with this email exist.");
        } else {
            if (password === confirmPassword) {
                bcrypt.hash(password, SALT, async (error, hashPassword) => {
                    if (error) {
                        throw Error(error.message);
                    } else {
                        let newUser = new UserModel({...req.body, password: hashPassword});
                        let storeUser = await newUser.save();
                        res.redirect("/login");
                    }
                });
            } else {
                res.send("Password and confirm password not match.");
            }
        }
    } catch (error) {
        res.send(error.message);
    }
};
module.exports = register;