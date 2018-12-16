var mongoose1 = require('mongoose');
mongoose1.Promise = global.Promise;
mongoose1.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true }).then(() => {
    console.log('Connected to Db');
},(e)=> {
    console.log(e);
});
module.exports = {mongoose1};