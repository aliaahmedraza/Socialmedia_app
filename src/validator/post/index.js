import Joi from "joi";
const postValidator={
    create:(req,res,next)=>{
        const schema = Joi.object({
            content: Joi.string().min(5).max(20).required(),
            comment_count:Joi.string(),
            attachment:Joi.string()
             
        });
        const response=schema.validate(req.body);
        if (response.error){
          return  res.status(400).json({message:"Invalid data", error:response.error});
        }
        next();

    },    update:(req,res,next)=>{
        const schema = Joi.object({
            content: Joi.string().min(5).max(20).required(),
            comment_count:Joi.string(),
            attachment:Joi.string()
            
        });
        const response=schema.validate(req.body);
        if (response.error){
          return  res.status(400).json({message:"Invalid data", error:response.error});
        }
        next();

    }
}
export default postValidator;