import userModel from "../../models/user/index.js";

const userController = {
    path: "/user",
    get: async (req, res) => {
        try {
            const user = await userModel.findAll();
            res.json({
                message: "User information retrieved successfully",
                user 
            });
        } catch (error) {
            console.error("Error while fetching users:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    },
    create: async (req, res) => {
        try {
            const { username, password, email, name, about_me } = req.body;
            const existingUser = await userModel.findOne({ where: { username } });
            if (existingUser) {
                return res.status(400).json({ message: "Username already exists" });
            }
            const user = await userModel.create({ username, password, email, name, about_me });
            await user.save();
            res.json({
                message: "User data inserted successfully",
                user: user
            });
        } catch (error) {
            console.error("Error while creating user:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    }
    
    ,update: async (req, res) => {
        try {
           const {username,email,password,name,about_me}=req.body;
           const params=req.params;
           const user = await userModel.findByPk(params.userId);
           if (!user){
            res.json({message:"Data not found"});
           };
           user.username=username;
           user.password=password;
           user.email=email;
           user.name=name;
           user.about_me=about_me;
           await user.save();
           res.json({message: "User data updated"});
        } catch (error) {
            console.error("Error while creating user:", error);
            res.status(404).json({ message: "Internal Server Error" });
        }
    },delete: async (req, res) => {
        try {
            const params=req.params;
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
    }
    
};

export default userController;
