import Sequelize from 'sequelize';
import databaseConfig from './configs/database.json';

export default (callback) => {
  // connect to a database if needed, then pass it to `callback`:
  const sequelize = new Sequelize(
    databaseConfig.database,
    databaseConfig.user,
    databaseConfig.password,
    {
      host: databaseConfig.host,
      dialect: databaseConfig.engine,
      pool: {
        max: 5,
        min: 0,
        idle: 10000,
      },
      // disable logging; default: console.log
      logging: false,
    });

  sequelize.authenticate().then(() => {
    callback(null, sequelize);
  }, (err) => {
    callback(err, null);
  });
};

