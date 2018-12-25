var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOLAB_URI, { useMongoClient: true }).then(() => {
    console.log('Connected to Db');
},(e)=> {
    console.log(e);
});
module.exports = {mongoose};
