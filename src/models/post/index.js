import { DataTypes } from 'sequelize';
import sequelize from '../../Db/config.js';
import userModel from '../user/index.js';
const postModel = sequelize.define('post', {
  content: {
    type: DataTypes.STRING,
  },
  comment_count: {
    type: DataTypes.STRING(100)
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