const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/models");
const path = require("path")
const PORT = process.env.PORT || 3000;

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/27017/workspacedb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);

const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public")));

// main home routes
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

app.get("/exercise", (req, res) => {
    res.sendFile(`${__dirname}/public/exercise.html`)
});

app.get("/stats", (req, res) => {
    res.sendFile(`${__dirname}/public/stats.html`)
});

// api routess 
app.get("/api/workouts", async (req, res) => {
    try {
        const userData = await Workout.find({}).sort({ day: -1 });

        if (!userData.length) {
            res.status(404).json({
                message: "No Workouts found in the database"
            });
        } else {
            res.status(200).json(userData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// create 
app.post("/api/workouts", async (req, res) => {
    try {
        const createUserData = await Workout.create(req.body);
        console.log(createUserData);
        res.status(200).json(createUserData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update
app.put("/api/workouts/:id", async (req, res) => {
    try {
        console.log(req.body);
        const updateData = await Workout.findByIdAndUpdate({
            _id: req.params.id
        }, {
            $push: {
                exercises: req.body
            }
        });
        console.log(updateData);
        res.status(200).json(req.body);
    } catch (err) {
        res.status(500).json(err);
    }
});

// range

// not sure yet need to finish later

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});