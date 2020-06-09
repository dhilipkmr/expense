var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_LAB_URI).then(() => {
    console.log('Connected to Db');
},(e)=> {
    console.log(e);
});
module.exports = {mongoose};
