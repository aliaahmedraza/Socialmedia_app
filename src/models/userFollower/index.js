import sequelize from "../../Db/config.js";
import userModel from "../user/index.js";

const userFollowModel=sequelize.define('userFollower');
userFollowModel.belongsTo(userModel,{as:"followers"});
userFollowModel.belongsTo(userModel,{as:"followings"});
userModel.belongsToMany(userModel,{through:userFollowModel,as:"follower",foreignKey:"followingsId"});
userModel.belongsToMany(userModel,{through:userFollowModel,as:"following",foreignKey:"followersId"});
export default userFollowModel;