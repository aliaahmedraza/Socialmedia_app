import "dotenv/config";
import Sequelize  from 'sequelize';
const env = process.env;
const sequelize = new Sequelize(env.DB_NAME,env.DB_DATABASE,env.DB_PASSWORD, {
    host: env.DB_HOST,
    dialect:  env.DB_DIALECT,
    logging: false
  });
  const Dbconnection =async()=>{try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }}
  export default sequelize;
  export {Dbconnection}; 