import postModel from "../../models/post/index.js";
import userModel from "../../models/user/index.js";

const postController = {
    path: "/post",
    get: async (req, res) => {
        try {
            const post = await postModel.findAll({include:[userModel]});
            res.json({
                message: "post information retrieved successfully",
                post 
            });
        } catch (error) {
            console.error("Error while fetching posts:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }, 
    create: async (req, res) => {
        try {
            const { description, attachment } = req.body;
            const existingpost = await postModel.findOne({ where: { description } });
            const id = req.user.id;
            if (existingpost) {
                return res.status(400).json({ message: "This post already exists" });
            }
            const post = await postModel.create({ description, attachment,userId:id });
            await post.save();
            res.json({
                message: "post updated successfully",
                post: post
            });
        } catch (error) {
            // console.error("Error while creating post:", error);
            res.status(404).json({ message: "Internal Server Error",error });
        }
    }
    
    ,update: async (req, res) => {
        try {
           const { description, attachment }=req.body;
           const params=req.params;
           const post = await postModel.findByPk(params.postId);
           if (!post){
            res.json({message:"Data not found"});
           };
           post.description=description;
           post.attachment=attachment;
           await post.save();
           res.json({message: "Post has been updated"});
        } catch (error) {
            console.error("Error while creating post:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    },delete: async (req, res) => {
        try {
            const params=req.params;
            const post = await postModel.findByPk(params.postId);
            if (!post) {
                return res.status(404).json({ message: "post not found" });
            }
            await post.destroy();
    
            res.json({ message: "post deleted successfully" });
        } catch (error) {
            console.error("Error while deleting post:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }
    
};
export default postController;