// Packages
const router = require("express").Router()

// Models
const Artist = require("../models/Artist.model")
const User = require("../models/User.model")

// Get all artists
router.get("/all-artists", (req, res, next) => {
    Artist.find()
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// Get artist by id
router.get("/artist/:id", (req, res, next) => {
    Artist.findById(req.params.id)
        .then(found => res.status(200).json(found))
        .catch(err => next(err))
})

// New artist
router.post("/new-artist", (req, res, next) => {
    const { name, styles, city, picture, poster, instagram } = req.body

    if (!name) {
        return res.status(400).json({ message: "Name is required." })
    }

    if (!styles) {
        return res.status(400).json({ message: "Styles are required." })
    }

    if (!city) {
        return res.status(400).json({ message: "City is required." })
    }

    if (!instagram) {
        return res.status(400).json({ message: "Instagram link is required." })
    }

    Artist.create({ name, styles, city, picture, poster, instagram })
        .then(created =>
            User.findByIdAndUpdate(
                poster,
                { $push: { artists: created } },
                { new: true }
            ).then(updatedUser => {
                res.status(200).json({ created, updatedUser })
            })
        )
        .catch(err => next(err))
})

// Edit artist
router.put("/edit-artist/:id", (req, res, next) => {
    const { name, styles, city, picture, instagram } = req.body

    Artist.findByIdAndUpdate(
        req.params.id,
        {
            name,
            styles,
            city,
            picture,
            instagram,
        },
        { new: true }
    )
        .then(updated => res.status(200).json(updated))
        .catch(err => next(err))
})

// Delete artist
router.delete("/delete-artist/:id", (req, res, next) => {
    Artist.findByIdAndDelete(req.params.id)
        .then(() => res.status(200).json({ message: "Artist deleted." }))
        .catch(err => next(err))
})

module.exports = router
