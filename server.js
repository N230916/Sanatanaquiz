const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ======================
// MySQL Connection
// ======================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",      // Change if your MySQL password is different
    database: "sanatana_quiz"
});

db.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed");
        console.log(err);
    } else {
        console.log("✅ Connected to MySQL");
    }
});

// ======================
// Save User API
// ======================

app.post("/save-user", (req, res) => {

    const { username,score } = req.body;

    const sql = "INSERT INTO users (username) VALUES (?)";

    db.query(sql, [username], (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error saving user"
            });
        }

        res.json({
            message: "User saved successfully",
            id: result.insertId
        });

    });

});

// ======================
// Save Score API
// ======================
app.put("/update-score", (req, res) => {

    const { id, score } = req.body;

    const sql = "UPDATE users SET score=? WHERE id=?";

    db.query(sql, [score, id], (err, result) => {

        if(err){
            console.log(err);
            res.status(500).send("Error updating score");
        }
        else{
            res.send({
                message:"Score updated successfully"
            });
        }

    });

});

// ======================
// Leaderboard API
// ======================

app.get("/leaderboard", (req, res) => {

    const sql =
        "SELECT username, score FROM users ORDER BY score DESC LIMIT 10";

    db.query(sql, (err, result) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error loading leaderboard"
            });
        }

        res.json(result);

    });

});

// ======================
// Start Server
// ======================

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
