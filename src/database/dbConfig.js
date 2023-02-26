// mongo database URI
const mongoUri = process.env.MONGO_URI;

const configObj = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

module.exports = { mongoUri, configObj };
