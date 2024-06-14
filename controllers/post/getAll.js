const PostModel = require("../../model/PostModel");
const {joinUserToPost} = require("../../stages/joins");
const getAll = async (req, res, next) => {
    let query = [];

    let page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 9;
    if (req.query.page && req.query.limit) {
        query = [
            {$skip: (page - 1) * limit},
            {$limit: limit}
        ];
    }
    try {
        const count = await PostModel.countDocuments();
        const allPosts = await PostModel.aggregate([
            ...query,
            ...joinUserToPost
        ]);
        res.send(allPosts);
    } catch (error) {
        next(new Error(error.message));
    }
};

module.exports = getAll;