const { Schema, model } = require("mongoose")

const artistSchema = new Schema(
    {
        name: String,
        styles: Array,
        city: String,
        picture: String,
        poster: String,
        instagram: String,
    },
    {
        timestamps: true,
    }
)

const Artist = model("Artist", artistSchema)

module.exports = Artist
