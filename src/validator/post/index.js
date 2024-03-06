import Joi from "joi";
const postValidator={
    create:(req,res,next)=>{
        const schema = Joi.object({
            description: Joi.string().required(),
            attachment:Joi.string()
             
        });
        const response=schema.validate(req.body);
        if (response.error){
          return  res.status(400).json({message:"Invalid data", error:response.error});
        }
        next();

    },    update:(req,res,next)=>{
        const schema = Joi.object({
            description: Joi.string().required(),
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