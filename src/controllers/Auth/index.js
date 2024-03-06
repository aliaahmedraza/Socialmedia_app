import userModel from "../../models/user/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const authController = {
  login: async (req, res) => {
    const payload = req.body;
    const user = await userModel.findOne({
      where: { email: payload.email }
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      }); 
      
    }
    const result = await bcrypt.compare(payload.password, user.password);
    console.log(result, "Login Successfully");
    if (!result) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        id: user.id,
        password: payload.password,
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      },
      process.env.JWT_SIGNATURE
    );

    res.json({
      message: "User Logged in",
      token,
    });
  },
};

export default authController;