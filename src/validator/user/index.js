import Joi from "joi";
const userValidator={
    create:(req,res,next)=>{
        const schema = Joi.object({
            username: Joi.string().min(5).max(20).required(),
            password:Joi.string(),
            email:Joi.string(),
            name:Joi.string().required(),
            about_me:Joi.string().max(300),
            


        });
        const response=schema.validate(req.body);
        if (response.error){
          return  res.status(400).json({message:"Invalid data", error:response.error});
        }
        next();

    },    update:(req,res,next)=>{
        const schema = Joi.object({
            username: Joi.string().min(5).max(20).required(),
            password:Joi.string(),
            email:Joi.string(),
            name:Joi.string().required(),
            about_me:Joi.string().max(300),
            


        });
        const response=schema.validate(req.body);
        if (response.error){
          return  res.status(400).json({message:"Invalid data", error:response.error});
        }
        next();

    }
}
export default userValidator;