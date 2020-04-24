const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017", {
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true,
});

// const MongoClient = require('mongoose')
// const uri = "mongodb+srv://dev:dev123@docmz-fdoxl.mongodb.net/admin?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// mongoose.connect(process.env.DB_CONN);
mongoose.Promise = global.Promise;

// module.exports = {
//     Home=require('../src/component/home/home.schema'),
// };
