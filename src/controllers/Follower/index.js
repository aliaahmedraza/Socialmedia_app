import userFollowModel from "../../models/userFollower/index.js";
import userModel from "../../models/user/index.js";
const userFollowController = {
    path:"/userfollow",
    createFollow: async (req, res) => {
        try {
            const { followersId, followingsId} = req.body;
            const user = await userFollowModel.create({ followersId, followingsId});
            await user.save();
            res.json({
                message: "Followed",
            });
        } catch (error) {
            console.error("Error while creating user:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }
    ,    getFollow: async (req, res) => {
        try {
            const params = req.params;
            const user = await userModel.findByPk(params.id, {
                include: ["following", "follower"],
              });
              console.log(user);
            res.json({user});
        } catch (error) {
            console.error("Error while creating user:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }
};

export default userFollowController;
