import commentModel from "../../models/comments/index.js";
import postModel from "../../models/post/index.js";

const commentController = {
    path: "/comment",
    get: async (req, res) => {
        try {
            const comment = await commentModel.findAll({include:[postModel]});
            res.json({
                message: "comment information retrieved successfully",
                comment 
            });
        } catch (error) {
            console.error("Error while fetching comments:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    },
    create: async (req, res) => {
        try {
            const { content,emoji,postId } = req.body;
            const comment = await commentModel.create({ content,emoji,postId });
            await comment.save();
            res.json({
                message: "comment passout successfully",
                comment: comment
            });
        } catch (error) {
            console.error("Error while creating comment:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }
    
    ,update: async (req, res) => {
        try {
           const { content, emoji }=req.body;
           const params=req.params;
           const comment = await commentModel.findByPk(params.commentId);
           if (!comment){
            res.json({message:"Data not found"});
           };
           comment.content=content;
           comment.emoji=emoji;
           await comment.save();
           res.json({message: "comment has been updated"});
        } catch (error) {
            console.error("Error while creating comment:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    },delete: async (req, res) => {
        try {
            const params=req.params;
            const comment = await commentModel.findByPk(params.commentId);
            if (!comment) {
                return res.status(404).json({ message: "comment not found" });
            }
            await comment.destroy();
    
            res.json({ message: "comment deleted successfully" });
        } catch (error) {
            console.error("Error while deleting comment:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }
    
};
export default commentController;