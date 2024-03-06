import { DataTypes } from 'sequelize';
import sequelize from '../../Db/config.js';
import userModel from '../user/index.js';
const postModel = sequelize.define('post', {
  description: {
    type: DataTypes.STRING,
  },
 attachment: {
    type: DataTypes.STRING(100)
  },  
}, { 
    paranoid : true
});
userModel.hasMany(postModel); 
postModel.belongsTo(userModel);
export default postModel;