const { Schema, model } = require("mongoose")

const artistSchema = new Schema(
    {
        name: String,
        styles: Array,
        city: String,
        country: String,
        picture: String,
        poster: String,
        instagram: String,
        handpoke: Boolean,
        shop: Boolean,
    },
    {
        timestamps: true,
    }
)

const Artist = model("Artist", artistSchema)

module.exports = Artist
