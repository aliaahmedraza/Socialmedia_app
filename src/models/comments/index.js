import { DataTypes } from 'sequelize';
import sequelize from '../../Db/config.js';
import userModel from '../user/index.js';
import postModel from '../post/index.js';
const commentModel = sequelize.define('comment', {
  content: {
    type: DataTypes.STRING,
  },
  emoji: {
    type: DataTypes.STRING(100)
  }  
}, { 
    paranoid : true
});
postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);
export default commentModel;