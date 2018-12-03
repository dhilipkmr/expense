var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/expense', { useNewUrlParser: true }).then(() => {
    console.log('Connected to Db');
},(e)=> {
    console.log(e);
});
module.exports = {mongoose};