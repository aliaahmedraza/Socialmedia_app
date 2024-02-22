import userModel from "../models/user/index.js";
import postModel from "../models/post/index.js";
import commentModel from "../models/comments/index.js";
import userFollowModel from "../models/userFollower/index.js";
const dbInit= async() =>{
await userModel.sync({ alter:true, force: false });
await postModel.sync({ alter:true, force: false });
await commentModel.sync({ alter:true, force: false });
await userFollowModel.sync({ alter:true, force: false });
console.log("The table for the model was just created!")};
export default dbInit;