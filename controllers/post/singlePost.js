const PostModel = require("../../model/PostModel");
const {joinUserToPost} = require("../../stages/joins");
const singlePost = async (req, res, next) => {
    let postId = req.params.id;
    try {
        const post = await PostModel.aggregate([
            {$match: {$expr: {$eq: ["$_id", {$toObjectId: postId}]}}},
            ...joinUserToPost
        ]);
        console.log(post);
        res.send(post);
    } catch (error) {
        next(new Error(error.message));
    }
};
module.exports = singlePost;