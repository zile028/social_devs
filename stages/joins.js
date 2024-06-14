const joins = [
    {
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "author",
            pipeline: [
                {$project: {firstName: 1}}
            ]
        }

    },
    {$project: {userId: 0}}
];

module.exports = {joinUserToPost: joins};
