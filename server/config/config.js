var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 4000;
  process.env.MONGOLAB_URI = 'mongodb://localhost:27017/expense';
}
export default env;