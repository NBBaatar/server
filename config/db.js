const mongoose = require("mongoose");
const connect = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(`Connected MongoDB: ${conn.connection.host}`.yellow.bold);
};
module.exports = connect;
