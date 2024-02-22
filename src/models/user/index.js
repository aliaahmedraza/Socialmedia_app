import { DataTypes} from 'sequelize';
import sequelize from '../../Db/config.js';
const userModel = sequelize.define('user', {
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING(100)
  },  
  email: {
    type: DataTypes.STRING(100)
  },  
  name: {
    type: DataTypes.STRING
  },  
  about_me: {
    type: DataTypes.STRING
  }
}, { 
    paranoid : true 
});
export default userModel;