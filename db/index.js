const mongoose = require("mongoose");
const url =
	"mongodb+srv://bene:bene@cluster0-2zn80.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, {
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
