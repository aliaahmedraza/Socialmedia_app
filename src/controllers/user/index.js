import postModel from "../../models/post/index.js";
import userModel from "../../models/user/index.js";
import userFollowModel from "../../models/userFollower/index.js";
import bcrypt from "bcrypt";

const userController = {
  get: async (req, res) => {
    try { 
      const id = req.user.id;
      const user = await userModel.findByPk(id, {
        include: [
          { model: postModel },
          { model: userModel, through: userFollowModel, as: "follower", foreignKey: "followingsId" },
          { model: userModel, through: userFollowModel, as: "following", foreignKey: "followersId" }]
      });

      const followers = await user.follower.length;
      const followings = await user.following.length;

      res.json({
        message: "User information retrieved successfully",
        user: {
          id: user.id,
          username: user.username,
          name: user.name,
          about_me: user.about_me,
          posts: user.posts,
          followers,
          followings,
        },
      });
    } catch (error) {
      console.error("Error while fetching users:", error);
      res.status(404).json({ message: "Internal Server Error" });
    }
  },

  getTimeline: async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findByPk(userId);
        const followingUsers = await user.getFollowing();
        let timelinePosts = [];
        for (const followingUser of followingUsers) {
            const posts = await followingUser.getPosts();
            timelinePosts = timelinePosts.concat(posts.map(post => ({
                description: post.description,
                attachment: post.attachment,
                Userid: followingUser.id,
                username: followingUser.username,
                name: followingUser.name,
                createdAt: new Date(post.createdAt).toLocaleString()
            })));
        }
        timelinePosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        res.json({
            message: "Timeline retrieved successfully",
            timeline: timelinePosts,
        });
    } catch (error) {
        console.error("Error retrieving timeline:", error);
        res.status(500).json({ message: "Internal server error" });
    }
  },

  getFollowings:async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findByPk(userId);
      const followings = await user.getFollowing();
      res.json({
        message: "Followings retrieved successfully",
        followings: followings.map(following => ({
          id: following.id,
          username: following.username,
          name: following.name,
        })),
      });
    } catch (error) {
      console.error("Error retrieving followings:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getFollowers:async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await userModel.findByPk(userId);
      const followers = await user.getFollower();
      res.json({
        message: "Followers retrieved successfully",
        followers: followers.map(follower => ({
          id: follower.id,
          username: follower.username,
          name: follower.name,
        })),
      });
    } catch (error) {
      console.error("Error retrieving followers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { username, password, email, name, about_me } = req.body;
      const saltRounds = 10;
      const hPassword = await bcrypt.hash(password, saltRounds);
      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json(
          { message: "This email already exists try some other email" });
      }
      const user = await userModel.create({
        username,
        password: hPassword,
        email,
        name,   
        about_me
      });
      await user.save();
      res.json({
        message: "User registered successfully",
        user: user,
      });
    } catch (error) {
      console.error("Error while creating user:", error);
      res.status(404).json({ message: "Internal Server Error" });
    }
  },

  update: async (req, res) => {
    try {
      const { username, email, password, name, about_me } = req.body;
      const params = req.params;
      const user = await userModel.findByPk(params.userId);
      if (!user) {
        res.json({ message: "Data not found" });
      }
      user.username = username;
      user.password = password;
      user.email = email;
      user.name = name;
      user.about_me = about_me;
      await user.save();
      res.json({ message: "User data updated" });
    } catch (error) {
      console.error("Error while creating user:", error);
      res.status(404).json({ message: "Internal Server Error" });
    }
  },

  delete: async (req, res) => {
    try {
      const params = req.params;
      const user = await userModel.findByPk(params.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      await user.destroy();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error while deleting user:", error);
      res.status(404).json({ message: "Internal Server Error" });
    }
  },
};

export default userController;