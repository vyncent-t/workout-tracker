const mongoose = require("mongoose")

const WorkoutSchema = new mongoose.Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [
        {
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            distance: {
                type: Number
            },
            weight: {
                type: Number,
                required: "details of the weight needed"
            },
            reps: {
                type: Number,
                required: "details of the reps needed"
            },
            sets: {
                type: Number,
                required: "details of the sets needed"
            },
        }
    ]
})

const Workout = mongoose.model("Workout", WorkoutSchema)

module.exports = Workout