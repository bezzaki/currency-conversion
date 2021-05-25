const config = require('config');
const mongoose = require('mongoose');
const app = require('./route/Currency');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR : jwtPrivateKey is not Defined.');
    process.exit(1);
}

//Connect to dataBase
mongoose.connect('mongodb://localhost/Currency', {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex: true,useFindAndModify: true})
    .then(() => console.log('Connected to MongoDB...')).catch(err => console.error('Could not connect to MongoDb..',err));

const port = process.env.PORT || 3000;
app.listen(port, ()=>console.log(`Listenin on ${port} ...`));