var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 4000;
  process.env.MONGOLAB_URI = 'mongodb://dhilipk13:dhilipk13#@ds247310.mlab.com:47310/expense';
}
process.env.MONGOLAB_URI = 'mongodb://dhilipk13:dhilipk13#@ds247310.mlab.com:47310/expense';
export default env;