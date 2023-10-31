import { Sequelize } from "sequelize";

const sequelize = new Sequelize('cafe','root','toor',{
    host: 'localhost',
    dialect: 'mysql'
});
export default sequelize;