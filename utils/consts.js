const MONGO_URI =
    process.env.MONGODB_URI || "mongodb://localhost/tattoo-directory"

module.exports = MONGO_URI
