const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  let usercheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (usercheck.length) {
    await connection.dropCollection("users");
  }

  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }

  const thoughts = await Thought.insertMany([
    {
      thoughtText: "hii",
      userName: "Rylee",
      reactions: [
        {
          reactionBody: "uhhh",
          userName: "Rylee",
        },
      ],
    },
    {
      thoughtText: "idk",
      userName: "Zeno",
      reactions: [
        {
          reactionBody: "okay",
          userName: "Zeno",
        },
      ],
    },
  ]);

  const user = await User.insertMany([
    {
      username: "Rylee",
      email: "rylee@gmail.com",
      thoughts: [thoughts[0]._id, thoughts[1]._id],
      friends: [  ],
    },
  ]);
});
