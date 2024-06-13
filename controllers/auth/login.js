const UserModel = require("../../model/UserModel");
const bcrypt = require("bcryptjs");
const login = async (req, res, next) => {
    try {
        let {email, password} = req.body;
        const checkUser = await UserModel.findOne({email});
        if (checkUser) {
            bcrypt.compare(password, checkUser.password, (error, result) => {
                if (error) {
                    throw Error(error.message);
                } else {
                    if (result) {
                        res.send("User logged");
                    } else {
                        res.send("Credentials not valid");
                    }
                }
            });
        } else {
            next(Error("User with this email not exist"));
            next("route");
        }
    } catch (error) {
        // res.send(error.message);
        next(error.message);
    }
};

module.exports = login;