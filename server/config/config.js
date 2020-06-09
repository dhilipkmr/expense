var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 4000;
  process.env.MONGO_LAB_URI = "mongodb://dhilipk13:dhilipk13@ds229418.mlab.com:29418/meeting";
}