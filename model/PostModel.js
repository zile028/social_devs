const {model, Schema} = require("mongoose");

const TagsSchema = new Schema({
    name: {type: String, required: true}
}, {_id: false});

const PostSchema = new Schema({
    title: {type: String, required: true},
    body: {
        type: String, required: true,
        validate: {
            validator: (field) => field.length <= 250,
            message: "Maximum character is 250."
        }
    },
    image: {type: String, required: true},
    reaction: {type: Number, required: true, default: 0},
    createdAt: {type: Date, default: () => new Date().getTime()},
    isPublic: {type: Boolean, required: true, default: true},
    userId: {type: Schema.Types.ObjectId, required: true},
    tags: {type: [TagsSchema]}
});

const PostModel = model("posts", PostSchema);
module.exports = PostModel;