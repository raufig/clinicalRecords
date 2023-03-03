const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/clinicalRecords'
mongoose.set("strictQuery", true);
mongoose.set("strictPopulate", false);
mongoose.connect(uri,{
    autoIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4,
    
}).then(() => {
    console.log('Connected to mongoDB');
});